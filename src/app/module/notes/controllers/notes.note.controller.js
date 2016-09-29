(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesNoteController', function (NotesNoteModel, $scope, $stateParams, $state, $rootScope, AlertMsg) {
            $scope.notes = [];
            $scope.note = {
                successSend: false,
                errorSend: false
            };
            $scope.alert = {};

            $scope.deleteNote = function (id) {
                NotesNoteModel.deleteNote(id, function () {
                    var msg = AlertMsg.SUCCESS;
                    msg.message = 'Note with id ' + id + ' was deleted';
                    $rootScope.$broadcast('ALERT_MESSAGE', msg);

                    return $state.go('notes');
                }, function () {
                    $scope.note.errorSend = true;
                });
            };

            $scope.updateNote = function () {
                var title = $scope.note.title;
                var id = $stateParams.id;

                if (angular.isUndefined(title) || title.length === 0) {
                    return;
                }

                NotesNoteModel.updateNote(id, title, function () {
                    $scope.note.successSend = true;
                }, function () {
                    $scope.note.errorSend = true;
                });
            };

            $scope.createNote = function () {
                var title = $scope.note.title;

                if (angular.isUndefined(title) || title.length === 0) {
                    return;
                }

                NotesNoteModel.createNote(title, function () {
                    $scope.note.successSend = true;
                }, function () {
                    $scope.note.errorSend = true;
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

                /**
                 * In this demonstration this casting and catching event is no needed.
                 * BUT this is demonstration of alert message cast if we will need it in another controller
                 * @TODO create view for this
                 */
                $rootScope.$on('ALERT_MESSAGE', function (event, msgOptions) {
                    $scope.alert = msgOptions;
                });
            }

            init();
        });
})(angular);