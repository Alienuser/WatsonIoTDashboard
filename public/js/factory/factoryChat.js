app.factory('Chat', ['$http', 'api', function ($http, api) {

    var Chat = {};

    Chat.getHistory = function (startDate, endDate) {
        return $http({
            method: 'GET',
            url: api.url_db_view + '/grovepi-humidity?startkey="' + startDate + '"&endkey="' + endDate + '"'
        });
    };

    return Chat;
}]);