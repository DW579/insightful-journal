angular.module('sampleApp').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$http'];

function ProfileController($scope, $http) {

  $(document).ready(function(){
  $('ul.tabs').tabs();
  });

}
