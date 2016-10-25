var NewEntry = require('./models/newEntry');
var watson = require('watson-developer-cloud');
var YouTube = require('youtube-node');
const Promise = require('bluebird');
var fs = require('fs');
require('dotenv').config();
var knex = require('../db/knex');

var tone_analyzer = watson.tone_analyzer({
    username: process.env.TONEANALYZERUSERNAME,
    password: process.env.TONEANALYZERPASSWORD,
    version: 'v3',
    version_date: '2016-05-19'
});

var alchemy_language = watson.alchemy_language({
    api_key: process.env.ALCHEMYLANGUAGEAPI
});

var document_conversion = watson.document_conversion({
    username: process.env.DOCUMENTCONVERSIONUSERNAME,
    password: process.env.DOCUMENTCONVERSIONPASSWORD,
    version: 'v1',
    version_date: '2015-12-15'
});

var personality_insights = watson.personality_insights({
    username: process.env.PERSONALITYUSERNAME,
    password: process.env.PERSONALITYPASSWORD,
    version: 'v2'
});

function toneAnalyze(text) {
    return new Promise((resolve, reject) => {
        tone_analyzer.tone({
                text: text
            },
            function(err, tone) {
                if (err) {
                    reject(err);
                } else {
                    resolve(tone);
                }
            });
    });
}

function concept(text) {
    return new Promise((resolve, reject) => {
        var parameters = {
            text: text,
            knowledgeGraph: 1
        };

        alchemy_language.concepts(parameters, function(err, concept) {
            if (err) {
                reject(err);
            } else {
                resolve(concept);
            }
        });
    });
}

function youTubeContent(label) {
    var youTube = new YouTube();
    youTube.setKey(process.env.YOUTUBEKEY);
    youTube.addParam('channelId', 'UCAuUUnT6oDeKwE6v1NGQxug');

    return new Promise((resolve, reject) => {
        youTube.search(label, 2,
            function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
    });
}

module.exports = function(app) {

    app.get('/api/newEntrys', function(req, res) {
        NewEntry.find(function(err, newEntrys) {

            if (err)
                res.send(err);

            res.json(newEntrys);
        });
    });

    app.get('/api/data', function(req, res) {
        knex('entries').select().then(function(data) {
            res.send(data);
        });
    });

    function conceptData(text) {
        return concept(text).then(data => {
            return youTubeContent(data.concepts[0].text).then(content => {
                data.content = content;
                return data;
            });
        });
    }

    app.post('/api/watson', function(req, res) {
        Promise.join(conceptData(req.body.text), toneAnalyze(req.body.text)).then(data => {
            res.json({
                concepts: data[0],
                tone: data[1]
            });
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
        }, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                res.json(response);
            }
        });
    });

    app.post('/api/results', function(req, res) {
        knex('entries').insert({
            folder: req.body.results.folder,
            title_entry: req.body.results.title_entry,
            entry_content: req.body.results.entry_content,
            user_emotion: req.body.results.user_emotion,
            highest_emotion: req.body.results.highest_emotion,
            anger_score: req.body.results.anger_score,
            disgust_score: req.body.results.disgust_score,
            fear_score: req.body.results.fear_score,
            joy_score: req.body.results.joy_score,
            sadness_score: req.body.results.sadness_score,
            highest_language: req.body.results.highest_language,
            analytical_score: req.body.results.analytical_score,
            confident_score: req.body.results.confident_score,
            tentative_score: req.body.results.tentative_score,
            highest_social: req.body.results.highest_social,
            openness_score: req.body.results.openness_score,
            conscientiousness_score: req.body.results.conscientiousness_score,
            extraversion_score: req.body.results.extraversion_score,
            agreeableness_score: req.body.results.agreeableness_score,
            emotional_range_score: req.body.results.emotional_range_score,
            top_concept_title: req.body.results.top_concept_title,
            top_concept_link: req.body.results.top_concept_link,
            top_concept_description: req.body.results.top_concept_description,
            first_video_link: req.body.results.first_video_link,
            first_video_title: req.body.results.first_video_title,
            first_video_description: req.body.results.first_video_description,
            second_video_link: req.body.results.second_video_link,
            second_video_title: req.body.results.second_video_title,
            second_video_description: req.body.results.second_video_description,
            explanation_entry: req.body.results.explanation_entry
        }, '*').then(function(data) {
            res.send(data);
        });
    });

    app.post('/api/personalityJournal', function(req, res) {


        personality_insights.profile({
                text: req.body.data
            },
            function(error, response) {
                if (error) {
                    console.log('error:', error);
                    res.send(error);
                } else {
                    res.json(response);
                }
            });
    });

    app.post('/api/personalityNotebook', function(req, res) {


        personality_insights.profile({
                text: req.body.data
            },
            function(error, response) {
                if (error) {
                    console.log('error:', error);
                    res.send(error);
                } else {
                    res.send(JSON.stringify(response));
                }
            });
    });

    app.post('/api/personalityJob', function(req, res) {


        personality_insights.profile({
                text: req.body.data
            },
            function(error, response) {
                if (error) {
                    console.log('error:', error);
                    res.send(error);
                } else {
                    res.send(JSON.stringify(response));
                }
            });
    });

    app.post('/api/personalityIdeas', function(req, res) {


        personality_insights.profile({
                text: req.body.data
            },
            function(error, response) {
                if (error) {
                    console.log('error:', error);
                    res.send(error);
                } else {
                    res.send(JSON.stringify(response));
                }
            });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};
