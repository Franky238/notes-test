(function (angular) {
    'use strict';

    var modules = [
        'ui.router',
        'NotesModule'
    ];

    var app = angular.module('app', modules);

    app.config(function ($stateProvider, $urlRouterProvider) {
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

    });

})(angular);