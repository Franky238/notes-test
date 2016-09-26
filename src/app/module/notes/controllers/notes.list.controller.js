(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesListController', function (NotesDetailModel, NotesListModel, $scope) {
            $scope.notes = [];
            $scope.note = {};

            function init() {
                NotesListModel.get(function (data) {
                    $scope.notes =  data;
                });
            }

            init();
        });
})(angular);