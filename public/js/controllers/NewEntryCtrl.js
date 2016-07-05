angular.module('sampleApp').controller('NewEntryController', NewEntryController);

NewEntryController.$inject = ['$scope', '$http', '$location', 'NewEntry'];

function NewEntryController($scope, $http, $location, NewEntry) {

  $scope.view = {
    direction: '/profile',
    switch: true,
    journal: '',
    titleEntry: '',
    userEmotion: '',
    folder: '',
    area: false,
    file: '',
    highestEmotionScore: 0,
    highestEmotionTitle: '',
    emotion: '',
    anger: '',
    angerScore: 0,
    disgust: '',
    disgustScore: 0,
    fear: '',
    fearScore: 0,
    joy: '',
    joyScore: 0,
    sadness: '',
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
      console.log(result);
      $scope.view.text = result.data.answer_units[0].content[0].text;
    });
  };

  $scope.toneAnalyze = function() {
    var inputText = $scope.view.text;
    NewEntry.createWatson(inputText).then(function(result) {
      console.log(result);
      $scope.view.emotion = result.data.tone.document_tone.tone_categories[0].category_name;
      $scope.view.anger = result.data.tone.document_tone.tone_categories[0].tones[0].tone_name;
      $scope.view.angerScore = result.data.tone.document_tone.tone_categories[0].tones[0].score;
      $scope.view.disgust = result.data.tone.document_tone.tone_categories[0].tones[1].tone_name;
      $scope.view.disgustScore = result.data.tone.document_tone.tone_categories[0].tones[1].score;
      $scope.view.fear = result.data.tone.document_tone.tone_categories[0].tones[2].tone_name;
      $scope.view.fearScore = result.data.tone.document_tone.tone_categories[0].tones[2].score;
      $scope.view.joy = result.data.tone.document_tone.tone_categories[0].tones[3].tone_name;
      $scope.view.joyScore = result.data.tone.document_tone.tone_categories[0].tones[3].score;
      $scope.view.sadness = result.data.tone.document_tone.tone_categories[0].tones[4].tone_name;
      $scope.view.sadnessScore = result.data.tone.document_tone.tone_categories[0].tones[4].score;

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
      $scope.view.analytical = result.data.tone.document_tone.tone_categories[1].tones[0].tone_name;
      $scope.view.analyticalScore = result.data.tone.document_tone.tone_categories[1].tones[0].score;
      $scope.view.confident = result.data.tone.document_tone.tone_categories[1].tones[1].tone_name;
      $scope.view.confidentScore = result.data.tone.document_tone.tone_categories[1].tones[1].score;
      $scope.view.tentative = result.data.tone.document_tone.tone_categories[1].tones[2].tone_name;
      $scope.view.tentativeScore = result.data.tone.document_tone.tone_categories[1].tones[2].score;

      $scope.view.social = result.data.tone.document_tone.tone_categories[2].category_name;
      $scope.view.openness = result.data.tone.document_tone.tone_categories[2].tones[0].tone_name;
      $scope.view.opennessScore = result.data.tone.document_tone.tone_categories[2].tones[0].score;
      $scope.view.conscientiousness = result.data.tone.document_tone.tone_categories[2].tones[1].tone_name;
      $scope.view.conscientiousnessScore = result.data.tone.document_tone.tone_categories[2].tones[1].score;
      $scope.view.extraversion = result.data.tone.document_tone.tone_categories[2].tones[2].tone_name;
      $scope.view.extraversionScore = result.data.tone.document_tone.tone_categories[2].tones[2].score;
      $scope.view.agreeableness = result.data.tone.document_tone.tone_categories[2].tones[3].tone_name;
      $scope.view.agreeablenessScore = result.data.tone.document_tone.tone_categories[2].tones[3].score;
      $scope.view.emotionalRange = result.data.tone.document_tone.tone_categories[2].tones[4].tone_name;
      $scope.view.emotionalRangeScore = result.data.tone.document_tone.tone_categories[2].tones[4].score;

      $scope.view.topConceptLabel = result.data.concepts.conceptData.label;
      $scope.view.topConceptLink = result.data.concepts.conceptData.link;
      $scope.view.topConceptAbstract = result.data.concepts.conceptData.abstract;

      $scope.view.firstVideoId = "http://www.youtube.com/embed/" + result.data.concepts.content.items[0].id.videoId + "?rel=0";
      $scope.view.firstVideoTitle = result.data.concepts.content.items[0].snippet.title;
      $scope.view.firstVideoDescription = result.data.concepts.content.items[0].snippet.description;

      $scope.view.secondVideoId = "http://www.youtube.com/embed/" + result.data.concepts.content.items[1].id.videoId + "?rel=0";
      $scope.view.secondVideoTitle = result.data.concepts.content.items[1].snippet.title;
      $scope.view.secondVideoDescription = result.data.concepts.content.items[1].snippet.description;
      if(($scope.view.emotion).length > 0) {
        $scope.view.loader = false;
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  $scope.submitData = function() {
    console.log($scope.view.folder);
    console.log($scope.view.highestEmotionTitle);
    console.log($scope.view.highestEmotionScore);

  };

  $scope.furtherExplanation = function() {
    console.log("button was clicked");
    console.log($scope.view.highestEmotionTitle);
  };

    // --------Use the personality anazlyze only for the overview of the persons notebook--------
    // NewEntry.createPersonality(inputText).then(function(personalityResult) {
    //   console.log(personalityResult.data);
    // })

}
