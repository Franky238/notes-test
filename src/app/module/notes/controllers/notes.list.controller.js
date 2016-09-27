(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesListController', function (NotesNoteModel, $scope) {
            $scope.notes = [];

            function init() {
                NotesNoteModel.getList(function (data) {
                    $scope.notes =  data;
                });
            }

            init();
        });
})(angular);