angular.module('sampleApp').controller('NewEntryController', NewEntryController);

NewEntryController.$inject = ['$scope', '$http', '$location', 'NewEntry'];

function NewEntryController($scope, $http, $location, NewEntry) {

  $scope.view = {
    switch: true,
    journal: '',
    titleEntry: '',
    userEmotion: '',
    folder: '',
    area: false,
    file: '',
    highestEmotionScore: 0,
    highestEmotionTitle: '',
    angerScore: 0,
    disgustScore: 0,
    fearScore: 0,
    joyScore: 0,
    sadnessScore: 0,
    language: '',
    analytical: '',
    analyticalScore: 0,
    confident: '',
    confidentScore: 0,
    tentative: '',
    tentativeScore: 0,
    social: '',
    openness: '',
    opennessScore: 0,
    conscientiousness: '',
    conscientiousnessScore: 0,
    extraversion: '',
    extraversionScore: 0,
    agreeableness: '',
    agreeablenessScore: 0,
    emotionalRange: '',
    emotionalRangeScore: 0,
    topConceptAbstract: '',
    topConceptLabel: '',
    topConceptLink: '',
    firstVideoId: '',
    firstVideoTitle: '',
    firstVideoDescription: '',
    secondVideoId: '',
    secondVideoTitle: '',
    secondVideoDescription: '',
    loader: false,
    importText: ''
  };


  $(document).ready(function() {
    $('select').material_select();
  });

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.journalAnswer = function() {
    $scope.view.switch = false;
  }

  $scope.selectFolder = function() {

  };

  $scope.submitUserEmotion = function() {
    $scope.view.area = true;
  };

  $scope.fileUpload = function() {
    var inputFile = document.getElementById('fileItem').files[0].webkitRelativePath;
    NewEntry.uploadFile(inputFile).then(function(result) {
      $scope.view.text = result.data.answer_units[0].content[0].text;
    });
  };

  $scope.toneAnalyze = function() {
    var inputText = $scope.view.text;
    NewEntry.createWatson(inputText).then(function(result) {
      $scope.view.angerScore = result.data.tone.document_tone.tone_categories[0].tones[0].score;
      $scope.view.angerScore /= Math.pow(100, -1);
      $scope.view.angerScore = Math.round($scope.view.angerScore);
      $scope.view.disgustScore = result.data.tone.document_tone.tone_categories[0].tones[1].score;
      $scope.view.disgustScore /= Math.pow(100, -1);
      $scope.view.disgustScore = Math.round($scope.view.disgustScore);
      $scope.view.fearScore = result.data.tone.document_tone.tone_categories[0].tones[2].score;
      $scope.view.fearScore /= Math.pow(100, -1);
      $scope.view.fearScore = Math.round($scope.view.fearScore);
      $scope.view.joyScore = result.data.tone.document_tone.tone_categories[0].tones[3].score;
      $scope.view.joyScore /= Math.pow(100, -1);
      $scope.view.joyScore = Math.round($scope.view.joyScore);
      $scope.view.sadnessScore = result.data.tone.document_tone.tone_categories[0].tones[4].score;
      $scope.view.sadnessScore /= Math.pow(100, -1);
      $scope.view.sadnessScore = Math.round($scope.view.sadnessScore);

      $scope.view.highestEmotionScore = Math.max($scope.view.angerScore, $scope.view.disgustScore, $scope.view.fearScore, $scope.view.joyScore, $scope.view.sadnessScore);
      if($scope.view.highestEmotionScore === $scope.view.angerScore) {
        $scope.view.highestEmotionTitle = "anger";
      } else if($scope.view.highestEmotionScore === $scope.view.disgustScore) {
        $scope.view.highestEmotionTitle = "disgust";
      } else if($scope.view.highestEmotionScore === $scope.view.fearScore) {
        $scope.view.highestEmotionTitle = "fear";
      } else if($scope.view.highestEmotionScore === $scope.view.joyScore) {
        $scope.view.highestEmotionTitle = "joy";
      } else {
        $scope.view.highestEmotionTitle = "sadness";
      }

      if($scope.view.highestEmotionTitle !== $scope.view.userEmotion) {
        $scope.view.direction = '/explanation';
      }

      $scope.view.language = result.data.tone.document_tone.tone_categories[1].category_name;
      $scope.view.analyticalScore = result.data.tone.document_tone.tone_categories[1].tones[0].score;
      $scope.view.analyticalScore /= Math.pow(100, -1);
      $scope.view.analyticalScore = Math.round($scope.view.analyticalScore);
      $scope.view.confidentScore = result.data.tone.document_tone.tone_categories[1].tones[1].score;
      $scope.view.confidentScore /= Math.pow(100, -1);
      $scope.view.confidentScore = Math.round($scope.view.confidentScore);
      $scope.view.tentativeScore = result.data.tone.document_tone.tone_categories[1].tones[2].score;
      $scope.view.tentativeScore /= Math.pow(100, -1);
      $scope.view.tentativeScore = Math.round($scope.view.tentativeScore);

      $scope.view.social = result.data.tone.document_tone.tone_categories[2].category_name;
      $scope.view.openness = result.data.tone.document_tone.tone_categories[2].tones[0].tone_name;
      $scope.view.opennessScore = result.data.tone.document_tone.tone_categories[2].tones[0].score;
      $scope.view.opennessScore /= Math.pow(100, -1);
      $scope.view.opennessScore = Math.round($scope.view.opennessScore);
      $scope.view.conscientiousness = result.data.tone.document_tone.tone_categories[2].tones[1].tone_name;
      $scope.view.conscientiousnessScore = result.data.tone.document_tone.tone_categories[2].tones[1].score;
      $scope.view.conscientiousnessScore /= Math.pow(100, -1);
      $scope.view.conscientiousnessScore = Math.round($scope.view.conscientiousnessScore);
      $scope.view.extraversion = result.data.tone.document_tone.tone_categories[2].tones[2].tone_name;
      $scope.view.extraversionScore = result.data.tone.document_tone.tone_categories[2].tones[2].score;
      $scope.view.extraversionScore /= Math.pow(100, -1);
      $scope.view.extraversionScore = Math.round($scope.view.extraversionScore);
      $scope.view.agreeableness = result.data.tone.document_tone.tone_categories[2].tones[3].tone_name;
      $scope.view.agreeablenessScore = result.data.tone.document_tone.tone_categories[2].tones[3].score;
      $scope.view.agreeablenessScore /= Math.pow(100, -1);
      $scope.view.agreeablenessScore = Math.round($scope.view.agreeablenessScore);
      $scope.view.emotionalRange = result.data.tone.document_tone.tone_categories[2].tones[4].tone_name;
      $scope.view.emotionalRangeScore = result.data.tone.document_tone.tone_categories[2].tones[4].score;
      $scope.view.emotionalRangeScore /= Math.pow(100, -1);
      $scope.view.emotionalRangeScore = Math.round($scope.view.emotionalRangeScore);

      $scope.view.topConceptLabel = result.data.concepts.conceptData.label;
      $scope.view.topConceptLink = result.data.concepts.conceptData.link;
      $scope.view.topConceptAbstract = result.data.concepts.conceptData.abstract;

      $scope.view.firstVideoId = "http://www.youtube.com/embed/" + result.data.concepts.content.items[0].id.videoId + "?rel=0";
      $scope.view.firstVideoTitle = result.data.concepts.content.items[0].snippet.title;
      $scope.view.firstVideoDescription = result.data.concepts.content.items[0].snippet.description;

      $scope.view.secondVideoId = "http://www.youtube.com/embed/" + result.data.concepts.content.items[1].id.videoId + "?rel=0";
      $scope.view.secondVideoTitle = result.data.concepts.content.items[1].snippet.title;
      $scope.view.secondVideoDescription = result.data.concepts.content.items[1].snippet.description;
      if(($scope.view.language).length > 0) {
        $scope.view.loader = false;
      }

      google.charts.load("current", {"packages":["corechart"]});
      google.charts.setOnLoadCallback(emotionChart);
      google.charts.setOnLoadCallback(languageChart);
      google.charts.setOnLoadCallback(socialChart);

      function emotionChart() {
        var data = google.visualization.arrayToDataTable([
          ["Emotion", "Score", { role: "style" } ],
          ["Anger", $scope.view.angerScore, "#b87333"],
          ["Disgust", $scope.view.disgustScore, "silver"],
          ["Fear", $scope.view.fearScore, "silver"],
          ["Joy", $scope.view.joyScore, "gold"],
          ["Sadness", $scope.view.sadnessScore, "color: #e5e4e2"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Emotional Score of Text",
          width: 600,
          height: 400,
          bar: {groupWidth: "95%"},
          legend: { position: "none" }
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_emotion"));
        chart.draw(view, options);
      }

      function languageChart() {
        var data = google.visualization.arrayToDataTable([
          ["Language", "Score", { role: "style" } ],
          ["Analytical", $scope.view.analyticalScore, "#b87333"],
          ["Confident", $scope.view.confidentScore, "silver"],
          ["Tentative", $scope.view.tentativeScore, "gold"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Language Style Score of Text",
          width: 600,
          height: 400,
          bar: {groupWidth: "95%"},
          legend: { position: "none" }
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_language"));
        chart.draw(view, options);
      }
      function socialChart() {
        var data = google.visualization.arrayToDataTable([
          ["Social", "Score", { role: "style" } ],
          ["Openness", $scope.view.opennessScore, "#b87333"],
          ["Conscientiousness", $scope.view.conscientiousnessScore, "silver"],
          ["Extraversion", $scope.view.extraversionScore, "gold"],
          ["Agreeableness", $scope.view.agreeablenessScore, "gold"],
          ["Emotional Range", $scope.view.emotionalRangeScore, "gold"]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);

        var options = {
          title: "Social Style Score of Text",
          width: 600,
          height: 400,
          bar: {groupWidth: "95%"},
          legend: { position: "none" }
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_social"));
        chart.draw(view, options);
      }

    })
    .catch(error => {
      console.log(error);
    });
  };


  $scope.submitData = function() {
    var entryData = {
      folder: $scope.view.folder,
      entry_content: $scope.view.text,
      user_emotion: $scope.view.userEmotion,
      anger_score: $scope.view.angerScore,
      disgust_score: $scope.view.disgustScore,
      fear_score: $scope.view.fearScore,
      joy_score: $scope.view.joyScore,
      sadness_score: $scope.view.sadnessScore,
      analytical_score: $scope.view.analyticalScore,
      confident_score: $scope.view.confidentScore,
      tentative_score: $scope.view.tentativeScore,
      openness_score: $scope.view.opennessScore,
      conscientiousness_score: $scope.view.conscientiousnessScore,
      extraversion_score: $scope.view.extraversionScore,
      agreeableness_score: $scope.view.agreeablenessScore,
      emotional_range_score: $scope.view.emotionalRangeScore,
      top_concept_title: $scope.view.topConceptLabel,
      top_concept_link: $scope.view.topConceptLink,
      top_concept_description: $scope.view.topConceptAbstract,
      first_video_link: $scope.view.firstVideoId,
      first_video_title: $scope.view.firstVideoTitle,
      first_video_description: $scope.view.firstVideoDescription,
      second_video_link: $scope.view.secondVideoId,
      second_video_title: $scope.view.secondVideoTitle,
      second_video_description: $scope.view.secondVideoDescription
    };

    NewEntry.sendData(entryData).then(function(result) {
      console.log(result);
    });
  };

    // --------Use the personality anazlyze only for the overview of the persons notebook--------
    // NewEntry.createPersonality(inputText).then(function(personalityResult) {
    //   console.log(personalityResult.data);
    // })

}
