
require('angular');
require('angular-mocks');
require('./dataservice');

describe('dataservice', function () {
    'use strict';
    
    var dataservice;

    beforeEach(function () {
        angular.mock.module('app.services');
        inject(function ($q) {
            deferred = $q;
        });
        
         //injects angular scopes to the controller
        inject(function (_dataservice_) {
            dataservice = _dataservice_;
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

    describe('send email', function () {
        it('should have a send email func', function () {
            expect(dataservice.addSentEmail).toBeDefined();
        });

        it('should add an email to the sent email list', function () {
            dataservice.sentItems = [];

            var email = {
                to: 'cim@gmail.com',
                subject: 'subject',
                message: 'message'
            };

            expect(dataservice.sentItems.length).toEqual(0);

            //callls the main func
            dataservice.addSentEmail(email);

            expect(dataservice.sentItems.length).toEqual(1);
        });
    });
});