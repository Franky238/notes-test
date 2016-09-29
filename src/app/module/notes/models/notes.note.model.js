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

            function updateNote(id, title, success, error) {
                var options = {
                    id: id,
                    title: title
                };

                NotesNoteService.updateNote(options).then(function () {
                    return typeof  success === 'function' && success();
                }, function () {
                    return typeof  error === 'function' && error();
                });
            }

            function deleteNote(id, success, error) {
                NotesNoteService.deleteNote(id).then(function () {
                    return typeof  success === 'function' && success();
                }, function () {
                    return typeof  error === 'function' && error();
                })

            }

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote,
                updateNote: updateNote,
                deleteNote: deleteNote
            }
        });
})(angular);