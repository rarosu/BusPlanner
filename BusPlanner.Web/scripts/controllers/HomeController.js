(function () {
    "use strict";

    angular
        .module('app')
        .controller('HomeController', function () {
            var vm = this;

            vm.testdata = [ 
                { 
                    name: "Hello",
                    description: "Description"
                },
                {
                    name: "Bye",
                    description: "No description"
                }
            ];
        });
})();
