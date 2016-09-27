(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesNoteModel', function (NotesNoteService) {

            function getList(callback) {
                return NotesNoteService.getList().then(function (result) {
                    callback(result.data);
                });
            }

            function getDetail(id, callback) {
                return NotesNoteService.getDetail(id).then(function (result) {
                    callback(result.data);
                });
            }

            return {
                getList: getList,
                getDetail: getDetail
            }
        });
})(angular);