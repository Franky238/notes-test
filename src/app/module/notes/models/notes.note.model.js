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

            function createNote(title, success, error) {
                var options = {
                    title: title
                };

                NotesNoteService.createNote(options).then(function () {
                    return typeof  success === 'function' && success();
                }, function () {
                    return typeof  error === 'function' && error();
                });
            }

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote
            }
        });
})(angular);