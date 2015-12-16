(function () {
    "use strict";

    angular.module('busplanner.models')
    .service('stopService', [function () {
        this.create = function () {
            return new Stop();
        };

        this.createFromValues = function (values) {
            var stop = new Stop();
            stop.id = values.id;
            stop.name = values.name;
            stop.position.lat = values.position.lat;
            stop.position.lng = values.position.lng;
            stop.zoneId = values.position.zoneId;
            return stop;
        };

        this.getUtils = function () {
            return StopUtils;
        };

        function Stop() {
            this.id = -1;
            this.name = 'New stop';
            this.position = {
                lat: 0.0,
                lng: 0.0
            };
            this.zoneId = 0;
        }

        var StopUtils = {
            getKey: function (stop) {
                return stop.id;
            },
            getDefaultKey: function () {
                return -1;
            },
            equals: function (lhs, rhs) {
                if (lhs.id !== rhs.id) return false;
                if (lhs.name !== rhs.name) return false;
                if (lhs.position.lat !== rhs.position.lat) return false;
                if (lhs.position.lng !== rhs.position.lng) return false;
                if (lhs.zoneId !== rhs.zoneId) return false;
                return true;
            },
            assign: function (target, source) {
                target.id = source.id;
                target.name = source.name;
                target.position.lat = source.position.lat;
                target.position.lng = source.position.lng;
                target.zoneId = source.zoneId;
            }
        };
    }]);
})();