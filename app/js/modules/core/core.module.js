(function () {
    'use strict';
    require('./translate.config');
    
    angular.module('app.core', [
        'app.translate',
        'ngAnimate'
    ]);
    require('./dataservice');
})();