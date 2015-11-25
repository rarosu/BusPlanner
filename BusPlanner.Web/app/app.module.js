(function () {
    "use strict";

    var app = angular.module('busplanner', [
        'ngRoute',
        'ngResource',
        'uiGmapgoogle-maps',
        'navbar'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'components/home/home_template.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/edit/stops', {
                templateUrl: 'components/edit_stops/edit_stops_template.html',
                controller: "EditStopsController",
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/index'
            });
    }])
    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyA87KnhDx803U8qQ4oT_knbqd4XHbo9Tj0'
        });
    }]);
})();
