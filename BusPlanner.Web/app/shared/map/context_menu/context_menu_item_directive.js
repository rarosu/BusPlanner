(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapContextMenuItem', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'shared/map/context_menu/context_menu_item_template.html',
            scope: {
                click: '='
            },
            require: '^googleMapContextMenu',
            link: function (scope, element, attrs, controller) {
                scope.latlng = { lat: 0, lng: 0 };
                scope.$on('context_menu_show', function (e, args) {
                    scope.latlng = args.latlng;
                });
            }
        };
    }]);
})();