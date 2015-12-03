(function () {
    "use strict";

    angular.module('map')
    .service('contextMenuService', [function () {
        function ContextMenu(service, scope, style) {
            this.service = service;
            this.scope = scope;
            this.style = style;
            this.style.visibility = 'hidden';
            this.style.position = 'absolute';

            this._latlngToPoint = function (map, latlng) {
                var scale = Math.pow(2, map.getZoom());
                var projection = map.getProjection();
                var topRight = projection.fromLatLngToPoint(map.getBounds().getNorthEast());
                var bottomLeft = projection.fromLatLngToPoint(map.getBounds().getSouthWest());
                var point = projection.fromLatLngToPoint(latlng);
                return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
            };

            this.show = function (map, latlng) {
                this.service._hideAllExcept(this);

                var point = this._latlngToPoint(map, latlng);
                this.style.top = Math.round(point.y) + 'px';
                this.style.left = Math.round(point.x) + 'px';
                this.style.visibility = 'visible';
                this.scope.$digest();
            };

            this.hide = function () {
                this.style.visibility = 'hidden';
                this.scope.$digest();
            };
        }

        this.menus = [];

        this.createMenu = function (scope, style) {
            var menu = new ContextMenu(this, scope, style);
            this.menus.push(menu);
            return menu;
        };

        this.removeMenu = function (menu) {
            this.menus.splice(menu, 1);
        };

        this._hideAllExcept = function (omittedMenu) {
            for (var i = 0; i < this.menus.length; i++) {
                if (this.menus[i] != omittedMenu) {
                    this.menus[i].hide();
                }
            }
        };
    }]);
})();