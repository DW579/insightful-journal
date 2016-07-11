angular.module('sampleApp').factory('NewEntry', ['$http', function($http) {

    return {

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

        sendData: function(entryData) {
          return $http({
            url: '/api/results',
            method: 'POST',
            data: {results: entryData}
          })
        },

        // call to DELETE a NewEntry
        delete : function(id) {
            return $http.delete('/api/newEntrys/' + id);
        }
    };

}]);
