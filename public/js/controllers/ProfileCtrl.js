angular.module('sampleApp').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$http', 'Profile'];

function ProfileController($scope, $http, Profile) {

  $scope.view = {
    
  }
  $(document).ready(function(){
  $('ul.tabs').tabs();
  });

  $scope.allData = function() {
    console.log("page loaded!");
    Profile.getData().then(function(result) {
      console.log(result);
    });
  };
  // google.charts.load("current", {"packages":["corechart"]});
  // google.charts.setOnLoadCallback(watsonChart);
  // google.charts.setOnLoadCallback(userChart);
  //
  // function watsonChart() {
  //   var data = google.visualization.arrayToDataTable([
  //     ['Task', 'Hours per Day'],
  //     ['Work',     11],
  //     ['Eat',      2],
  //     ['Commute',  2],
  //     ['Watch TV', 2],
  //     ['Sleep',    7]
  //   ]);
  //
  //   var options = {
  //     pieHole: 0.4
  //   };
  //
  //   var chart = new google.visualization.PieChart(document.getElementById('watson_chart'));
  //   chart.draw(data, options);
  // }
  //
  // function userChart() {
  //   var data = google.visualization.arrayToDataTable([
  //     ['Task', 'Hours per Day'],
  //     ['Work',     11],
  //     ['Eat',      2],
  //     ['Commute',  2],
  //     ['Watch TV', 2],
  //     ['Sleep',    7]
  //   ]);
  //
  //   var options = {
  //     pieHole: 0.4
  //   };
  //
  //   var chart = new google.visualization.PieChart(document.getElementById('user_chart'));
  //   chart.draw(data, options);
  // }

}
