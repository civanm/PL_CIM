(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimProfileCard', cimProfileCard);

    function cimProfileCard() {
        var directive = {
            scope: true,
            controller: ProfileController,
            controllerAs: 'vm',
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimProfileCard.html',
            restrict: 'AE'
        };
        return directive;

        /* @ngInject */
        function ProfileController(dataservice){
            var vm = this;

            dataservice.getProfileInfo().then(function (data) {
                vm.profile = data.profile;
            });
        }

        function link(scope, element, attrs) {
        }

    }
})();