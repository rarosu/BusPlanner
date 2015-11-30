(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapContextMenu', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/map/context_menu/context_menu_template.html',
            scope: {

            },
            controller: [function () {

            }],
            require: '^googleMap',
            link: function (scope, element, attrs, controller) {
                scope.menuStyle = {};
                scope.menuStyle.visibility = 'hidden';
                scope.menuStyle.position = 'absolute';

                controller.mapPromise.then(function (map) {
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

                        // Broadcast the location on the map that was clicked, for use by the menu items.
                        scope.$broadcast('context_menu_show', {
                            latlng: {
                                lat: e.latLng.lat(), 
                                lng: e.latLng.lng()
                            }
                        });
                    }

                    function leftClickHandler(e) {
                        if (e.which == 1)
                        {
                            // Hide the menu.
                            scope.menuStyle.visibility = 'hidden';
                            scope.$digest();
                        }
                    }

                    // Listen to right clicks to show the menu and left clicks to hide the menu.
                    map.addListener('rightclick', rightClickHandler);
                    document.addEventListener('click', leftClickHandler);

                    // Remove the listeners when destroying the element.
                    scope.$on('$destroy', function () {
                        map.clearListeners(map, 'rightclick');
                        document.removeEventListener('click', leftClickHandler);
                    });
                });
            }
        };
    }]);
})();