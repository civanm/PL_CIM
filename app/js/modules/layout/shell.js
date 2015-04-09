(function () {
    angular.module('app.layout')
            .controller('Shell', Shell);

    /* @ngInject */
    function Shell($mdSidenav) {
        var shell = this;

        shell.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        };
    }

}());