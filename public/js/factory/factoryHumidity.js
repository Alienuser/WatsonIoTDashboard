app.factory('Humidity', ['$http', 'api', function ($http, api) {

    var Humidity = {};

    Humidity.getHistory = function (startDate, endDate) {
        return $http({
            method: 'GET',
            url: api.url_db_view + '/grovepi-humidity?startkey="' + startDate + '"&endkey="' + endDate + '"'
        });
    };

    return Humidity;
}]);