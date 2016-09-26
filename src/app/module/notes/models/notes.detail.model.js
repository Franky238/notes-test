(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesDetailModel', function (NotesDetailService) {

            function getDetail(id, callback) {
                return NotesDetailService.getDetail(id).then(function (result) {
                    callback(result.data);
                });
            }

            return {
                get: getDetail
            }
        });
})(angular);