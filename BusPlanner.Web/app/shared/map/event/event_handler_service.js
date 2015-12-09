(function () {
    "use strict";

    angular.module('map')
    .service('eventHandlerService', [function () {
        /**
            The event listener listens for a single event type
            and notifies a set of callbacks when the event is emitted.
        */
        function EventListener(gmapElement, eventName) {
            this.gmapElement = gmapElement;
            this.eventName = eventName;
            this.callbacks = [];

            var _this = this;
            this.gmapElement.addListener(eventName, function (e) {
                for (var i = 0; i < _this.callbacks.length; i++) {
                    _this.callbacks[i](e);
                }
            });
        }

        EventListener.prototype.addCallback = function (callback) {
            this.callbacks.push(callback);
        };

        EventListener.prototype.removeCallback = function (callback) {
            var index = this.callbacks.indexOf(callback);
            if (index != -1) {
                this.callbacks.splice(index, 1);
            }
        };


        /**
            The event handler manages event listeners and allows several callbacks to listen to a single event type. Used instead
            of directly adding listeners to the map element.
        */
        function EventHandler(gmapElement) {
            this.gmapElement = gmapElement;
            this.listeners = {};
        };

        EventHandler.prototype.addListener = function (eventName, callback) {
            if (!(eventName in this.listeners)) {
                this.listeners[eventName] = new EventListener(this.gmapElement, eventName);
            }

            this.listeners[eventName].addCallback(callback);
        };

        EventHandler.prototype.removeListener = function (eventName, callback) {
            if (eventName in this.listeners) {
                this.listeners[eventName].removeCallback(callback);
            }
        };


        /**
            Creates a new event handler
        */
        this.createEventHandler = function (gmapElement) {
            return new EventHandler(gmapElement);
        };
    }]);
})();