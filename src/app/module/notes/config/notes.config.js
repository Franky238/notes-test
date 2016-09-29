(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .constant('NotesConfig', {
           URL: 'https://private-anon-0ce9bf9b39-note10.apiary-mock.com'
        })
        .constant('AlertMsg', {
            'SUCCESS': {
                'html_class': 'success',
                'message': ''
            },
            'WARNING': {
                'html_class': 'warning',
                'message': ''
            },
            'ERROR': {
                'html_class': 'error',
                'message': 'Something went wrong!'
            }
        })
    ;

})(angular);