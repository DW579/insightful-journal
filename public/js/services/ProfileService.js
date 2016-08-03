angular.module('sampleApp').factory('Profile', ['$http', function($http) {

    return {

        getData: function() {
            return $http({
                url: '/api/data',
                method: 'GET'
            });
        },

        createJournal: function(journalData) {
            return $http({
                url: '/api/personalityJournal',
                method: 'POST',
                data: {
                    data: journalData
                }
            });
        },

        personalityNotebook: function(notebookData) {
            return $http({
                url: '/api/personalityNotebook',
                method: 'POST',
                data: {
                    data: notebookData
                }
            });
        },

        personalityJob: function(jobData) {
            return $http({
                url: '/api/personalityJob',
                method: 'POST',
                data: {
                    data: jobData
                }
            });
        },

        personalityIdeas: function(ideasData) {
            return $http({
                url: '/api/personalityIdeas',
                method: 'POST',
                data: {
                    data: ideasData
                }
            });
        }

    };
}]);
