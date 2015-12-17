(function () {
    "use strict";

    angular.module('busplanner.repositories')
    .service('stopRepositoryService', ['$http', '$q', 'stopService', function ($http, $q, stopService) {
        var baseAddress = 'http://localhost:65107/api/';
        this.getAll = function () {
            return $q(function (resolve, reject) {
                $http.get(baseAddress + 'stops').then(function (response) {
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
                $http.get(baseAddress + 'stops/' + id).then(function (response) {
                    var stop = stopService.createFromValues(response.data);
                    resolve(stop);
                }, function (response) {
                    reject(response);
                });
            });
        };

        this.add = function (stop) {
            return $q(function (resolve, reject) {
                $http.post(baseAddress + 'stops', stop).then(function (response) {
                    var updatedStop = stopService.createFromValues(response.data);
                    resolve(updatedStop);
                }, function (response) {
                    reject(response);
                });
            });
        };

        this.update = function (stop) {
            return $q(function (resolve, reject) {
                $http.put(baseAddress + 'stops/' + stop.id, stop).then(function (response) {
                    var updatedStop = stopService.createFromValues(response.data);
                    resolve(updatedStop);
                }, function (response) {
                    reject(response);
                });
            });
        };

        this.delete = function (stop) {
            return $q(function (resolve, reject) {
                $http.delete(baseAddress + 'stops/' + stop.id).then(function (response) {
                    resolve();
                }, function (response) {
                    reject(response);
                });
            });
        };
    }]);
})();