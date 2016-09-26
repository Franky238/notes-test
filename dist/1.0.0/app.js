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
        .controller('NotesDetailController', ["NotesDetailModel", "$scope", "$stateParams", function (NotesDetailModel, $scope, $stateParams) {
            $scope.note = {};

            NotesDetailModel.get($stateParams.id, function (data) {
                $scope.note = data;
            })

        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .controller('NotesListController', ["NotesDetailModel", "NotesListModel", "$scope", function (NotesDetailModel, NotesListModel, $scope) {
            $scope.notes = [];
            $scope.note = {};

            function init() {
                NotesListModel.get(function (data) {
                    $scope.notes =  data;
                });
            }

            init();
        }]);
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
        .factory('NotesDetailModel', ["NotesDetailService", function (NotesDetailService) {

            function getDetail(id, callback) {
                return NotesDetailService.getDetail(id).then(function (result) {
                    callback(result.data);
                });
            }

            return {
                get: getDetail
            }
        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesListModel', ["NotesListService", function (NotesListService) {

            function getList(callback) {
                return NotesListService.getList().then(function (result) {
                    callback(result.data);
                });
            }

            return {
                get: getList
            }
        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesDetailService', ["NotesConfig", "$http", function (NotesConfig, $http) {

            function getDetail(id) {
                return $http.get(NotesConfig.URL + '/notes/' + id);
            }

            return {
                getDetail: getDetail
            }
        }]);
})(angular);
(function (angular) {
    'use strict';

    angular.module('NotesModule')
        .factory('NotesListService', ["NotesConfig", "$http", function (NotesConfig, $http) {

            function getList() {
                return $http.get(NotesConfig.URL + '/notes');
            }

            return {
                getList: getList
            }
        }]);
})(angular);
//# sourceMappingURL=app.js.map
