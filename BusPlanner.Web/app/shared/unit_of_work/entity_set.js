(function () {
    "use strict";

    angular.module('unit_of_work')
    .service('entitySet', [function () {
        this.create = function (entityUtils) {
            return new EntitySet(entityUtils);
        };

        function EntitySet(entityUtils) {
            this._getKey = entityUtils.getKey || function (entity) { return entity.id };
            this._getDefaultKey = entityUtils.getDefaultKey || function () { return -1; }
            this._equals = entityUtils.equals || function (lhs, rhs) { return this._getKey(lhs) == this._getKey(rhs) };
            this._assign = entityUtils.assign;
            this.entities = [];
        }

        EntitySet.prototype.getByKeyOrReference = function (entity) {
            var index = this.indexOfByKeyOrReference(entity);
            if (index !== -1) {
                return this.entities[index];
            }

            return null;
        };

        EntitySet.prototype.insert = function (entity) {
            var index = this.indexOfByKeyOrReference(entity);
            if (index === -1) {
                this.entities.push(entity);
            }
        };

        EntitySet.prototype.remove = function (entity) {
            var index = this.indexOfByKey(this._getKey(entity));
            if (index !== -1) {
                this.entities.splice(index, 1);
            }
        };

        EntitySet.prototype.indexOfByValue = function (entity) {
            for (var i = 0; i < this.entities.length; i++) {
                if (this._equals(entity, this.entities[i])) {
                    return i;
                }
            }

            return -1;
        };

        EntitySet.prototype.indexOfByReference = function (entity) {
            for (var i = 0; i < this.entities.length; i++) {
                if (entity === this.entities[i]) {
                    return i;
                }
            }

            return -1;
        };

        EntitySet.prototype.indexOfByKey = function (key) {
            for (var i = 0; i < this.entities.length; i++) {
                if (this._getKey(this.entities[i]) == key) {
                    return i;
                }
            }

            return -1;
        };

        EntitySet.prototype.indexOfByKeyOrReference = function (entity) {
            var index = -1;
            if (this._getKey(entity) == this._getDefaultKey()) {
                index = this.indexOfByReference(entity);
            } else {
                index = this.indexOfByKey(this._getKey(entity));
            }

            return index;
        };
    }]);
})();