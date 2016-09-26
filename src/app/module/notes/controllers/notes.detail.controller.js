(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesDetailController', function (NotesDetailModel, $scope, $stateParams) {
            $scope.note = {};

            NotesDetailModel.get($stateParams.id, function (data) {
                $scope.note = data;
            })

        });
})(angular);