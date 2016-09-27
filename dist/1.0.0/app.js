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
                url: '/notes/:id',
                templateUrl: 'src/app/module/notes/partials/notes.detail.partial.html'
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
        .controller('NotesDetailController', ["NotesNoteModel", "$scope", "$stateParams", function (NotesNoteModel, $scope, $stateParams) {
            $scope.note = {};

            NotesNoteModel.getDetail($stateParams.id, function (data) {
                $scope.note = data;
            })

        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesListController', ["NotesNoteModel", "$scope", function (NotesNoteModel, $scope) {
            $scope.notes = [];

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

            return {
                getList: getList,
                getDetail: getDetail
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

            return {
                getList: getList,
                getDetail: getDetail
            }
        }]);
})(angular);
//# sourceMappingURL=app.js.map
