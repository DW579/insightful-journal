angular.module('sampleApp').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$http', 'Profile'];

function ProfileController($scope, $http, Profile) {

  $scope.view = {
    dataArray: [],
    filterEntry: 0,
    journalContentArray: [],
    notebookArray: [],
    jobArray: [],
    ideasArray: [],
    journalResults: [],
    journalAngerTotalWatson: [],
    journalDisgustTotalWatson: [],
    journalFearTotalWatson: [],
    journalJoyTotalWatson: [],
    journalSadnessTotalWatson: [],
    topWatsonJournalEmotionTotal: 0,
    topWatsonJournalEmotionTitle: '',
    journalAngerTotalUser: [],
    journalDisgustTotalUser: [],
    journalFearTotalUser: [],
    journalJoyTotalUser: [],
    journalSadnessTotalUser: [],
    journalAllTopLanguagesArray: [],
    journalAnalyticalArray: [],
    journalConfidentArray: [],
    journalTentativeArray: [],
    journalAllTopSocialArray: [],
    journalHighestLanguageTotal: 0,
    journalOverallLanguage: '',
    journalOpennessArray: [],
    journalConscientiousnessArray: [],
    journalExtraversionArray: [],
    journalAgreeablenessArray: [],
    journalEmotionalRangeArray: [],
    journalHighestSocialTotal: 0,
    journalOverallSocial: '',
    notebookResults: [],
    jobResults: [],
    ideasResults: []
  };

  $(document).ready(function(){
    $('ul.tabs').tabs();
  });

  var journalData;
  var notebookData;
  var jobData;
  var ideasData;

  $scope.allData = function() {

    // ****** Getting all Data from Database ******

    Profile.getData().then(function(result) {
      for(var i = 0; i < (result.data).length; i++) {
        $scope.view.dataArray.push(result.data[i]);
        if(result.data[i].folder === 'journal') {
          $scope.view.journalContentArray.push(result.data[i].entry_content);
          $scope.view.journalAllTopLanguagesArray.push(result.data[i].highest_language);
          $scope.view.journalAllTopSocialArray.push(result.data[i].highest_social);
          if(result.data[i].highest_emotion === 'anger') {
            $scope.view.journalAngerTotalWatson.push(result.data[i].highest_emotion);
          }
          else if(result.data[i].highest_emotion === 'disgust') {
            $scope.view.journalDisgustTotalWatson.push(result.data[i].highest_emotion);
          }
          else if(result.data[i].highest_emotion === 'fear') {
            $scope.view.journalFearTotalWatson.push(result.data[i].highest_emotion);
          }
          else if(result.data[i].highest_emotion === 'joy') {
            $scope.view.journalJoyTotalWatson.push(result.data[i].highest_emotion);
          }
          else if(result.data[i].highest_emotion === 'sadness') {
            $scope.view.journalSadnessTotalWatson.push(result.data[i].highest_emotion);
          }
          else {
            console.log("No watson emotion");
          }
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

      for(var k = 0; k < (result.data).length; k++) {
        if(result.data[k].user_emotion === 'anger') {
          $scope.view.journalAngerTotalUser.push(result.data[k].user_emotion);
        }
        else if(result.data[k].user_emotion === 'disgust') {
          $scope.view.journalDisgustTotalUser.push(result.data[k].user_emotion);
        }
        else if(result.data[k].user_emotion === 'fear') {
          $scope.view.journalFearTotalUser.push(result.data[k].user_emotion);
        }
        else if(result.data[k].user_emotion === 'joy') {
          $scope.view.journalJoyTotalUser.push(result.data[k].user_emotion);
        }
        else if(result.data[k].user_emotion === 'sadness') {
          $scope.view.journalSadnessTotalUser.push(result.data[k].user_emotion);
        }
        else {
          console.log("No user emotion");
        }
      }

      journalData = $scope.view.journalContentArray.join(" ");
      notebookData = $scope.view.notebookArray.join(" ");
      jobData = $scope.view.jobArray.join(" ");
      ideasData = $scope.view.ideasArray.join(" ");

      // ****** Figuring out top language tone for journal *******
      for(var l = 0; l < ($scope.view.journalAllTopLanguagesArray).length; l++) {
        if($scope.view.journalAllTopLanguagesArray[l] === 'analytical') {
          $scope.view.journalAnalyticalArray.push($scope.view.journalAllTopLanguagesArray[l]);
        }
        else if($scope.view.journalAllTopLanguagesArray[l] === 'confident') {
          $scope.view.journalConfidentArray.push($scope.view.journalAllTopLanguagesArray[l]);
        }
        else if($scope.view.journalAllTopLanguagesArray[l] === 'tentative') {
          $scope.view.journalTentativeArray.push($scope.view.journalAllTopLanguagesArray[l]);
        }
        else {
          console.log("A different language");
        }
      }

      $scope.view.journalHighestLanguageTotal = Math.max(($scope.view.journalAnalyticalArray).length, ($scope.view.journalConfidentArray).length, ($scope.view.journalTentativeArray).length);
      if($scope.view.journalHighestLanguageTotal === ($scope.view.journalAnalyticalArray).length) {
        $scope.view.journalOverallLanguage = 'Analytical';
      }
      else if($scope.view.journalHighestLanguageTotal === ($scope.view.journalConfidentArray).length) {
        $scope.view.journalOverallLanguage = 'Confident';
      }
      else if($scope.view.journalHighestLanguageTotal === ($scope.view.journalTentativeArray).length) {
        $scope.view.journalOverallLanguage = 'Tentative';
      }

      // ******* Figuring out top Social tone for Journal *******
      for(var a = 0; a < ($scope.view.journalAllTopSocialArray).length; a++) {
        if($scope.view.journalAllTopSocialArray[a] === 'openness') {
          $scope.view.journalOpennessArray.push($scope.view.journalAllTopSocialArray[a]);
        }
        else if($scope.view.journalAllTopSocialArray[a] === 'conscientiousness') {
          $scope.view.journalConscientiousnessArray.push($scope.view.journalAllTopSocialArray[a]);
        }
        else if($scope.view.journalAllTopSocialArray[a] === 'extraversion') {
          $scope.view.journalExtraversionArray.push($scope.view.journalAllTopSocialArray[a]);
        }
        else if($scope.view.journalAllTopSocialArray[a] === 'agreeableness') {
          $scope.view.journalAgreeablenessArray.push($scope.view.journalAllTopSocialArray[a]);
        }
        else {
          console.log("Could be Emotional Range for Journal");
        }
      }

      $scope.view.journalHighestSocialTotal = Math.max(($scope.view.journalOpennessArray).length, ($scope.view.journalConscientiousnessArray).length, ($scope.view.journalExtraversionArray).length, ($scope.view.journalAgreeablenessArray).length);
      if($scope.view.journalHighestSocialTotal === ($scope.view.journalOpennessArray).length) {
        $scope.view.journalOverallSocial = 'Openness';
      }
      else if($scope.view.journalHighestSocialTotal === ($scope.view.journalConscientiousnessArray).length) {
        $scope.view.journalOverallSocial = 'Conscientiousness';
      }
      else if($scope.view.journalHighestSocialTotal === ($scope.view.journalExtraversionArray).length) {
        $scope.view.journalOverallSocial = 'Extraversion';
      }
      else if($scope.view.journalHighestSocialTotal === ($scope.view.journalAgreeablenessArray).length) {
        $scope.view.journalOverallSocial = 'Agreeableness';
      }

      // ***** Getting Personality Results for Journal Folder and making graphs ******

      Profile.createJournal(journalData).then(function(result) {
        console.log(result.data);
        $scope.view.journalResults = result.data;

        google.charts.load("current", {"packages":["corechart"]});
        google.charts.setOnLoadCallback(watsonChart);
        google.charts.setOnLoadCallback(userChart);
        google.charts.setOnLoadCallback(journalPersonalityChart);
        google.charts.setOnLoadCallback(journalNeedsChart);
        google.charts.setOnLoadCallback(journalValuesChart);

        function journalPersonalityChart() {
          var data = google.visualization.arrayToDataTable([
            ["Personality", "Percent", { role: "style" } ],
            ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#b87333"],
            ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "silver"],
            ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "gold"],
            ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "color: #e5e4e2"],
            ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Personality of Journal",
            width: "100%",
            height: 200,
            bar: {groupWidth: "50%"},
            legend: { position: "none" }
          };
          var chart = new google.visualization.BarChart(document.getElementById("journalPersonalityChart"));
          chart.draw(view, options);
        }

        function journalNeedsChart() {
          var data = google.visualization.arrayToDataTable([
            ["Needs", "Percent", { role: "style" } ],
            ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#b87333"],
            ["Love", result.data.tree.children[1].children[0].children[7].percentage, "silver"],
            ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "gold"],
            ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "color: #e5e4e2"],
            ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Consumer Needs of Journal",
            width: "50%",
            height: 200,
            bar: {groupWidth: "50%"},
            legend: { position: "none" }
          };
          var chart = new google.visualization.BarChart(document.getElementById("journalNeedsChart"));
          chart.draw(view, options);
        }

        function journalValuesChart() {
          var data = google.visualization.arrayToDataTable([
            ["Values", "Percentage", { role: "style" } ],
            ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#b87333"],
            ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "silver"],
            ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "gold"],
            ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "color: #e5e4e2"],
            ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Values of Journal",
            width: "50%",
            height: 200,
            bar: {groupWidth: "50%"},
            legend: { position: "none" }
          };
          var chart = new google.visualization.BarChart(document.getElementById("journalValuesChart"));
          chart.draw(view, options);
        }

        function watsonChart() {
          var data = google.visualization.arrayToDataTable([
            ['Emotion', 'Total per emotion'],
            ['Anger', ($scope.view.journalAngerTotalWatson).length],
            ['Disgust', ($scope.view.journalDisgustTotalWatson).length],
            ['Fear', ($scope.view.journalFearTotalWatson).length],
            ['Joy', ($scope.view.journalJoyTotalWatson).length],
            ['Sadness', ($scope.view.journalSadnessTotalWatson).length]
          ]);

          var options = {
            title: 'Watson Overall Emotional Results',
            pieHole: 0.4
          };

          var chart = new google.visualization.PieChart(document.getElementById('watsonChart'));
          chart.draw(data, options);
        }

        function userChart() {
          var data = google.visualization.arrayToDataTable([
            ['Emotion', 'Total per emotion'],
            ['Anger', ($scope.view.journalAngerTotalUser).length],
            ['Disgust', ($scope.view.journalDisgustTotalUser).length],
            ['Fear', ($scope.view.journalFearTotalUser).length],
            ['Joy', ($scope.view.journalJoyTotalUser).length],
            ['Sadness', ($scope.view.journalSadnessTotalUser).length]
          ]);

          var options = {
            title: 'User Overall Emotional Results',
            pieHole: 0.4
          };

          var chart = new google.visualization.PieChart(document.getElementById('userChart'));
          chart.draw(data, options);
        }
      });

      // ****** Getting Personality Data for Notebook section and makeing Charts ******

      Profile.personalityNotebook(notebookData).then(function(result) {
        console.log(result.data);
        $scope.view.notebookResults = result.data;

        google.charts.setOnLoadCallback(notebookPersonalityChart);
        google.charts.setOnLoadCallback(notebookNeedsChart);
        google.charts.setOnLoadCallback(notebookValuesChart);

        function notebookPersonalityChart() {
          var data = google.visualization.arrayToDataTable([
            ["Personality", "Percent", { role: "style" } ],
            ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#b87333"],
            ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "silver"],
            ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "gold"],
            ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "color: #e5e4e2"],
            ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Personality of Notebook",
            width: "100%",
            height: 200,
            bar: {groupWidth: "50%"},
            legend: { position: "none" }
          };
          var chart = new google.visualization.BarChart(document.getElementById("notebookPersonalityChart"));
          chart.draw(view, options);
        }

        function notebookNeedsChart() {
          var data = google.visualization.arrayToDataTable([
            ["Needs", "Percent", { role: "style" } ],
            ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#b87333"],
            ["Love", result.data.tree.children[1].children[0].children[7].percentage, "silver"],
            ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "gold"],
            ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "color: #e5e4e2"],
            ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Consumer Needs of Notebook",
            width: "50%",
            height: 200,
            bar: {groupWidth: "50%"},
            legend: { position: "none" }
          };
          var chart = new google.visualization.BarChart(document.getElementById("notebookNeedsChart"));
          chart.draw(view, options);
        }

        function notebookValuesChart() {
          var data = google.visualization.arrayToDataTable([
            ["Values", "Percentage", { role: "style" } ],
            ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#b87333"],
            ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "silver"],
            ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "gold"],
            ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "color: #e5e4e2"],
            ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "color: #e5e4e2"]
          ]);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Values of Notebook",
            width: "50%",
            height: 200,
            bar: {groupWidth: "50%"},
            legend: { position: "none" }
          };
          var chart = new google.visualization.BarChart(document.getElementById("notebookValuesChart"));
          chart.draw(view, options);
        }
      });

      // Profile.personalityJob(jobData).then(function(result) {
      //   console.log(result.data);
      //   $scope.view.jobResults = result.data;
      // });
      // Profile.personalityIdeas(ideasData).then(function(result) {
      //   console.log(result.data);
      //   $scope.view.ideasResults = result.data;
      // });
      console.log(result.data);
    });
  };
}
