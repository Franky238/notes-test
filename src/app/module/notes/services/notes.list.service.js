(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesListService', function (NotesConfig, $http) {

            function getList() {
                return $http.get(NotesConfig.URL + '/notes');
            }

            return {
                getList: getList
            }
        });
})(angular);