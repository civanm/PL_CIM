(function () {
    angular.module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($scope, $mdSidenav, translateService, dataservice) {
        var shell = this;

        shell.currentLang = translateService.currentLang();
        shell.email = {};

        shell.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        };
        shell.toggleLang = function () {
            translateService.changeLang();
            shell.currentLang = translateService.currentLang();
        };

        dataservice.getProfileInfo().then(function (data) {
            shell.profile = data.profile;
        });
        dataservice.getStatistics().then(function (data) {
            shell.daily = data.day;
            shell.monthly = data.month;
        });
        dataservice.getSentEmails().then(function (data) {
            shell.sentItems = data;
        });

        shell.sendEmail = function (email) {
            if (email && email.to && email.subject) {
                var newEmail = {
                    avatar:'avatars/empty.png',
                    subject: shell.email.subject,
                    to: email.to,
                    message: email.message
                };
                shell.sentItems.unshift(newEmail);
                shell.email = {};
            }
        };
    }


}());