(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesListModel', function (NotesListService) {

            function getList(callback) {
                return NotesListService.getList().then(function (result) {
                    callback(result.data);
                });
            }

            return {
                get: getList
            }
        });
})(angular);