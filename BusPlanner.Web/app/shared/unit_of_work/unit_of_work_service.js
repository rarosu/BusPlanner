(function () {
    "use strict";

    angular.module('unit_of_work')
    .service('unitOfWorkService', ['entitySet', '$q', function (entitySet, $q) {
        /**
            Creates a new unit of work with the given repository and a given entity type.

            @param {object} repository - A repository instance for retrieving and pushing entities to the server. 
                                         Must contain the methods: get(key), getAll(), add(entity), remove(entity) and update(entity) that all should return promises for the entities updated.
            @param {object} entityUtils - An object containing methods for handling the entity types.
                                          Must contain the methods: getKey(entity), getDefaultKey(), equals(lhs, rhs) and assign(target, source).
            @return {object} A new unit of work instance.
        */
        this.create = function (repository, entityUtils) {
            return new UnitOfWork(repository, entityUtils);
        };

        var EntityState = {
            UNMODIFIED: 0,
            ADDED: 1,
            MODIFIED: 2,
            DELETED: 3
        };

        function UnitOfWork(repository, entityUtils) {
            this._repository = repository;
            this._getKey = entityUtils.getKey || function (entity) { return entity.id };
            this._getDefaultKey = entityUtils.getDefaultKey || function () { return -1; }
            this._equals = entityUtils.equals || function (lhs, rhs) { return this._getKey(lhs) === this._getKey(rhs); }
            this._assign = entityUtils.assign;
            this._entities = entitySet.create(entityUtils);
            this._changeTracker = {};
        }

        UnitOfWork.prototype.get = function (id) {
            return $q(function (resolve, reject) {
                this._repository.get(id).then(function (entity) {
                    this._insertOrUpdateEntity(entity);
                    resolve(entity);
                }, function (error) {
                    reject(error);
                });
            });
        };

        UnitOfWork.prototype.getAll = function () {
            var _this = this;
            return $q(function (resolve, reject) {
                _this._repository.getAll().then(function (entities) {
                    for (var i = 0; i < entities.length; i++) {
                        _this._insertOrUpdateEntity(entities[i]);
                    }

                    resolve(entities);
                }, function (error) {
                    reject(error);
                });
            });
        };

        UnitOfWork.prototype.add = function (entity) {
            var storedEntity = this._insertOrUpdateEntity(entity);
            this._changeTracker[storedEntity] = EntityState.ADDED;
        };

        UnitOfWork.prototype.remove = function (entity) {
            var existingEntity = this._entities.getByKeyOrReference(entity);
            if (existingEntity !== null) {
                if (this._changeTracker[existingEntity] === EntityState.ADDED) {
                    this._entities.remove(existingEntity);
                    delete this._changeTracker[existingEntity];
                } else {
                    this._changeTracker[existingEntity] = EntityState.DELETED;
                }
            }
        };

        UnitOfWork.prototype.update = function (entity) {
            var existingEntity = this._entities.getByKeyOrReference(entity);
            if (existingEntity !== null) {
                this._assign(existingEntity, entity);
                if (this._changeTracker[existingEntity] !== EntityState.ADDED) {
                    this._changeTracker[existingEntity] = EntityState.MODIFIED;
                }
            }
        };

        UnitOfWork.prototype.save = function () {
            var promises = [];
            for (var entity in this._changeTracker) {
                switch (this._changeTracker[entity]) {
                    case EntityState.ADDED: {
                        promises.push($q(function (resolve, reject) {
                            (function (entity) {
                                this._repository.add(entity).then(function (updatedEntity) {
                                    resolve(entity, updatedEntity);
                                }, function (error) {
                                    reject(error);
                                });
                            })(entity);
                        }));
                    } break;

                    case EntityState.MODIFIED: {
                        promises.push($q(function (resolve, reject) {
                            (function (entity) {
                                this._repository.update(entity).then(function (updatedEntity) {
                                    resolve(entity, updatedEntity);
                                }, function (error) {
                                    reject(error);
                                });
                            })(entity);
                        }));
                    } break;

                    case EntityState.DELETED: {
                        promises.push($q(function (resolve, reject) {
                            (function (entity) {
                                this._repository.delete(entity).then(function () {
                                    resolve(entity);
                                }, function (error) {
                                    reject(error);
                                });
                            })(entity);
                        }));
                    } break;
                }
            }

            return $q.all(promises).then(function (promises) {
                // Update the states.
                for (var i = 0; i < promises.length; i++) {
                    promises[i].then(function (entity, updatedEntity) {
                        switch (this._changeTracker[entity]) {
                            case EntityState.ADDED:
                            case EntityState.MODIFIED: {
                                this._assign(entity, updatedEntity);
                                this._changeTracker[entity] = EntityState.UNMODIFIED;
                            } break;

                            case EntityState.DELETED: {
                                delete this._changeTracker[entity];
                            } break;
                        }
                    }, function (error) {
                        // No-op. Keep the change tracking status.
                        // TODO: Propagate errors to client.
                        console.log("Failed to synchronize entity:");
                        console.log(error);
                    });
                }
                
                resolve();
            });
        };

        UnitOfWork.prototype._insertOrUpdateEntity = function (entity) {
            var existingEntity = this._entities.getByKeyOrReference(entity);
            if (existingEntity !== null) {
                this._assign(existingEntity, entity);
            } else {
                this._entities.insert(entity);
                this._changeTracker[entity] = EntityState.UNMODIFIED;
            }

            return existingEntity || entity;
        };
    }]);
})();