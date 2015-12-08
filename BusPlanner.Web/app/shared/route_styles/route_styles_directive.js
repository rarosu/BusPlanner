(function () {
    "use strict";

    var module = angular.module('controller_css', []);

    module
    .directive('routeStyles', ['$rootScope', '$compile', function ($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {},
            template: '<link ng-repeat="href in routeStyles" rel="stylesheet" type="text/css" ng-href="{{href}}" />',
            link: function (scope, element, attrs) {
                scope.routeStyles = [];
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    scope.routeStyles = [];
                    if (next && next.$$route && next.$$route.css) {
                        if (!angular.isArray(next.$$route.css)) {
                            next.$$route.css = [next.$$route.css];
                        }

                        for (var i = 0; i < next.$$route.css.length; i++) {
                            scope.routeStyles.push(next.$$route.css[i]);
                        }
                    }
                });
            }
        };
    }]);
})();