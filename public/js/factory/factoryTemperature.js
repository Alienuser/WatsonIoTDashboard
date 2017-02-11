app.factory('Temperature', ['$http', 'api', function ($http, api) {

    var Temperature = {};

    Temperature.getHistory = function (startDate, endDate) {
        return $http({
            method: 'GET',
            url: api.url_db_view + '/grovepi-temperature?startkey="' + startDate + '"&endkey="' + endDate + '"'
        });
    };

    return Temperature;
}]);