(function () {
    "use strict";

    var eventNames = {
        'AnimationChanged': 'animation_changed',
        'Click': 'click',
        'ClickableChanged': 'clickable_changed',
        'CursorChanged': 'cursor_changed',
        'Dblclick': 'dblclick',
        'Drag': 'drag',
        'Dragend': 'dragend',
        'DraggableChanged': 'draggable_changed',
        'Dragstart': 'dragstart',
        'FlatChanged': 'flat_changed',
        'IconChanged': 'icon_changed',
        'Mousedown': 'mousedown',
        'Mouseout': 'mouseout',
        'Mouseover': 'mouseover',
        'Mouseup': 'mouseup',
        'PositionChanged': 'position_changed',
        'Rightclick': 'rightclick',
        'ShapeChanged': 'shape_changed',
        'TitleChanged': 'title_changed',
        'VisibleChanged': 'visible_changed',
        'ZindexChanged': 'zindex_changed'
    };

    Object.keys(eventNames).forEach(function (eventName) {
        var directiveName = 'gmapMarker' + eventName;
        angular.module('map')
        .directive(directiveName, ['$parse', function ($parse) {
            return {
                restrict: 'A',
                require: '^googleMapMarker',
                compile: function(element, attrs) {
                    var fn = $parse(attrs[directiveName]);
                    return function link(scope, element, attrs, controller) {
                        controller.gmapElement.then(function (gmapElement) {
                            gmapElement.element.addListener(eventNames[eventName], function (e) {
                                fn(scope, { event: e });
                            });
                        });
                    }
                }
            };
        }]);
    });
})();