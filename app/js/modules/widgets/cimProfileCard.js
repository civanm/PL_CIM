(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cimProfileCard', cimProfileCard);

    function cimProfileCard() {
        var directive = {
            scope:{
                profile:'='
            },
            link: link,
            replace: true,
            templateUrl: 'views/widgets/cimProfileCard.html',
            restrict: 'AE'
        };
        return directive;

        function link(scope, element, attrs) {
        }

    }
})();