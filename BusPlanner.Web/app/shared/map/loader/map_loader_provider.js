(function () {
    "use strict";

    angular.module('map')
    .provider('mapLoader', function MapLoaderProvider() {
        this.params = {
            key: ''
        };

        this.config = function (params) {
            this.params.key = params.key;
        };

        this.$get = ['mapScriptLoader', function (loader) {
            return loader.load(this.params);
        }];
    });
})();