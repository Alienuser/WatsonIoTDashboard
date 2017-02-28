app.factory('Weather', ['$http', function ($http) {

    var Weather = {};

    Weather.getForcast = function (dashboard, locationName, latitude, longitude, language) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-getweather',
            data: {
                location: locationName,
                latitude: latitude,
                longitude: longitude,
                language: language
            }
        });
    };

    Weather.getCities = function() {
        return $http({
            method: 'GET',
            url: localStorage.getItem('url_db_dashboard') + '/weather/_all_docs?include_docs=true'
        });
    };

    return Weather;

}]);