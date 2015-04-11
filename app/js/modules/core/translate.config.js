(function () {
    angular.module('app.translate', ['pascalprecht.translate'])
        .config(config)
        .factory('translateService', translateService);



    /* @ngInject */
    function translateService($translate) {
        var service = {
            changeLang: function () {
                var current = $translate.use(),
                    toSelect = current === 'en' ? 'es' : 'en';

                $translate.use(toSelect);

            },
            currentLang: function () {
                return $translate.use();
            }
        };

        return service;
    }

    /* @ngInject */
    function config($translateProvider) {
        $translateProvider.translations('en', {
            'HOME': 'Home',
            'EVENTS': 'Events',
            'ACCOUNT': 'Account',
            'SETTINGS': 'Settings',
            'TAB_STATUS_DAILY': 'Daily',
            'TAB_STATUS_MONTHLY': 'Monthly',
            'DATA_TRANSFER': 'Data Transfer',
            'AUDIO': 'Audio',
            'VIDEO': 'Video',
            'PHOTO': 'Photo',
            'UPLOAD_FILES': 'Upload Files',
            'SHARE_LINK': 'Share Link',
            'BACKUP': 'Backup',
            'FILES': 'files',
            'EMAIL': 'Email',
            'SUBJECT': 'Subject',
            'MESSAGE': 'Message',
            'SEND_EMAIL': 'Send Email',
            'NEW_EMAIL':'New Email',
            'SENT_EMAILS':'Sent Emails'
        });

        $translateProvider.translations('es', {
            'HOME': 'Inicio',
            'EVENTS': 'Eventos',
            'ACCOUNT': 'Cuenta',
            'SETTINGS': 'Ajustes',
            'TAB_STATUS_DAILY': 'Diario',
            'TAB_STATUS_MONTHLY': 'Mensual',
            'DATA_TRANSFER': 'Transferencia de Datos',
            'AUDIO': 'Audio',
            'VIDEO': 'Video',
            'PHOTO': 'Foto',
            'UPLOAD_FILES': 'Subir Archivos',
            'SHARE_LINK': 'Compartir Enlace',
            'BACKUP': 'Copia Respaldo',
            'FILES': 'archivos',
            'EMAIL': 'Email',
            'SUBJECT': 'Asunto',
            'MESSAGE': 'Mensaje',
            'SEND_EMAIL': 'Enviar Email',
            'NEW_EMAIL':'Nuevo Email',
            'SENT_EMAILS':'Email Enviados'
        });

        $translateProvider.preferredLanguage('en');
    }

}());