(function () {
    "use strict";

    var module = angular.module('navbar', []);

    module
    .directive('navItem', ['$location', function ($location) {
        return {
            templateUrl: 'shared/navbar/navbar_template.html',
            transclude: true,
            replace: true,
            scope: {
                href: '@'
            },
            link: function (scope, element, attrs) {
                function isMatchingHref(path) {
                    return '#' + path == scope.href;
                }

                scope.matchingUrl = isMatchingHref($location.path());
                scope.$on('$locationChangeSuccess', function (current, old) {
                    scope.matchingUrl = isMatchingHref($location.path());
                });
            }
        };
    }]);
})();