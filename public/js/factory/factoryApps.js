app.factory('Apps', ['$http', function ($http) {

    var Apps = {};

    Apps.setLed = function (dashboard, led, status) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-led',
            data: {
                led: led,
                stat: status
            }
        });
    };

    Apps.setBuzzer = function (dashboard, status) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-buzzer',
            data: {
                stat: status
            }
        });
    };

    return Apps;

}]);