(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimSentItems', cimSentItems);

    function cimSentItems() {
        var directive = {
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimSentItems.html',
            restrict: 'AE'
        };
        return directive;

        function link(scope, element, attrs) {}

    }
})();