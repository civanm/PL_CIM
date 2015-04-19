(function () {
    'use strict';
    require('./translate.config');
    require('./router.config');

    angular.module('app.core', [
        'app.translate',
        'app.router',
        'ngAnimate'
    ]);
    require('./dataservice');
})();