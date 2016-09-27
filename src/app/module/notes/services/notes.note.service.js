(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesNoteService', function (NotesConfig, $http) {

            function getList() {
                return $http.get(NotesConfig.URL + '/notes');
            }

            function getDetail(id) {
                return $http.get(NotesConfig.URL + '/notes/' + id);
            }

            function createNote(payload, options) {
                var options = options || {headers: {'Content-Type': 'application/json'}};

                return $http.post(NotesConfig.URL + '/notes', payload, options);
            }

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote
            }
        });
})(angular);