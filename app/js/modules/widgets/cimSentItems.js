(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimSentItems', cimSentItems);

    function cimSentItems() {
        var directive = {
            scope:{
                items:'='
            },
            controller: SentItemsController,
            controllerAs: 'vm',
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimSentItems.html',
            restrict: 'AE'
        };

        return directive;

        /* @ngInject */
        function SentItemsController(dataservice){
            var vm = this;
            dataservice.getSentEmails().then(function (data) {
                vm.sentItems = data;
            });

        }

        function link(scope, element, attrs) {}

    }
})();