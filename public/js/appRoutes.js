angular.module('sampleApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

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

    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'NewEntryController'
    });

}]);
