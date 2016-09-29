(function (angular) {
    'use strict';

    var modules = [
        'ui.router',
        'NotesModule'
    ];

    var app = angular.module('app', modules);

    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function($injector, $location){
            $injector.invoke(["$state", function($state) {
                $state.go('home');
            }]);
        });

        $stateProvider
            .state('home', {
                url: ""
            })
            .state('notes', {
                url: '^/notes',
                templateUrl: 'src/app/module/notes/partials/notes.list.partial.html'
            })
            .state('detail', {
                url: '/notes/{id:int}',
                templateUrl: 'src/app/module/notes/partials/notes.detail.partial.html'
            })
            .state('create', {
                url: '^/notes/create',
                templateUrl: 'src/app/module/notes/partials/notes.create.partial.html'
            })
            .state('update', {
                url: '^/notes/update/{id:int}',
                templateUrl: 'src/app/module/notes/partials/notes.update.partial.html'
            })
        ;

    }]);

})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule', []);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .constant('NotesConfig', {
           URL: 'https://private-anon-0ce9bf9b39-note10.apiary-mock.com'
        })
        .constant('AlertMsg', {
            'SUCCESS': {
                'html_class': 'success',
                'message': ''
            },
            'WARNING': {
                'html_class': 'warning',
                'message': ''
            },
            'ERROR': {
                'html_class': 'error',
                'message': 'Something went wrong!'
            }
        })
    ;

})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesNoteController', ["NotesNoteModel", "$scope", "$stateParams", "$state", "$rootScope", "AlertMsg", function (NotesNoteModel, $scope, $stateParams, $state, $rootScope, AlertMsg) {
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
        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesNoteModel', ["NotesNoteService", function (NotesNoteService) {

            function getList(callback) {
                return NotesNoteService.getList().then(function (result) {
                    callback(result.data);
                });
            }

            function getDetail(id, callback) {
                return NotesNoteService.getDetail(id).then(function (result) {
                    callback(result.data);
                });
            }

            function createNote(title, success, error) {
                var options = {
                    title: title
                };

                NotesNoteService.createNote(options).then(function () {
                    return typeof  success === 'function' && success();
                }, function () {
                    return typeof  error === 'function' && error();
                });
            }

            function updateNote(id, title, success, error) {
                var options = {
                    id: id,
                    title: title
                };

                NotesNoteService.updateNote(options).then(function () {
                    return typeof  success === 'function' && success();
                }, function () {
                    return typeof  error === 'function' && error();
                });
            }

            function deleteNote(id, success, error) {
                NotesNoteService.deleteNote(id).then(function () {
                    return typeof  success === 'function' && success();
                }, function () {
                    return typeof  error === 'function' && error();
                })

            }

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote,
                updateNote: updateNote,
                deleteNote: deleteNote
            }
        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesNoteService', ["NotesConfig", "$http", function (NotesConfig, $http) {
            var defaultOptions = {headers: {'Content-Type': 'application/json'}};


            function getList() {
                return $http.get(NotesConfig.URL + '/notes');
            }

            function getDetail(id) {
                return $http.get(NotesConfig.URL + '/notes/' + id);
            }

            function createNote(payload, options) {
                var options = typeof options === 'undefined' ? defaultOptions : options;

                return $http.post(NotesConfig.URL + '/notes', payload, options);
            }

            function updateNote(payload, options) {
                var options = typeof options === 'undefined' ? defaultOptions : options;

                return $http.put(NotesConfig.URL + '/notes/' + payload.id, payload, options);
            }

            function deleteNote(id, options) {
                var options = typeof options === 'undefined' ? defaultOptions : options;

                return $http.delete(NotesConfig.URL + '/notes/' + id, options);
            }

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote,
                updateNote: updateNote,
                deleteNote: deleteNote
            }
        }]);
})(angular);
//# sourceMappingURL=app.js.map
