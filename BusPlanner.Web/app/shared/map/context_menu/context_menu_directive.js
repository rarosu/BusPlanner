(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapContextMenu', ['contextMenuService', function (contextMenuService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/map/context_menu/context_menu_template.html',
            scope: {
                gmapTarget: '=',
                clickPosition: '@'
            },
            link: function (scope, element, attrs, controllers, transcludeFn) {
                var clickPosition = { lat: 0.0, lng: 0.0 };

                // Put the click position object on the transcluded scope.
                var transclusionTarget = element[0].querySelector('[transclude-target]');
                transcludeFn(function (clone, transclusionScope) {
                    transclusionScope[scope.clickPosition] = clickPosition;
                    angular.element(transclusionTarget).append(clone);
                });

                // Setup an initial menu and its style.
                scope.menuStyle = {};
                var menu = contextMenuService.createMenu(scope, scope.menuStyle);

                scope.gmapTarget.then(function (gmapElement) {
                    function rightClickHandler(e) {
                        // Show the menu at the click location.
                        menu.show(gmapElement.map, e.latLng);

                        // Update the click position.
                        clickPosition.lat = e.latLng.lat();
                        clickPosition.lng = e.latLng.lng();
                    }

                    function leftClickHandler(e) {
                        if (e.which == 1) {
                            menu.hide();
                        }
                    }

                    // Listen to right clicks to show the menu and left clicks to hide the menu.
                    gmapElement.element.addListener('rightclick', rightClickHandler);
                    document.addEventListener('click', leftClickHandler);

                    // Remove the listeners when destroying the element.
                    scope.$on('$destroy', function () {
                        contextMenuService.removeMenu(menu);
                        google.maps.event.clearListeners(gmapElement.element, 'rightclick');
                        document.removeEventListener('click', leftClickHandler);
                    });
                });
            }
        };
    }]);
})();