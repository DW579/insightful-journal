var NewEntry = require('./models/newEntry');
var watson = require('watson-developer-cloud');
var YouTube = require('youtube-node');
const Promise = require('bluebird');
var fs = require('fs');
var dotenv = require('dotenv').config();
var knex = require('../db/knex');

var speech_to_text = watson.speech_to_text({
  username: dotenv.SPEECHTEXTUSERNAME,
  password: dotenv.SPEECHTEXTPASSWORD,
  version: 'v1'
});

var tone_analyzer = watson.tone_analyzer({
  username: dotenv.TONEANALYZERUSERNAME,
  password: dotenv.TONEANALYZERPASSWORD,
  version: 'v3',
  version_date: '2016-05-19 '
});

var concept_insights = watson.concept_insights({
  username: dotenv.CONCEPTINSIGHTUSERNAME,
  password: dotenv.CONCEPTINSIGHTPASSWORD,
  version: 'v2'
});

var document_conversion = watson.document_conversion({
  username: dotenv.DOCUMENTCONVERSIONUSERNAME,
  password: dotenv.DOCUMENTCONVERSIONPASSWORD,
  version: 'v1',
  version_date: '2015-12-15'
});

function toneAnalyze(text) {
  return new Promise((resolve, reject) => {
    tone_analyzer.tone({text: text},
      function(err, tone) {
        if (err){
          reject(err);
        } else {
          resolve(tone);
        }
    });
  });
}

function initalConceptHighlights(text) {
  return new Promise((resolve, reject) => {
    concept_insights.graphs.annotateText({graph: '/graphs/wikipedia/en-latest', text: text },
    function(err, concept) {
      if (err) {
        reject(err);
      }
      else {
        resolve(concept);
      }
    });
  });
}

function topConceptAnalyze(arrayConcept) {
  return new Promise((resolve, reject) => {
    concept_insights.graphs.getRelatedConcepts({graph: '/graphs/wikipedia/en-latest', concepts: arrayConcept, level: 0, limit: 2},
    function(err, topConcept) {
      if (err) {
        reject(err);
      }
      else {
        resolve(topConcept);
      }
    });
  });
}

function topConceptData(id) {
  return new Promise((resolve, reject) => {
    concept_insights.graphs.getConcept({id: id },
      function(err, compared) {
      if (err) {
        reject(err);
      }
      else {
        resolve(compared);
      }
    });
  });
}

function youTubeContent(label) {
  var youTube = new YouTube();
  youTube.setKey(dotenv.YOUTUBEKEY);
  youTube.addParam('channelId', 'UCAuUUnT6oDeKwE6v1NGQxug');

  return new Promise((resolve, reject) => {
    youTube.search(label, 2,
    function(error, result) {
      if (error) {
        reject(error);
      }
      else {
        resolve(result);
      }
    });
  });
}

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/newEntrys', function(req, res) {
            // use mongoose to get all NewEntry in the database
            NewEntry.find(function(err, newEntrys) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(newEntrys); // return all NewEntrys in JSON format
            });
        });

        function conceptData(text) {
          return initalConceptHighlights(text).then(initialConcept => {
            var arrayConcept = [];
            var maxAnnotations = initialConcept.annotations.length;
            if (maxAnnotations > 10) {
              maxAnnotations = 10;
            }
            for(var i = 0; i < maxAnnotations; i++) {
              arrayConcept.push(initialConcept.annotations[i].concept.id);
            }
            return topConceptAnalyze(arrayConcept).then(topConcepts => {
              return {topConcepts: topConcepts, initialConcept: initialConcept};
            });
          }).then(data => {
            return topConceptData(data.topConcepts.concepts[0].concept.id).then(conceptData => {
              data.conceptData = conceptData;
              return data;
            });
          }).then(data => {
            return youTubeContent(data.conceptData.label).then(content => {
              data.content = content;
              return data;
            });
          });
        }

        app.post('/api/watson', function(req, res) {
          Promise.join(conceptData(req.body.text), toneAnalyze(req.body.text)).then(data => {
            res.json({concepts: data[0], tone: data[1]});
          }).catch(error => {
            console.log(error);
            res.status(500);
            res.json(error);
          });
        });

        app.post('/api/file', function(req, res) {
          document_conversion.convert({
            file: fs.createReadStream("../desktop/" + req.body.file),
            conversion_target: "ANSWER_UNITS"
          }, function (err, response) {
            if (err) {
              console.log(err);
            } else {
              res.json(response);
            }
          });
        });

        // ******* Test for Speech to Text**********

        app.post('/api/audio', function(req, res) {
          var params = {
            content_type: 'audio/basic',
            continuous: true,
            interim_results: true
          };

          // Create the stream.
          var recognizeStream = speech_to_text.createRecognizeStream(params);

          // Pipe in the audio.
          fs.createReadStream(req.body.audio).pipe(recognizeStream);

          // Pipe out the transcription to a file.
          recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

          // Get strings instead of buffers from 'data' events.
          recognizeStream.setEncoding('utf8');

          // Listen for events.
          recognizeStream.on('data', function(event) { onEvent('Data:', event); });
          recognizeStream.on('results', function(event) { onEvent('Results:', event); });
          recognizeStream.on('error', function(event) { onEvent('Error:', event); });
          recognizeStream.on('close-connection', function(event) { onEvent('Close:', event); });

          // Displays events on the console.
          function onEvent(name, event) {
              console.log(name, JSON.stringify(event, null, 2));
          }
        });

        app.post('/api/results', function(req, res) {
          knex('entries').insert({
            folder: req.body.results.folder,
            entry_content: req.body.results.entry_content,
            user_emotion: req.body.results.user_emotion,
            anger_score: req.body.results.anger_score,
            disgust_score: req.body.results.disgust_score,
            fear_score: req.body.results.fear_score,
            joy_score: req.body.results.joy_score,
            sadness_score: req.body.results.sadness_score,
            analytical_score: req.body.results.analytical_score,
            confident_score: req.body.results.confident_score,
            tentative_score: req.body.results.tentative_score,
            openness_score: req.body.results.openness_score,
            conscientiousness_score: req.body.results.conscientiousness_score,
            extraversion_score: req.body.results.extraversion_score,
            agreeableness_score: req.body.results.agreeableness_score,
            emotional_range_score: req.body.results.emotional_range_score,
            top_concept_title: req.body.results.top_concept_title,
            top_concept_link: req.body.results.top_concept_title,
            top_concept_description: req.body.results.top_concept_description,
            first_video_link: req.body.results.first_video_link,
            first_video_title: req.body.results.first_video_title,
            first_video_description: req.body.results.first_video_description,
            second_video_link: req.body.results.second_video_link,
            second_video_title: req.body.results.second_video_title,
            second_video_description: req.body.results.second_video_description}, '*').then(function(data) {
            console.log(data);
            // process.exit(1);
          });
        });



        // app.post('/api/watson', function(req, res) {
        //   var personality_insights = watson.personality_insights({
        //     username: '6969bf03-7f52-4f92-948b-e810e409934a',
        //     password: 'vFYYPPhvhtEv',
        //     version: 'v2'
        //   });
        //
        //   // var params = require('profile.json');
        //
        //   personality_insights.profile({text: req.body.text},
        //     function(error, response) {
        //     if (error) {
        //       console.log('error:', error);
        //     }
        //     else {
        //       // console.log(JSON.stringify(response, null, 2));
        //       res.json(response);
        //     }
        //   });
        // });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
