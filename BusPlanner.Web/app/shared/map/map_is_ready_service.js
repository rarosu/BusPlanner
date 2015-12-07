(function () {
    "use strict";

    angular.module('map')
    .service('mapIsReady', ['$q', function ($q) {
        this._deferred = $q.defer();
        this._isReady = false;

        this.mapInitialized = function (map) {
            if (this._isReady) {
                throw new Error('Another map was initialized before the last one was destroyed.');
            }

            this._isReady = true;
            this._deferred.resolve(map);
        };

        this.mapDestroyed = function () {
            if (!this._isReady) {
                throw new Error('A map was destroyed, but none was marked as ready.');
            }

            this._isReady = false;
            this._deferred = $q.defer();
        };

        this.ready = function () {
            return this._deferred.promise;
        };
    }]);
})();