(function () {
    'use strict';
    require('./translate');
    require('./router');    
    require('./dataservice');

    angular.module('app.core', [
        'app.translate',
        'app.router',
        'app.services',
        'ngAnimate'
    ]);
})();