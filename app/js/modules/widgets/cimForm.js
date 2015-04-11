(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimForm', cimForm);

    function cimForm() {
        var directive = {
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimForm.html',
            restrict: 'AE'
        };
        return directive;

        function link(scope, element, attrs) {}

    }
})();