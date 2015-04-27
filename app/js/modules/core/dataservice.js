(function () {
	'use strict';
	angular.module('app.services', [])
		.factory('dataservice', dataservice);

	/* @ngInject */
	function dataservice($http) {

		var service = {
			sentItems: [],
			getProfileInfo: getProfileInfo,
			getStatistics: getStatistics,
			getSentEmails: getSentEmails,
			addSentEmail: addSentEmail
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

		function addSentEmail(email){
			 /*jshint validthis:true */
			var self= this;
			self.sentItems.unshift(email);
		}

		function getSentEmails() {
			 /*jshint validthis:true */
			var self= this;
			return $http.get('API/email/get-sent-items.json.txt').then(function (response) {
					self.sentItems= response.data;
					return response.data;
				})
				.catch(function () {
					console.error('Error trying to fetch sent items');
				});
		}
	}

}());