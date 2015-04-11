(function () {
    'use strict';

    angular
            .module('app.widgets')
            .directive('cimTopNav', cimTopNav);

    function cimTopNav() {
        var directive = {
            link: link,
            scope: {
            },
            replace: true,
            templateUrl: 'views/widgets/cimTopNav.html',
            restrict: 'AE'
        };
        return directive;

        function link(scope, element, attrs) {
        }

    }
})();
