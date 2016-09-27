(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesDetailController', function (NotesNoteModel, $scope, $stateParams) {
            $scope.note = {};

            NotesNoteModel.getDetail($stateParams.id, function (data) {
                $scope.note = data;
            })

        });
})(angular);