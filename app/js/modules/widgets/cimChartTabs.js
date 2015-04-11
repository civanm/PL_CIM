(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimChartTabs', cimChartTabs);

    function cimChartTabs() {
        var directive = {
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimChartTabs.html',
            restrict: 'AE'
        };
        return directive;

        function link(scope, element, attrs) {}

    }
})();