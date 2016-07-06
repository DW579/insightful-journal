angular.module('sampleApp').factory('NewEntry', ['$http', function($http) {

    return {
        // call to get all NewEntrys
        get: function() {
            return $http.get('/api/newEntrys');
        },

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new NewEntry
        create : function(newEntryData) {
            return $http.post('/api/newEntrys', newEntryData);
        },

        createWatson: function(inputText) {
          return $http({
            url: '/api/watson',
            method: 'POST',
            data: {text: inputText}
          });
        },

        uploadFile: function(inputFile) {
          return $http({
            url: '/api/file',
            method: 'POST',
            data: {file: inputFile}
          });
        },

        sendData: function(test) {
          return $http({
            url: '/api/results',
            method: 'POST',
            data: {results: test}
          })
        },

        // createPersonality: function(textInput) {
        //   return $http({
        //     url: '/api/watson',
        //     method: 'POST',
        //     data: {text: textInput}
        //   })
        // },

        // call to DELETE a NewEntry
        delete : function(id) {
            return $http.delete('/api/newEntrys/' + id);
        }
    };

}]);
