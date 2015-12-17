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

        function UnitOfWork(repository, entityUtils) {
            this._repository = repository;
            this._getKey = entityUtils.getKey || function (entity) { return entity.id };
            this._getDefaultKey = entityUtils.getDefaultKey || function () { return -1; }
            this._equals = entityUtils.equals || function (lhs, rhs) { return this._getKey(lhs) === this._getKey(rhs); }
            this._assign = entityUtils.assign;
            this._entities = entitySet.create(entityUtils);
            this._shadows = entitySet.create(entityUtils);
        }

        UnitOfWork.prototype.getEntities = function () {
            return this._entities.entities;
        };

        UnitOfWork.prototype.getLastKnownServerState = function () {
            return this._shadows.entities;
        };

        UnitOfWork.prototype.isDirty = function () {
            return !this._entities.equals(this._shadows);
        };

        UnitOfWork.prototype.get = function (id) {
            var _this = this;
            return $q(function (resolve, reject) {
                _this._repository.get(id).then(function (entity) {
                    _this._entities.insertOrUpdate(entity);
                    _this._shadows.insertOrUpdate(angular.copy(entity));
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
                        _this._entities.insertOrUpdate(entities[i]);
                        _this._shadows.insertOrUpdate(angular.copy(entities[i]));
                    }

                    resolve(entities);
                }, function (error) {
                    reject(error);
                });
            });
        };

        UnitOfWork.prototype.add = function (entity) {
            this._entities.insertOrUpdate(entity);
        };

        UnitOfWork.prototype.remove = function (entity) {
            this._entities.remove(entity);
        };

        UnitOfWork.prototype.update = function (entity) {
            this._entities.update(entity);
        };

        UnitOfWork.prototype._getAdded = function () {
            var added = [];

            var current = this._entities.entities;
            for (var i = 0; i < current.length; i++) {
                if (this._getKey(current[i]) == this._getDefaultKey()) {
                    added.push(current[i]);
                }
            }

            return added;
        };

        UnitOfWork.prototype._getModified = function () {
            var modified = [];

            var current = this._entities.entities;
            var shadows = this._shadows.entities;
            for (var i = 0; i < current.length; i++) {
                var currentKey = this._getKey(current[i]);
                if (currentKey !== this._getDefaultKey()) {
                    var shadowIndex = this._shadows.indexOfByKey(currentKey);
                    if (shadowIndex !== -1) {
                        if (!this._equals(current[i], shadows[shadowIndex])) {
                            modified.push(current[i]);
                        }
                    }
                }
            }

            return modified;
        };

        UnitOfWork.prototype._getDeleted = function () {
            var deleted = [];

            var current = this._entities.entities;
            var shadows = this._shadows.entities;
            for (var i = 0; i < shadows.length; i++) {
                var currentIndex = this._entities.indexOfByKey(this._getKey(shadows[i]));
                if (currentIndex === -1) {
                    deleted.push(shadows[i]);
                }
            }

            return deleted;
        };

        UnitOfWork.prototype.save = function () {
            var _this = this;
            
            // Determine the diff between the current state and the last known server state (shadows).
            var added = this._getAdded();
            var modified = this._getModified();
            var deleted = this._getDeleted();

            // Send the data to the server and create promises for when it completes.
            var promises = [];
            var i = 0;
            for (i = 0; i < added.length; i++) {
                promises.push($q(function (resolve, reject) {
                    (function (entity) {
                        _this._repository.add(entity).then(function (updatedEntity) {
                            resolve({
                                action: 'added',
                                original: entity,
                                updated: updatedEntity
                            });
                        }, function (error) {
                            reject(error);
                        });
                    })(added[i]);
                }));
            }

            for (i = 0; i < modified.length; i++) {
                promises.push($q(function (resolve, reject) {
                    (function (entity) {
                        _this._repository.update(entity).then(function (updatedEntity) {
                            resolve({
                                action: 'updated',
                                original: entity,
                                updated: updatedEntity
                            });
                        }, function (error) {
                            reject(error);
                        });
                    })(modified[i]);
                }));
            }

            for (i = 0; i < deleted.length; i++) {
                promises.push($q(function (resolve, reject) {
                    (function (shadow) {
                        _this._repository.delete(shadow).then(function () {
                            resolve({
                                action: 'deleted',
                                original: shadow,
                                updated: null
                            });
                        }, function (error) {
                            reject(error);
                        });
                    })(deleted[i]);
                }));
            }

            return $q.allSettled(promises).then(function (promises) {
                for (var i = 0; i < promises.length; i++) {
                    promises[i].then(function (result) {
                        if (result.fulfilled) {
                            switch (result.value.action) {
                                case 'added': {
                                    _this._assign(result.value.original, result.value.updated);
                                    _this._shadows.insertOrUpdate(angular.copy(result.value.updated));
                                } break;

                                case 'updated': {
                                    _this._entities.insertOrUpdate(result.value.updated);
                                    _this._shadows.insertOrUpdate(angular.copy(result.value.updated));
                                } break;

                                case 'deleted': {
                                    _this._shadows.remove(result.value.original);
                                } break;
                            }
                        }
                    });
                }
            });
        };
    }]);
})();