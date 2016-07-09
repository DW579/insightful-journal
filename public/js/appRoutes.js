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

        .when('/explanation', {
          templateUrl: 'views/explanation.html',
          controller: 'NewEntryController'
        });

    // $locationProvider.html5Mode(true);

}]);
