angular.module('sampleApp').factory('Profile', ['$http', function($http) {

    return {
      getData: function() {
        return $http({
          url: '/api/data',
          method: 'GET'
        });
      }
    };
}]);
