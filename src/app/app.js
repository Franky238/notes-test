(function (angular) {
    'use strict';

    var modules = [
        'ui.router',
        'NotesModule'
    ];

    var app = angular.module('app', modules);

    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function($injector, $location){
            $injector.invoke(function($state) {
                $state.go('home');
            });
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

    });

})(angular);