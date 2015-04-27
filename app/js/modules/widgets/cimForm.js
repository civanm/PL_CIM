(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimForm', cimForm);

    function cimForm() {
        var directive = {
            scope:{
                sentItems:'=',
            },
            controller: EmailController,
            controllerAs: 'vm',
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimForm.html',
            restrict: 'AE'
        };
        return directive;

        /* @ngInject */
        function EmailController($scope, dataservice){
            var vm = this;
            vm.email = {};

            vm.sendEmail = function (email) {
                if (email && email.to && email.subject) {
                    var newEmail = {
                        avatar:'avatars/empty.png',
                        subject: email.subject,
                        to: email.to,
                        message: email.message
                    };
                    
                    dataservice.addSentEmail(newEmail);

                    vm.email = {};
                }
            };
        }


        function link(scope, element, attrs) {}

    }
})();