require('angular');
require('angular-mocks');
require('angular-material');
require('./layout.module');
require('./shell');

var mocks = require('../../mocks/mocks');

describe('Layout Shell', function () {

    var deferred, scope, shell, translateServiceMock, dataservice;

    beforeEach(function () {
        angular.mock.module('app.layout');
        inject(function ($q) {
            deferred = $q;
        });

        var mockedDeferred = deferred(function (resolve, reject) {
            resolve({});
        });

        //override mocks services with fake deferreds
        mocks.dataservice = {
            getProfileInfo: function () {
                return mockedDeferred;
            },
            getStatistics: function () {
                return mockedDeferred;
            },
            getSentEmails: function () {
                return mockedDeferred;
            }
        };

        //injects angular scopes to the controller
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            shell = $controller('Shell', {
                $scope: scope,
                $mdSidenav: mocks.$mdSidenav,
                translateService: mocks.translateService,
                dataservice: mocks.dataservice
            });
        });
    });

    describe('language', function () {

        it('should have a toggle lang func', function () {
            expect(shell.toggleLang).toBeDefined();
        });

        it('should get the current language', function () {
            spyOn(mocks.translateService, 'currentLang');
            shell.toggleLang();
            expect(mocks.translateService.currentLang).toHaveBeenCalled();
        });

        it('should call the changeLang fucnt when toggle', function () {
            spyOn(mocks.translateService, 'changeLang');
            shell.toggleLang();
            expect(mocks.translateService.changeLang).toHaveBeenCalled();
        });

    });
    describe('send email', function () {
        it('should have a send email func', function () {
            expect(shell.sendEmail).toBeDefined();
        });

        it('should add an email to the sent email list', function () {
            shell.sentItems = [];

            var email = {
                to: 'cim@gmail.com',
                subject: 'subject',
                message: 'message'
            };

            expect(shell.sentItems.length).toEqual(0);

            //callls the main func
            shell.sendEmail(email);

            expect(shell.sentItems.length).toEqual(1);
        });
        
        it('should not add the email to the sentEmail when no email is entered', function () {
            shell.sentItems = [];

            var email = {
                subject: 'subject',
                message: 'message'
            };

            expect(shell.sentItems.length).toEqual(0);

            //callls the main func
            shell.sendEmail(email);

            expect(shell.sentItems.length).toEqual(0);
        });

    });

});