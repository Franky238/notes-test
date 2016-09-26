(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesDetailService', function (NotesConfig, $http) {

            function getDetail(id) {
                return $http.get(NotesConfig.URL + '/notes/' + id);
            }

            return {
                getDetail: getDetail
            }
        });
})(angular);