(function () {
    "use strict";

    angular.module('unit_of_work').config(['$provide', function ($provide) {
        $provide.decorator('$q', ['$delegate', function ($delegate) {
            var $q = $delegate;

            $q.allSettled = $q.allSettled || function allSettled(promises) {
                // Code taken from: http://stackoverflow.com/questions/18888104/angularjs-q-wait-for-all-even-when-1-rejected
                // Implementation of allSettled function from Kris Kowal's Q:
                // https://github.com/kriskowal/q/wiki/API-Reference#promiseallsettled

                var wrapped = angular.isArray(promises) ? [] : {};

                angular.forEach(promises, function (promise, key) {
                    if (!wrapped.hasOwnProperty(key)) {
                        wrapped[key] = wrap(promise);
                    }
                });

                return $q.all(wrapped);

                function wrap(promise) {
                    return $q.when(promise)
                        .then(function (value) {
                            return { fulfilled: true, value: value };
                        }, function (reason) {
                            return { fulfilled: false, reason: reason };
                        });
                }
            };

            return $q;
        }]);
    }]);
})();