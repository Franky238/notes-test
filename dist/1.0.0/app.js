(function (angular) {
    'use strict';

    var modules = [
        'ui.router',
        'NotesModule'
    ];

    var app = angular.module('app', modules);

    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function($injector, $location){
            $injector.invoke(['$state', function($state) {
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
        });

})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesNoteController', ["NotesNoteModel", "$scope", "$stateParams", function (NotesNoteModel, $scope, $stateParams) {
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

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote
            }
        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesNoteService', ["NotesConfig", "$http", function (NotesConfig, $http) {

            function getList() {
                return $http.get(NotesConfig.URL + '/notes');
            }

            function getDetail(id) {
                return $http.get(NotesConfig.URL + '/notes/' + id);
            }

            function createNote(payload, options) {
                var options = options || {headers: {'Content-Type': 'application/json'}};

                return $http.post(NotesConfig.URL + '/notes', payload, options);
            }

            return {
                getList: getList,
                getDetail: getDetail,
                createNote: createNote
            }
        }]);
})(angular);
//# sourceMappingURL=app.js.map
