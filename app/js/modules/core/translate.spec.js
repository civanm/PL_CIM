
require('angular');
require('angular-mocks');
require('angular-translate');
require('./translate');

describe('translateService', function () {
    'use strict';
    
    var service;

    beforeEach(function () {
        //injects the module
        angular.mock.module('app.translate');

        //injects angular scopes to the controller
        angular.mock.inject(function (translateService) {
            service = translateService;
        });
        
    });

    describe('service function definitions', function () {

        it('should have a func to change the language', function () {
            expect(service.changeLang).toBeDefined();
        });

        it('should have a func to get the current Lang', function () {
            expect(service.currentLang).toBeDefined();
        });

        it('should have the current lang in english', function () {
            expect(service.currentLang()).toBe('en');
        });

        it('should toggle the language to spanish', function () {
            expect(service.currentLang()).toBe('en');
            service.changeLang();
            expect(service.currentLang()).toBe('es');
        });

    });

});