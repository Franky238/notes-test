(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesNoteService', function (NotesConfig, $http) {
            var defaultOptions = {headers: {'Content-Type': 'application/json'}};


            function getList() {
                return $http.get(NotesConfig.URL + '/notes');
            }

            function getDetail(id) {
                return $http.get(NotesConfig.URL + '/notes/' + id);
            }

            function createNote(payload, options) {
                var options = typeof options === 'undefined' ? defaultOptions : options;

                return $http.post(NotesConfig.URL + '/notes', payload, options);
            }

            function updateNote(payload, options) {
                var options = typeof options === 'undefined' ? defaultOptions : options;

                return $http.put(NotesConfig.URL + '/notes/' + payload.id, payload, options);
            }

            function deleteNote(id, options) {
                var options = typeof options === 'undefined' ? defaultOptions : options;

                return $http.delete(NotesConfig.URL + '/notes/' + id, options);
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