(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimChartTabs', cimChartTabs);

    function cimChartTabs() {
        var directive = {
            scope: true,
            controller: ChartController,
            controllerAs: 'vm',
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimChartTabs.html',
            restrict: 'AE'
        };
        return directive;

        /* @ngInject */
        function ChartController(dataservice){
            var chart = this;

            dataservice.getStatistics().then(function (data) {
                chart.daily = data.day;
                chart.monthly = data.month;
            });
        }

        function link(scope, element, attrs) {}

    }
})();