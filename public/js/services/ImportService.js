angular.module('sampleApp').factory('Import', ['$http', function($http) {

    return {
        uploadAudio: function(audioStream) {
          return $http({
            url: '/api/audio',
            method: 'POST',
            data: {audio: audioStream}
          });
        }
    };

}]);
