(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapContextMenu', [function () {
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

                // Setup the initial style for the menu.
                scope.menuStyle = {};
                scope.menuStyle.visibility = 'hidden';
                scope.menuStyle.position = 'absolute';

                scope.gmapTarget.then(function (gmapElement) {
                    function latlngToPoint(map, latlng) {
                        var scale = Math.pow(2, map.getZoom());
                        var projection = map.getProjection();
                        var topRight = projection.fromLatLngToPoint(map.getBounds().getNorthEast());
                        var bottomLeft = projection.fromLatLngToPoint(map.getBounds().getSouthWest());
                        var point = projection.fromLatLngToPoint(latlng);
                        return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
                    }

                    function rightClickHandler(e) {
                        // Show the menu at the click location.
                        var point = latlngToPoint(gmapElement.map, e.latLng);
                        scope.menuStyle['top'] = Math.round(point.y) + 'px';
                        scope.menuStyle['left'] = Math.round(point.x) + 'px';
                        scope.menuStyle.visibility = 'visible';
                        scope.$digest();

                        // Update the click position.
                        clickPosition.lat = e.latLng.lat();
                        clickPosition.lng = e.latLng.lng();
                    }

                    function leftClickHandler(e) {
                        if (e.which == 1) {
                            // Hide the menu.
                            scope.menuStyle.visibility = 'hidden';
                            scope.$digest();
                        }
                    }

                    // Listen to right clicks to show the menu and left clicks to hide the menu.
                    gmapElement.element.addListener('rightclick', rightClickHandler);
                    document.addEventListener('click', leftClickHandler);

                    // Remove the listeners when destroying the element.
                    scope.$on('$destroy', function () {
                        google.maps.event.clearListeners(gmapElement.element, 'rightclick');
                        document.removeEventListener('click', leftClickHandler);
                    });
                });
            }
        };
    }]);
})();