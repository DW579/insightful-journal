angular.module('sampleApp').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$http', 'Profile'];

function ProfileController($scope, $http, Profile) {

  $scope.view = {
    dataArray: [],
    filterEntry: 0,
    journalArray: [],
    notebookArray: [],
    jobArray: [],
    ideasArray: []
  };

  $(document).ready(function(){
    $('ul.tabs').tabs();
  });

  var journalData;
  var notebookData;
  var jobData;
  var ideasData;

  $scope.allData = function() {
    Profile.getData().then(function(result) {
      for(var i = 0; i < (result.data).length; i++) {
        $scope.view.dataArray.push(result.data[i]);
        if(result.data[i].folder === 'journal') {
          $scope.view.journalArray.push(result.data[i].entry_content);
        }
        else if(result.data[i].folder === 'notebook') {
          $scope.view.notebookArray.push(result.data[i].entry_content);
        }
        else if(result.data[i].folder === 'job') {
          $scope.view.jobArray.push(result.data[i].entry_content);
        }
        else if(result.data[i].folder === 'ideas') {
          $scope.view.ideasArray.push(result.data[i].entry_content);
        }
        else {
          console.log("Did not match any folders");
        }
      }
      journalData = $scope.view.journalArray.join(" ");
      notebookData = $scope.view.notebookArray.join(" ");
      jobData = $scope.view.jobArray.join(" ");
      ideasData = $scope.view.ideasArray.join(" ");

      Profile.createJournal(journalData).then(function(result) {
        console.log(result.data);
      });
      Profile.personalityNotebook(notebookData).then(function(result) {
        console.log(result.data);
      });
      Profile.personalityJob(jobData).then(function(result) {
        console.log(result.data);
      });
      Profile.personalityIdeas(ideasData).then(function(result) {
        console.log(result.data);
      });
    });
  };
}
