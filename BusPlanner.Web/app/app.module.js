(function () {
    "use strict";

    var app = angular.module('busplanner', [
        'ngRoute',
        'ngResource',
        //'uiGmapgoogle-maps',
        'controller_css',
        'navbar',
        'map'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'components/home/home_template.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                css: 'components/home/home_style.css'
            })
            .when('/edit/stops', {
                templateUrl: 'components/edit_stops/edit_stops_template.html',
                controller: "EditStopsController",
                controllerAs: 'vm',
                css: 'components/edit_stops/edit_stops_style.css'
            })
            .otherwise({
                redirectTo: '/index'
            });
    }])
    .config(['mapLoaderProvider', function (mapLoaderProvider) {
        mapLoaderProvider.config({
            key: 'AIzaSyA87KnhDx803U8qQ4oT_knbqd4XHbo9Tj0'
        });
    }]);
    /*
    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyA87KnhDx803U8qQ4oT_knbqd4XHbo9Tj0'
        });
    }]);
    */
})();
