(function () {
    'use strict';
    angular.module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q) {

        var service = {
            getProfileInfo: getProfileInfo,
            getStatistics: getStatistics,
            getSentEmails: getSentEmails
        };

        return service;


        function getProfileInfo() {
            return $http.get('API/profile/get-info.json.txt').then(function (response) {
                    return response.data[0];
                })
                .catch(function () {
                    console.error('Error trying to fetch profile');
                });
        }

        function getStatistics() {
            return $http.get('API/statistics/get-data-transfer.json.txt').then(function (response) {
                    return response.data[0];
                })
                .catch(function () {
                    console.error('Error trying to fetch statistics');
                });
        }

        function getSentEmails() {
            return $http.get('API/email/get-sent-items.json.txt').then(function (response) {
                    return response.data;
                })
                .catch(function () {
                    console.error('Error trying to fetch statistics');
                });
        }

    }

}());