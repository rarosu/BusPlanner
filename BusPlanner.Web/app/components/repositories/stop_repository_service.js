(function () {
    "use strict";

    angular.module('busplanner.repositories')
    .service('stopRepositoryService', ['$http', '$q', 'stopService', function ($http, $q, stopService) {
        this.getAll = function () {
            return $q(function (resolve, reject) {
                $http.get('api/stops', function (response) {
                    var stops = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var stop = stopService.createFromValues(response.data[i]);
                        stops.push(stop);
                    }

                    resolve(stops);
                }, function (response) {
                    reject(response);
                });
            });
        };

        this.get = function (id) {
            return $q(function (resolve, reject) {
                $http.get('api/stops/' + id, function (response) {
                    var stop = stopService.createFromValues(response.data);
                    resolve(stop);
                }, function (response) {
                    reject(response);
                });
            });
        };

        this.add = function (stop) {
            return $q(function (resolve, reject) {
                $http.post('api/stops', stop, function (response) {
                    var updatedStop = stopService.createFromValues(response.data);
                    resolve(updatedStop);
                }, function(response) {
                    reject(response);
                });
            });
        };

        this.update = function (stop) {
            return $q(function (resolve, reject) {
                $http.put('api/stops/' + stop.id, stop, function (response) {
                    var updatedStop = stopService.createFromValues(response);
                    resolve(updatedStop);
                }, function (response) {
                    reject(response);
                });
            });
        };

        this.delete = function (stop) {
            return $q(function (resolve, reject) {
                $http.delete('api/stops/' + stop.id, function (response) {
                    resolve();
                }, function (response) {
                    reject(response);
                });
            });
        };
    }]);
})();