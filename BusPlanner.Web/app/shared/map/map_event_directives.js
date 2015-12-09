(function () {
    "use strict";

    var eventNames = {
        'BoundsChanged': 'bounds_changed',
        'CenterChanged': 'center_changed',
        'Click': 'click',
        'Dblclick': 'dblclick',
        'Drag': 'drag',
        'Dragend': 'dragend',
        'Dragstart': 'dragstart',
        'HeadingChanged': 'heading_changed',
        'Idle': 'idle',
        'MaptypeidChanged': 'maptypeid_changed',
        'Mousemove': 'mousemove',
        'Mouseout': 'mouseout',
        'Mouseover': 'mouseover',
        'ProjectionChanged': 'projection_changed',
        'Resize': 'resize',
        'Rightclick': 'rightclick',
        'Tilesloaded': 'tilesloaded',
        'TiltChanged': 'tilt_changed',
        'ZoomChanged': 'zoom_changed'
    };

    Object.keys(eventNames).forEach(function (eventName) {
        var directiveName = 'gmapMap' + eventName;
        angular.module('map')
        .directive(directiveName, ['$parse', function ($parse) {
            return {
                restrict: 'A',
                require: '^googleMap',
                compile: function (element, attrs) {
                    var fn = $parse(attrs[directiveName]);
                    return function link(scope, element, attrs, controller) {
                        controller.gmapElement.then(function (gmapElement) {
                            gmapElement.eventHandler.addListener(eventNames[eventName], function (e) {
                                fn(scope, { event: e });
                            });
                        });
                    }
                }
            };
        }]);
    });
})();