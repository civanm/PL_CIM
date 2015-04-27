(function () {
    angular.module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($scope, $mdSidenav, translateService, dataservice) {
        var shell = this;

        shell.currentLang = translateService.currentLang();
        

        shell.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        };
        
        shell.toggleLang = function () {
            translateService.changeLang();
            shell.currentLang = translateService.currentLang();
        };
    }


}());