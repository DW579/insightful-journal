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
        overviewEntry: false,

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
        journalHighestLanguageTotal: 0,
        journalOverallLanguage: '',

        journalAllTopSocialArray: [],
        journalOpennessArray: [],
        journalConscientiousnessArray: [],
        journalExtraversionArray: [],
        journalAgreeablenessArray: [],
        journalEmotionalRangeArray: [],
        journalHighestSocialTotal: 0,
        journalOverallSocial: '',

        notebookResults: [],
        notebookAngerArray: [],
        notebookDisgustArray: [],
        notebookFearArray: [],
        notebookJoyArray: [],
        notebookSadnessArray: [],

        notebookAllTopLanguagesArray: [],
        notebookAnalyticalArray: [],
        notebookConfidentArray: [],
        notebookTentativeArray: [],
        notebookHighestLanguageTotal: 0,
        notebookOverallLanguage: '',

        notebookAllTopSocialArray: [],
        notebookOpennessArray: [],
        notebookConscientiousnessArray: [],
        notebookExtraversionArray: [],
        notebookAgreeablenessArray: [],
        notebookEmotionalRangeArray: [],
        notebookHighestSocialTotal: 0,
        notebookOverallSocial: '',

        jobResults: [],
        jobAngerArray: [],
        jobDisgustArray: [],
        jobFearArray: [],
        jobJoyArray: [],
        jobSadnessArray: [],

        jobAllTopLanguagesArray: [],
        jobAnalyticalArray: [],
        jobConfidentArray: [],
        jobTentativeArray: [],
        jobHighestLanguageTotal: 0,
        jobOverallLanguage: '',

        jobAllTopSocialArray: [],
        jobOpennessArray: [],
        jobConscientiousnessArray: [],
        jobExtraversionArray: [],
        jobAgreeablenessArray: [],
        jobEmotionalRangeArray: [],
        jobHighestSocialTotal: 0,
        jobOverallSocial: '',

        ideasResults: [],
        ideasAngerArray: [],
        ideasDisgustArray: [],
        ideasFearArray: [],
        ideasJoyArray: [],
        ideasSadnessArray: [],

        ideasAllTopLanguagesArray: [],
        ideasAnalyticalArray: [],
        ideasConfidentArray: [],
        ideasTentativeArray: [],
        ideasHighestLanguageTotal: 0,
        ideasOverallLanguage: '',

        ideasAllTopSocialArray: [],
        ideasOpennessArray: [],
        ideasConscientiousnessArray: [],
        ideasExtraversionArray: [],
        ideasAgreeablenessArray: [],
        ideasEmotionalRangeArray: [],
        ideasHighestSocialTotal: 0,
        ideasOverallSocial: ''
    };

    $scope.openSum = function() {
        $(document).ready(function() {
            $('#summery').openModal({
                dismissible: false,
                opacity: .5,
                in_duration: 500,
                out_duration: 300,
                starting_top: '4%',
                ending_top: '10%'
            });
        });
    };

    $scope.closeSum = function() {
        $('#summery').closeModal();
    };

    $(document).ready(function() {
        $('ul.tabs').tabs();
    });

    $(document).ready(function() {
        $('.collapsible').collapsible({
            accordion: false
        });
    });

    var journalData;
    var notebookData;
    var jobData;
    var ideasData;

    $scope.reviewCharts = function() {
        Profile.getData().then(function(result) {
            var chartData = [];
            for (var i = 0; i < (result.data).length; i++) {
                if (result.data[i].id === $scope.view.filterEntry) {
                    chartData.push(result.data[i]);
                }
            }

            google.charts.setOnLoadCallback(reviewEmotionChart);
            google.charts.setOnLoadCallback(reviewLanguageChart);
            google.charts.setOnLoadCallback(reviewSocialChart);

            function reviewEmotionChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Emotion", "Score", {
                        role: "style"
                    }],
                    ["Anger", chartData[0].anger_score, "#263749"],
                    ["Disgust", chartData[0].disgust_score, "#83969D"],
                    ["Fear", chartData[0].fear_score, "#A1BDA6"],
                    ["Joy", chartData[0].joy_score, "#DACBAE"],
                    ["Sadness", chartData[0].sadness_score, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Emotional Score of Text",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "95%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("review_emotion"));
                chart.draw(view, options);
            }

            function reviewLanguageChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Language", "Score", {
                        role: "style"
                    }],
                    ["Analytical", chartData[0].analytical_score, "#263749"],
                    ["Confident", chartData[0].confident_score, "#83969D"],
                    ["Tentative", chartData[0].tentative_score, "#A1BDA6"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Language Style Score of Text",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "95%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("review_language"));
                chart.draw(view, options);
            }

            function reviewSocialChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Social", "Score", {
                        role: "style"
                    }],
                    ["Openness", chartData[0].openness_score, "#263749"],
                    ["Conscientiousness", chartData[0].conscientiousness_score, "#83969D"],
                    ["Extraversion", chartData[0].extraversion_score, "#A1BDA6"],
                    ["Agreeableness", chartData[0].agreeableness_score, "#DACBAE"],
                    ["Emotional Range", chartData[0].emotional_range_score, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Social Style Score of Text",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "95%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("review_social"));
                chart.draw(view, options);
            }
        });
    };

    $scope.allData = function() {
        // ****** Getting all Data from Database ******

        Profile.getData().then(function(result) {
            for (var i = 0; i < (result.data).length; i++) {
                $scope.view.dataArray.push(result.data[i]);
                if (result.data[i].folder === 'journal') {
                    $scope.view.journalContentArray.push(result.data[i].entry_content);
                    $scope.view.journalAllTopLanguagesArray.push(result.data[i].highest_language);
                    $scope.view.journalAllTopSocialArray.push(result.data[i].highest_social);
                    if (result.data[i].highest_emotion === 'anger') {
                        $scope.view.journalAngerTotalWatson.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'disgust') {
                        $scope.view.journalDisgustTotalWatson.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'fear') {
                        $scope.view.journalFearTotalWatson.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'joy') {
                        $scope.view.journalJoyTotalWatson.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'sadness') {
                        $scope.view.journalSadnessTotalWatson.push(result.data[i].highest_emotion);
                    } else {
                        console.log("No watson emotion");
                    }
                } else if (result.data[i].folder === 'notebook') {
                    $scope.view.notebookArray.push(result.data[i].entry_content);
                    $scope.view.notebookAllTopLanguagesArray.push(result.data[i].highest_language);
                    $scope.view.notebookAllTopSocialArray.push(result.data[i].highest_social);
                    if (result.data[i].highest_emotion === 'anger') {
                        $scope.view.notebookAngerArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'disgust') {
                        $scope.view.notebookDisgustArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'fear') {
                        $scope.view.notebookFearArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'joy') {
                        $scope.view.notebookJoyArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'sadness') {
                        $scope.view.notebookSadnessArray.push(result.data[i].highest_emotion);
                    } else {
                        console.log("No notebook emotion");
                    }
                } else if (result.data[i].folder === 'job') {
                    $scope.view.jobArray.push(result.data[i].entry_content);
                    $scope.view.jobAllTopLanguagesArray.push(result.data[i].highest_language);
                    $scope.view.jobAllTopSocialArray.push(result.data[i].highest_social);
                    if (result.data[i].highest_emotion === 'anger') {
                        $scope.view.jobAngerArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'disgust') {
                        $scope.view.jobDisgustArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'fear') {
                        $scope.view.jobFearArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'joy') {
                        $scope.view.jobJoyArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'sadness') {
                        $scope.view.jobSadnessArray.push(result.data[i].highest_emotion);
                    } else {
                        console.log("No notebook emotion");
                    }
                } else if (result.data[i].folder === 'ideas') {
                    $scope.view.ideasArray.push(result.data[i].entry_content);
                    if (result.data[i].highest_emotion === 'anger') {
                        $scope.view.ideasAngerArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'disgust') {
                        $scope.view.ideasDisgustArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'fear') {
                        $scope.view.ideasFearArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'joy') {
                        $scope.view.ideasJoyArray.push(result.data[i].highest_emotion);
                    } else if (result.data[i].highest_emotion === 'sadness') {
                        $scope.view.ideasSadnessArray.push(result.data[i].highest_emotion);
                    } else {
                        console.log("No ideas emotion");
                    }
                } else {
                    console.log("Did not match any folders");
                }
            }

            for (var k = 0; k < (result.data).length; k++) {
                if (result.data[k].user_emotion === 'anger') {
                    $scope.view.journalAngerTotalUser.push(result.data[k].user_emotion);
                } else if (result.data[k].user_emotion === 'disgust') {
                    $scope.view.journalDisgustTotalUser.push(result.data[k].user_emotion);
                } else if (result.data[k].user_emotion === 'fear') {
                    $scope.view.journalFearTotalUser.push(result.data[k].user_emotion);
                } else if (result.data[k].user_emotion === 'joy') {
                    $scope.view.journalJoyTotalUser.push(result.data[k].user_emotion);
                } else if (result.data[k].user_emotion === 'sadness') {
                    $scope.view.journalSadnessTotalUser.push(result.data[k].user_emotion);
                } else {
                    console.log("No user emotion");
                }
            }

            journalData = $scope.view.journalContentArray.join(" ");
            notebookData = $scope.view.notebookArray.join(" ");
            jobData = $scope.view.jobArray.join(" ");
            ideasData = $scope.view.ideasArray.join(" ");

            // ****** Figuring out top language tone for journal *******
            for (var l = 0; l < ($scope.view.journalAllTopLanguagesArray).length; l++) {
                if ($scope.view.journalAllTopLanguagesArray[l] === 'analytical') {
                    $scope.view.journalAnalyticalArray.push($scope.view.journalAllTopLanguagesArray[l]);
                } else if ($scope.view.journalAllTopLanguagesArray[l] === 'confident') {
                    $scope.view.journalConfidentArray.push($scope.view.journalAllTopLanguagesArray[l]);
                } else if ($scope.view.journalAllTopLanguagesArray[l] === 'tentative') {
                    $scope.view.journalTentativeArray.push($scope.view.journalAllTopLanguagesArray[l]);
                } else {
                    console.log("A different language");
                }
            }

            $scope.view.journalHighestLanguageTotal = Math.max(($scope.view.journalAnalyticalArray).length, ($scope.view.journalConfidentArray).length, ($scope.view.journalTentativeArray).length);
            if ($scope.view.journalHighestLanguageTotal === ($scope.view.journalAnalyticalArray).length) {
                $scope.view.journalOverallLanguage = 'Analytical';
            } else if ($scope.view.journalHighestLanguageTotal === ($scope.view.journalConfidentArray).length) {
                $scope.view.journalOverallLanguage = 'Confident';
            } else if ($scope.view.journalHighestLanguageTotal === ($scope.view.journalTentativeArray).length) {
                $scope.view.journalOverallLanguage = 'Tentative';
            }

            // ******* Figuring out top Social tone for Journal *******
            for (var a = 0; a < ($scope.view.journalAllTopSocialArray).length; a++) {
                if ($scope.view.journalAllTopSocialArray[a] === 'openness') {
                    $scope.view.journalOpennessArray.push($scope.view.journalAllTopSocialArray[a]);
                } else if ($scope.view.journalAllTopSocialArray[a] === 'conscientiousness') {
                    $scope.view.journalConscientiousnessArray.push($scope.view.journalAllTopSocialArray[a]);
                } else if ($scope.view.journalAllTopSocialArray[a] === 'extraversion') {
                    $scope.view.journalExtraversionArray.push($scope.view.journalAllTopSocialArray[a]);
                } else if ($scope.view.journalAllTopSocialArray[a] === 'agreeableness') {
                    $scope.view.journalAgreeablenessArray.push($scope.view.journalAllTopSocialArray[a]);
                } else {
                    console.log("Could be Emotional Range for Journal");
                }
            }

            $scope.view.journalHighestSocialTotal = Math.max(($scope.view.journalOpennessArray).length, ($scope.view.journalConscientiousnessArray).length, ($scope.view.journalExtraversionArray).length, ($scope.view.journalAgreeablenessArray).length);
            if ($scope.view.journalHighestSocialTotal === ($scope.view.journalOpennessArray).length) {
                $scope.view.journalOverallSocial = 'Openness';
            } else if ($scope.view.journalHighestSocialTotal === ($scope.view.journalConscientiousnessArray).length) {
                $scope.view.journalOverallSocial = 'Conscientiousness';
            } else if ($scope.view.journalHighestSocialTotal === ($scope.view.journalExtraversionArray).length) {
                $scope.view.journalOverallSocial = 'Extraversion';
            } else if ($scope.view.journalHighestSocialTotal === ($scope.view.journalAgreeablenessArray).length) {
                $scope.view.journalOverallSocial = 'Agreeableness';
            }

            // ****** Figuring out top language tone for notebook *******
            for (var q = 0; q < ($scope.view.notebookAllTopLanguagesArray).length; q++) {
                if ($scope.view.notebookAllTopLanguagesArray[q] === 'analytical') {
                    $scope.view.notebookAnalyticalArray.push($scope.view.notebookAllTopLanguagesArray[q]);
                } else if ($scope.view.notebookAllTopLanguagesArray[q] === 'confident') {
                    $scope.view.notebookConfidentArray.push($scope.view.notebookAllTopLanguagesArray[q]);
                } else if ($scope.view.notebookAllTopLanguagesArray[q] === 'tentative') {
                    $scope.view.notebookTentativeArray.push($scope.view.notebookAllTopLanguagesArray[q]);
                } else {
                    console.log("A different language");
                }
            }

            $scope.view.notebookHighestLanguageTotal = Math.max(($scope.view.notebookAnalyticalArray).length, ($scope.view.notebookConfidentArray).length, ($scope.view.notebookTentativeArray).length);
            if ($scope.view.notebookHighestLanguageTotal === ($scope.view.notebookAnalyticalArray).length) {
                $scope.view.notebookOverallLanguage = 'Analytical';
            } else if ($scope.view.notebookHighestLanguageTotal === ($scope.view.notebookConfidentArray).length) {
                $scope.view.notebookOverallLanguage = 'Confident';
            } else if ($scope.view.notebookHighestLanguageTotal === ($scope.view.notebookTentativeArray).length) {
                $scope.view.notebookOverallLanguage = 'Tentative';
            }

            // ******* Figuring out top Social tone for Notebook *******
            for (var w = 0; w < ($scope.view.notebookAllTopSocialArray).length; w++) {
                if ($scope.view.notebookAllTopSocialArray[w] === 'openness') {
                    $scope.view.notebookOpennessArray.push($scope.view.notebookAllTopSocialArray[w]);
                } else if ($scope.view.notebookAllTopSocialArray[w] === 'conscientiousness') {
                    $scope.view.notebookConscientionotebookrray.push($scope.view.notebookAllTopSocialArray[w]);
                } else if ($scope.view.notebookAllTopSocialArray[w] === 'extraversion') {
                    $scope.view.notebookExtraversionArray.push($scope.view.notebookAllTopSocialArray[w]);
                } else if ($scope.view.notebookAllTopSocialArray[w] === 'agreeableness') {
                    $scope.view.notebookAgreeablenessArray.push($scope.view.notebookAllTopSocialArray[w]);
                } else {
                    console.log("Could be Emotional Range for Journal");
                }
            }

            $scope.view.notebookHighestSocialTotal = Math.max(($scope.view.notebookOpennessArray).length, ($scope.view.notebookConscientiousnessArray).length, ($scope.view.notebookExtraversionArray).length, ($scope.view.notebookAgreeablenessArray).length);
            if ($scope.view.notebookHighestSocialTotal === ($scope.view.notebookOpennessArray).length) {
                $scope.view.notebookOverallSocial = 'Openness';
            } else if ($scope.view.notebookHighestSocialTotal === ($scope.view.notebookConscientiousnessArray).length) {
                $scope.view.notebookOverallSocial = 'Conscientiousness';
            } else if ($scope.view.notebookHighestSocialTotal === ($scope.view.notebookExtraversionArray).length) {
                $scope.view.notebookOverallSocial = 'Extraversion';
            } else if ($scope.view.notebookHighestSocialTotal === ($scope.view.notebookAgreeablenessArray).length) {
                $scope.view.notebookOverallSocial = 'Agreeableness';
            }

            // ****** Figuring out top language tone for job *******
            for (var r = 0; r < ($scope.view.jobAllTopLanguagesArray).length; r++) {
                if ($scope.view.jobAllTopLanguagesArray[r] === 'analytical') {
                    $scope.view.jobAnalyticalArray.push($scope.view.jobAllTopLanguagesArray[r]);
                } else if ($scope.view.jobAllTopLanguagesArray[r] === 'confident') {
                    $scope.view.jobConfidentArray.push($scope.view.jobAllTopLanguagesArray[r]);
                } else if ($scope.view.jobAllTopLanguagesArray[r] === 'tentative') {
                    $scope.view.jobTentativeArray.push($scope.view.jobAllTopLanguagesArray[r]);
                } else {
                    console.log("A different language");
                }
            }

            $scope.view.jobHighestLanguageTotal = Math.max(($scope.view.jobAnalyticalArray).length, ($scope.view.jobConfidentArray).length, ($scope.view.jobTentativeArray).length);
            if ($scope.view.jobHighestLanguageTotal === ($scope.view.jobAnalyticalArray).length) {
                $scope.view.jobOverallLanguage = 'Analytical';
            } else if ($scope.view.jobHighestLanguageTotal === ($scope.view.jobConfidentArray).length) {
                $scope.view.jobOverallLanguage = 'Confident';
            } else if ($scope.view.jobHighestLanguageTotal === ($scope.view.jobTentativeArray).length) {
                $scope.view.jobOverallLanguage = 'Tentative';
            }

            // ******* Figuring out top Social tone for Job *******
            for (var t = 0; t < ($scope.view.jobAllTopSocialArray).length; t++) {
                if ($scope.view.jobAllTopSocialArray[t] === 'openness') {
                    $scope.view.jobOpennessArray.push($scope.view.jobAllTopSocialArray[t]);
                } else if ($scope.view.jobAllTopSocialArray[t] === 'conscientiousness') {
                    $scope.view.jobConscientionotebookrray.push($scope.view.jobAllTopSocialArray[t]);
                } else if ($scope.view.jobAllTopSocialArray[t] === 'extraversion') {
                    $scope.view.jobExtraversionArray.push($scope.view.jobAllTopSocialArray[t]);
                } else if ($scope.view.jobAllTopSocialArray[t] === 'agreeableness') {
                    $scope.view.jobAgreeablenessArray.push($scope.view.jobAllTopSocialArray[t]);
                } else {
                    console.log("Could be Emotional Range for Journal");
                }
            }

            $scope.view.jobHighestSocialTotal = Math.max(($scope.view.jobOpennessArray).length, ($scope.view.jobConscientiousnessArray).length, ($scope.view.jobExtraversionArray).length, ($scope.view.jobAgreeablenessArray).length);
            if ($scope.view.jobHighestSocialTotal === ($scope.view.jobOpennessArray).length) {
                $scope.view.jobOverallSocial = 'Openness';
            } else if ($scope.view.jobHighestSocialTotal === ($scope.view.jobConscientiousnessArray).length) {
                $scope.view.jobOverallSocial = 'Conscientiousness';
            } else if ($scope.view.jobHighestSocialTotal === ($scope.view.jobExtraversionArray).length) {
                $scope.view.jobOverallSocial = 'Extraversion';
            } else if ($scope.view.jobHighestSocialTotal === ($scope.view.jobAgreeablenessArray).length) {
                $scope.view.jobOverallSocial = 'Agreeableness';
            }

            // ****** Figuring out top language tone for ideas *******
            for (var t = 0; t < ($scope.view.ideasAllTopLanguagesArray).length; t++) {
                if ($scope.view.ideasAllTopLanguagesArray[t] === 'analytical') {
                    $scope.view.ideasAnalyticalArray.push($scope.view.ideasAllTopLanguagesArray[t]);
                } else if ($scope.view.ideasAllTopLanguagesArray[t] === 'confident') {
                    $scope.view.ideasConfidentArray.push($scope.view.ideasAllTopLanguagesArray[t]);
                } else if ($scope.view.ideasAllTopLanguagesArray[t] === 'tentative') {
                    $scope.view.ideasTentativeArray.push($scope.view.ideasAllTopLanguagesArray[t]);
                } else {
                    console.log("A different language");
                }
            }

            $scope.view.ideasHighestLanguageTotal = Math.max(($scope.view.ideasAnalyticalArray).length, ($scope.view.ideasConfidentArray).length, ($scope.view.ideasTentativeArray).length);
            if ($scope.view.ideasHighestLanguageTotal === ($scope.view.ideasAnalyticalArray).length) {
                $scope.view.ideasOverallLanguage = 'Analytical';
            } else if ($scope.view.ideasHighestLanguageTotal === ($scope.view.ideasConfidentArray).length) {
                $scope.view.ideasOverallLanguage = 'Confident';
            } else if ($scope.view.ideasHighestLanguageTotal === ($scope.view.ideasTentativeArray).length) {
                $scope.view.ideasOverallLanguage = 'Tentative';
            }

            // ******* Figuring out top Social tone for Ideas *******
            for (var y = 0; y < ($scope.view.ideasAllTopSocialArray).length; y++) {
                if ($scope.view.ideasAllTopSocialArray[y] === 'openness') {
                    $scope.view.ideasOpennessArray.push($scope.view.ideasAllTopSocialArray[y]);
                } else if ($scope.view.ideasAllTopSocialArray[y] === 'conscientiousness') {
                    $scope.view.ideasConscientionotebookrray.push($scope.view.ideasAllTopSocialArray[y]);
                } else if ($scope.view.ideasAllTopSocialArray[y] === 'extraversion') {
                    $scope.view.ideasasExtraversionArray.push($scope.view.ideasAllTopSocialArray[y]);
                } else if ($scope.view.ideasAllTopSocialArray[y] === 'agreeableness') {
                    $scope.view.ideasAgreeablenessArray.push($scope.view.ideasAllTopSocialArray[y]);
                } else {
                    console.log("Could be Emotional Range for Journal");
                }
            }

            $scope.view.ideasHighestSocialTotal = Math.max(($scope.view.ideasOpennessArray).length, ($scope.view.ideasConscientiousnessArray).length, ($scope.view.ideasExtraversionArray).length, ($scope.view.ideasAgreeablenessArray).length);
            if ($scope.view.ideasHighestSocialTotal === ($scope.view.ideasOpennessArray).length) {
                $scope.view.ideasOverallSocial = 'Openness';
            } else if ($scope.view.ideasHighestSocialTotal === ($scope.view.ideasConscientiousnessArray).length) {
                $scope.view.ideasOverallSocial = 'Conscientiousness';
            } else if ($scope.view.ideasHighestSocialTotal === ($scope.view.ideasExtraversionArray).length) {
                $scope.view.ideasOverallSocial = 'Extraversion';
            } else if ($scope.view.ideasHighestSocialTotal === ($scope.view.ideasAgreeablenessArray).length) {
                $scope.view.ideasOverallSocial = 'Agreeableness';
            }

            // ***** Getting Personality Results for Journal Folder and making graphs ******

            Profile.createJournal(journalData).then(function(result) {
                $scope.view.journalResults = result.data;

                google.charts.setOnLoadCallback(watsonChart);
                google.charts.setOnLoadCallback(userChart);
                google.charts.setOnLoadCallback(journalPersonalityChart);
                google.charts.setOnLoadCallback(journalNeedsChart);
                google.charts.setOnLoadCallback(journalValuesChart);

                function journalPersonalityChart() {
                    var data = google.visualization.arrayToDataTable([
                        ["Personality", "Percent", {
                            role: "style"
                        }],
                        ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#263749"],
                        ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "#83969D"],
                        ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "#A1BDA6"],
                        ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "#DACBAE"],
                        ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "#89212A"]
                    ]);

                    var view = new google.visualization.DataView(data);
                    view.setColumns([0, 1, {
                            calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation"
                        },
                        2
                    ]);

                    var options = {
                        title: "Personality of Journal",
                        width: "50%",
                        height: 200,
                        bar: {
                            groupWidth: "50%"
                        },
                        legend: {
                            position: "none"
                        }
                    };
                    var chart = new google.visualization.BarChart(document.getElementById("journalPersonalityChart"));
                    chart.draw(view, options);
                }

                function journalNeedsChart() {
                    var data = google.visualization.arrayToDataTable([
                        ["Needs", "Percent", {
                            role: "style"
                        }],
                        ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#263749"],
                        ["Love", result.data.tree.children[1].children[0].children[7].percentage, "#83969D"],
                        ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "#A1BDA6"],
                        ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "#DACBAE"],
                        ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "#89212A"]
                    ]);

                    var view = new google.visualization.DataView(data);
                    view.setColumns([0, 1, {
                            calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation"
                        },
                        2
                    ]);

                    var options = {
                        title: "Consumer Needs of Journal",
                        width: "50%",
                        height: 200,
                        bar: {
                            groupWidth: "50%"
                        },
                        legend: {
                            position: "none"
                        }
                    };
                    var chart = new google.visualization.BarChart(document.getElementById("journalNeedsChart"));
                    chart.draw(view, options);
                }

                function journalValuesChart() {
                    var data = google.visualization.arrayToDataTable([
                        ["Values", "Percentage", {
                            role: "style"
                        }],
                        ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#263749"],
                        ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "#83969D"],
                        ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "#A1BDA6"],
                        ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "#DACBAE"],
                        ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "#89212A"]
                    ]);

                    var view = new google.visualization.DataView(data);
                    view.setColumns([0, 1, {
                            calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation"
                        },
                        2
                    ]);

                    var options = {
                        title: "Values of Journal",
                        width: "50%",
                        height: 200,
                        bar: {
                            groupWidth: "50%"
                        },
                        legend: {
                            position: "none"
                        }
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
        });
    };

    // ***** Draw the Journal Charts again *****
    $scope.drawJournal = function() {
        Profile.createJournal(journalData).then(function(result) {
            $scope.view.journalResults = result.data;

            google.charts.setOnLoadCallback(watsonChart);
            google.charts.setOnLoadCallback(userChart);
            google.charts.setOnLoadCallback(journalPersonalityChart);
            google.charts.setOnLoadCallback(journalNeedsChart);
            google.charts.setOnLoadCallback(journalValuesChart);

            function journalPersonalityChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Personality", "Percent", {
                        role: "style"
                    }],
                    ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#263749"],
                    ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "#83969D"],
                    ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "#A1BDA6"],
                    ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "#DACBAE"],
                    ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Personality of Journal",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("journalPersonalityChart"));
                chart.draw(view, options);
            }

            function journalNeedsChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Needs", "Percent", {
                        role: "style"
                    }],
                    ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#263749"],
                    ["Love", result.data.tree.children[1].children[0].children[7].percentage, "#83969D"],
                    ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "#A1BDA6"],
                    ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "#DACBAE"],
                    ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Consumer Needs of Journal",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("journalNeedsChart"));
                chart.draw(view, options);
            }

            function journalValuesChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Values", "Percentage", {
                        role: "style"
                    }],
                    ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#263749"],
                    ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "#83969D"],
                    ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "#A1BDA6"],
                    ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "#DACBAE"],
                    ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Values of Journal",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
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
    };

    // ***** Draw the Notebook Charts on click event *****
    $scope.drawNotebook = function() {
        Profile.personalityNotebook(notebookData).then(function(result) {
            $scope.view.notebookResults = result.data;

            google.charts.setOnLoadCallback(notebookPersonalityChart);
            google.charts.setOnLoadCallback(notebookNeedsChart);
            google.charts.setOnLoadCallback(notebookValuesChart);
            google.charts.setOnLoadCallback(notebookEmotionChart);

            function notebookPersonalityChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Personality", "Percent", {
                        role: "style"
                    }],
                    ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#263749"],
                    ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "#83969D"],
                    ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "#A1BDA6"],
                    ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "#DACBAE"],
                    ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Personality of Notebook",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("notebookPersonalityChart"));
                chart.draw(view, options);
            }

            function notebookNeedsChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Needs", "Percent", {
                        role: "style"
                    }],
                    ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#263749"],
                    ["Love", result.data.tree.children[1].children[0].children[7].percentage, "#83969D"],
                    ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "#A1BDA6"],
                    ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "#DACBAE"],
                    ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Consumer Needs of Notebook",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("notebookNeedsChart"));
                chart.draw(view, options);
            }

            function notebookValuesChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Values", "Percentage", {
                        role: "style"
                    }],
                    ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#263749"],
                    ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "#83969D"],
                    ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "A1BDA6"],
                    ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "#DACBAE"],
                    ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Values of Notebook",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("notebookValuesChart"));
                chart.draw(view, options);
            }

            function notebookEmotionChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Emotion', 'Total per emotion'],
                    ['Anger', ($scope.view.notebookAngerArray).length],
                    ['Disgust', ($scope.view.notebookDisgustArray).length],
                    ['Fear', ($scope.view.notebookFearArray).length],
                    ['Joy', ($scope.view.notebookJoyArray).length],
                    ['Sadness', ($scope.view.notebookSadnessArray).length]
                ]);

                var options = {
                    title: 'Overall Emotional Results',
                    pieHole: 0.4
                };

                var chart = new google.visualization.PieChart(document.getElementById('notebookEmotionChart'));
                chart.draw(data, options);
            }
        });
    };

    // ***** Draw Job Charts on click event *****
    $scope.drawJob = function() {
        Profile.personalityJob(jobData).then(function(result) {
            console.log(result.data);
            $scope.view.jobResults = result.data;

            google.charts.setOnLoadCallback(jobPersonalityChart);
            google.charts.setOnLoadCallback(jobNeedsChart);
            google.charts.setOnLoadCallback(jobValuesChart);
            google.charts.setOnLoadCallback(jobEmotionChart);

            function jobPersonalityChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Personality", "Percent", {
                        role: "style"
                    }],
                    ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#263749"],
                    ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "#83969D"],
                    ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "#A1BDA6"],
                    ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "#DACBAE"],
                    ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Personality of Job",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("jobPersonalityChart"));
                chart.draw(view, options);
            }

            function jobNeedsChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Needs", "Percent", {
                        role: "style"
                    }],
                    ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#263749"],
                    ["Love", result.data.tree.children[1].children[0].children[7].percentage, "#83969D"],
                    ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "#A1BDA6"],
                    ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "#DACBAE"],
                    ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Consumer Needs of Job",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("jobNeedsChart"));
                chart.draw(view, options);
            }

            function jobValuesChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Values", "Percentage", {
                        role: "style"
                    }],
                    ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#263749"],
                    ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "#83969D"],
                    ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "#A1BDA6"],
                    ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "#DACBAE"],
                    ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Values of Job",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("jobValuesChart"));
                chart.draw(view, options);
            }

            function jobEmotionChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Emotion', 'Total per emotion'],
                    ['Anger', ($scope.view.jobAngerArray).length],
                    ['Disgust', ($scope.view.jobDisgustArray).length],
                    ['Fear', ($scope.view.jobFearArray).length],
                    ['Joy', ($scope.view.jobJoyArray).length],
                    ['Sadness', ($scope.view.jobSadnessArray).length]
                ]);

                var options = {
                    title: 'Overall Emotional Results',
                    pieHole: 0.4
                };

                var chart = new google.visualization.PieChart(document.getElementById('jobEmotionChart'));
                chart.draw(data, options);
            }
        });
    };

    $scope.drawIdeas = function() {
        Profile.personalityIdeas(ideasData).then(function(result) {
            console.log(result.data);
            $scope.view.ideasResults = result.data;

            google.charts.setOnLoadCallback(ideasPersonalityChart);
            google.charts.setOnLoadCallback(ideasNeedsChart);
            google.charts.setOnLoadCallback(ideasValuesChart);
            google.charts.setOnLoadCallback(ideasEmotionChart);

            function ideasPersonalityChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Personality", "Percent", {
                        role: "style"
                    }],
                    ["Agreeableness", result.data.tree.children[0].children[0].children[3].percentage, "#263749"],
                    ["Introversion/Extraversion", result.data.tree.children[0].children[0].children[2].percentage, "#83969D"],
                    ["Emotional range", result.data.tree.children[0].children[0].children[4].percentage, "#A1BDA6"],
                    ["Openness", result.data.tree.children[0].children[0].children[0].percentage, "#DACBAE"],
                    ["Conscientiousness", result.data.tree.children[0].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Personality of Ideas",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("ideasPersonalityChart"));
                chart.draw(view, options);
            }

            function ideasNeedsChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Needs", "Percent", {
                        role: "style"
                    }],
                    ["Practicality", result.data.tree.children[1].children[0].children[8].percentage, "#263749"],
                    ["Love", result.data.tree.children[1].children[0].children[7].percentage, "#83969D"],
                    ["Harmony", result.data.tree.children[1].children[0].children[4].percentage, "#A1BDA6"],
                    ["Liberty", result.data.tree.children[1].children[0].children[6].percentage, "#DACBAE"],
                    ["Closeness", result.data.tree.children[1].children[0].children[1].percentage, "#89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Consumer Needs of Ideas",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("ideasNeedsChart"));
                chart.draw(view, options);
            }

            function ideasValuesChart() {
                var data = google.visualization.arrayToDataTable([
                    ["Values", "Percentage", {
                        role: "style"
                    }],
                    ["Conservation", result.data.tree.children[2].children[0].children[0].percentage, "#263749"],
                    ["Openness to change", result.data.tree.children[2].children[0].children[1].percentage, "#83969D"],
                    ["Hedonism", result.data.tree.children[2].children[0].children[2].percentage, "#A1BDA6"],
                    ["Self-enhancement", result.data.tree.children[2].children[0].children[3].percentage, "color: #DACBAE"],
                    ["Self-transcendence", result.data.tree.children[2].children[0].children[4].percentage, "color: #89212A"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    title: "Values of Ideas",
                    width: "50%",
                    height: 200,
                    bar: {
                        groupWidth: "50%"
                    },
                    legend: {
                        position: "none"
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById("ideasValuesChart"));
                chart.draw(view, options);
            }

            function ideasEmotionChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Emotion', 'Total per emotion'],
                    ['Anger', ($scope.view.ideasAngerArray).length],
                    ['Disgust', ($scope.view.ideasDisgustArray).length],
                    ['Fear', ($scope.view.ideasFearArray).length],
                    ['Joy', ($scope.view.ideasJoyArray).length],
                    ['Sadness', ($scope.view.ideasSadnessArray).length]
                ]);

                var options = {
                    title: 'Overall Emotional Results',
                    pieHole: 0.4
                };

                var chart = new google.visualization.PieChart(document.getElementById('ideasEmotionChart'));
                chart.draw(data, options);
            }
        });
    };
}
