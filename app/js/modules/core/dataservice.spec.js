
require('angular');
require('angular-mocks');
require('./core.module');

describe('dataservice', function () {
    'use strict';
    
    var deferred, scope, dataservice;

    beforeEach(function () {
        angular.mock.module('app.core');
        inject(function ($q) {
            deferred = $q;
        });

        var mockedDeferred = deferred(function (resolve, reject) {
            resolve({});
        });


        //injects angular scopes to the controller
        inject(function ($factory, $rootScope) {
            scope = $rootScope.$new();
            dataservice = $factory('dataservice', {

            });
        });

        describe('service function definitions', function () {
            it('should have getProfileInfo function', function () {
                expect(dataservice.getProfileInfo).toBeDefined();
            });
            
            it('should have getStatistics function', function(){
               expect(dataservice.getStatistics).toBeDefined();
            });
            
            it('should have getSentEmails function', function(){
               expect(dataservice.getSentEmails).toBeDefined();
            });
    
        });

    });
});