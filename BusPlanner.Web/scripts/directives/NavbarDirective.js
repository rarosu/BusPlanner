(function () {
    "use strict";

    angular
    .module('app')
    .directive('bsNavbar', ['$location', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                scope.$watch(function () {
                    return $location.path();
                }, function (newValue, oldValue) {
                    var anchor = angular.element(element).find('a');
                    var href = anchor.attr('href');
                    if (href == '/#' + newValue) {
                        element.addClass('active');
                    } else {
                        element.removeClass('active');
                    }
                });
            }
        }
    }]);
})();