(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapMarker', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'shared/map/marker/marker_template.html',
            scope: {
                position: '=',
                title: '@'
            },
            controller: ['$scope', '$q', function ($scope, $q) {
                $scope.controller = this;
                this._deferred = $q.defer();
                this.ready = function (callback) {
                    this._deferred.promise.then(callback);
                };
            }],
            require: '^^googleMap',
            link: function (scope, element, attrs, controller) {
                controller.ready(function (map) {
                    var marker = new google.maps.Marker({
                        position: scope.position,
                        map: map,
                        title: scope.title
                    });

                    scope.controller._deferred.resolve(marker);
                });
            }
        };
    }]);
})();