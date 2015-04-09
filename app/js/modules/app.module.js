(function () {
    'use strict';

    //requires the modules 
    require('./core/core.module');
    require('./layout/layout.module');
    require('./widgets/widgets.module');

    //adds the applications modules
    angular.module('app', [
        'ngMaterial',
        'app.core',
        'app.layout',
        'app.widgets'
    ]);

}());