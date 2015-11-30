(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapContextMenu', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'shared/map/context_menu/context_menu_template.html',
            scope: {
                showCallback: '='
            },
            controller: [function () {

            }],
            require: ['^^googleMap', '?^^googleMapMarker'],
            link: function (scope, element, attrs, controllers) {
                scope.menuStyle = {};
                scope.menuStyle.visibility = 'hidden';
                scope.menuStyle.position = 'absolute';

                var controller = controllers[1] || controllers[0];
                controllers[0].ready(function (map) {
                    controller.ready(function (gmapElement) {
                        function latlngToPoint(latlng) {
                            var scale = Math.pow(2, map.getZoom());
                            var projection = map.getProjection();
                            var topRight = projection.fromLatLngToPoint(map.getBounds().getNorthEast());
                            var bottomLeft = projection.fromLatLngToPoint(map.getBounds().getSouthWest());
                            var point = projection.fromLatLngToPoint(latlng);
                            return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
                        }

                        function rightClickHandler(e) {
                            // Show the menu at the click location.
                            var point = latlngToPoint(e.latLng);
                            scope.menuStyle['top'] = Math.round(point.y) + 'px';
                            scope.menuStyle['left'] = Math.round(point.x) + 'px';
                            scope.menuStyle.visibility = 'visible';
                            scope.$digest();

                            scope.showCallback({
                                lat: e.latLng.lat(),
                                lng: e.latLng.lng()
                            });
                        }

                        function leftClickHandler(e) {
                            if (e.which == 1) {
                                // Hide the menu.
                                scope.menuStyle.visibility = 'hidden';
                                scope.$digest();
                            }
                        }

                        // Listen to right clicks to show the menu and left clicks to hide the menu.
                        gmapElement.addListener('rightclick', rightClickHandler);
                        document.addEventListener('click', leftClickHandler);

                        // Remove the listeners when destroying the element.
                        scope.$on('$destroy', function () {
                            google.maps.event.clearListeners(gmapElement, 'rightclick');
                            document.removeEventListener('click', leftClickHandler);
                        });
                    });
                });
            }
        };
    }]);
})();