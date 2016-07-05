angular.module('sampleApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // NewEntrys page that will use the NewEntryController
        .when('/newEntrys', {
            templateUrl: 'views/newEntry.html',
            controller: 'NewEntryController'
        })

        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileController'
        })

        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        })

        .when('/import', {
          templateUrl: 'views/import.html',
          controller: 'ImportController'
        });

    // $locationProvider.html5Mode(true);

}]);
