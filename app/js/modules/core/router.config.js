(function () {
    angular.module('app.router', ['ui.router'])
        .config(config);


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $locationProvider) {


        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/pages/home.html'
            })
            .state('events', {
                url: '/events',
                templateUrl: 'views/pages/events.html'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'views/pages/account.html'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'views/pages/settings.html'
            });

        $urlRouterProvider.otherwise('/home');
    }

}());