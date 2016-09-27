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

            return {
                getList: getList,
                getDetail: getDetail
            }
        });
})(angular);