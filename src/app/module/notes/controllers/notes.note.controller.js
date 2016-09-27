(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesNoteController', function (NotesNoteModel, $scope, $stateParams) {
            $scope.notes = [];
            $scope.note = {};
            $scope.newNote = {};

            $scope.createNote = function () {
                $scope.newNote.errorSend = false;
                $scope.newNote.successSend = false;
                var title = $scope.newNote.title;

                if (angular.isUndefined(title) || title.length === 0) {
                    return;
                }

                NotesNoteModel.createNote(title, function () {
                    $scope.newNote.successSend = true;
                }, function () {
                    $scope.newNote.errorSend = true;
                });
            };

            $scope.getDetail = function () {
                return NotesNoteModel.getDetail($stateParams.id, function (data) {
                    return $scope.note = data;
                });
            };

            function init() {
                NotesNoteModel.getList(function (data) {
                    $scope.notes =  data;
                });
            }

            init();
        });
})(angular);