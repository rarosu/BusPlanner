(function () {
    "use strict";

    var app = angular.module('app', [
        'ngRoute'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'views/Home.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/index'
            });
    }]);
})();
