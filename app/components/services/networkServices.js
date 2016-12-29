angular.module('whatsappAnalyzer')
.factory('dataFactory',['$http', '$window', function($http, $window) {

    var baseUrl = 'https://whatsapp-analyser-backend.herokuapp.com/';
    
    var dataFactory = {};
    dataFactory.getParticipants = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'get_participants'
        })
    };
    dataFactory.getMessageCount = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'total_messages'
        })
    };
    dataFactory.getTotalMessageStat = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'total_msg_stat'
        })
    };
    dataFactory.getAvgMsgStat = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'avg_msg_stat'
        })
    };
    dataFactory.getAvgMsgPerDay = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'avg_msg_per_day'
        })
    };
    dataFactory.getTotalEmoji = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'total_emojis'
        })
    };
    dataFactory.getDistinctEmoji = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'distinct_emojis'
        })
    };
    dataFactory.getTopEmoji = function() {
        return $http({
            method: 'GET',
            url: baseUrl + 'top_emojis'
        })
    };
    return dataFactory;
}]);
angular.module('whatsappAnalyzer')
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);