(function () {
    "use strict";

    angular
    .module('app')
    .directive('googleMapsContextMenu', ['$document', 'uiGmapIsReady', function ($document, uiGmapIsReady) {
        function ContextMenu(scope, controller, map, menuElement) {
            this.map = map;
            this.menuElement = menuElement;

            var _this = this;
            this.map.addListener('rightclick', function (e) {
                _this.showMenu();
                _this.repositionMenu(e.latLng);
                controller.broadcastMenuLocation(e.latLng);
            });

            function leftClickHandler(e) {
                // Handle only left button clicks.
                if (e.which == 1) {
                    _this.hideMenu();
                }
            }

            $document.on('click', leftClickHandler);
            scope.$on('$destroy', function () {
                $document.off('click', leftClickHandler);
            });
        }

        ContextMenu.prototype.getCanvasPosition = function (latlng) {
            var scale = Math.pow(2, this.map.getZoom());
            var projection = this.map.getProjection();
            var topRight = projection.fromLatLngToPoint(this.map.getBounds().getNorthEast());
            var bottomLeft = projection.fromLatLngToPoint(this.map.getBounds().getSouthWest());
            var point = projection.fromLatLngToPoint(latlng);
            return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
        };

        ContextMenu.prototype.showMenu = function () {
            this.menuElement.show();
        };

        ContextMenu.prototype.hideMenu = function() {
            this.menuElement.hide();
        }

        ContextMenu.prototype.repositionMenu = function (latlng) {
            var point = this.getCanvasPosition(latlng);
            var elementOrigin = $(this.map.getDiv()).offset();

            this.menuElement.offset({
                top: elementOrigin.top + point.y,
                left: elementOrigin.left + point.x
            });
        };

        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'views/partials/GoogleMapsContextMenu.html',
            scope: {
                mapControl: '='
            },
            controller: ['$scope', '$q', function ($scope, $q) {
                var _this = this;

                this.map = undefined;
                this.menuItems = [];

                this.resolveMap = function () {
                    return $q(function (resolve, reject) {
                        uiGmapIsReady.promise(1).then(function (maps) {
                            if (_this.map == undefined) {
                                _this.map = $scope.mapControl.getGMap();
                            }

                            resolve(_this.map);
                        });
                    });
                };

                this.broadcastMenuLocation = function (latlng) {
                    for (var i = 0; i < this.menuItems.length; i++) {
                        this.menuItems[i].clickLocation.lat = latlng.lat();
                        this.menuItems[i].clickLocation.lng = latlng.lng();
                    }
                };

                this.registerMenuItem = function (scope) {
                    this.menuItems.push(scope);
                }
            }],
            link: function (scope, element, attrs, controller) {
                element.hide();
                controller.resolveMap().then(function (map) {
                    var menu = new ContextMenu(scope, controller, map, element);
                });
            }
        };
    }])
    .directive('googleMapsContextItem', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'views/partials/GoogleMapsContextItem.html',
            require: '^googleMapsContextMenu',
            scope: {
                click: '&'
            },
            link: function (scope, element, attrs, controller) {
                scope.clickLocation = {
                    lat: 0.0, lng: 0.0
                };

                controller.registerMenuItem(scope);
            }
        };
    }]);
})();