(function () {
    "use strict";

    var app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'uiGmapgoogle-maps'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'views/Home.html',
                controller: 'HomeController as vm'
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
