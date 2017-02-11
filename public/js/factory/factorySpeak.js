app.factory('Speak', ['$http', function ($http) {

    var Speak = {};

    Speak.startSpeak = function (dashboard) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-gettext',
            data: {
                cmd: 'start'
            }
        });
    };

    Speak.stopSpeak = function (dashboard) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-gettext',
            data: {
                cmd: 'stop'
            }
        });
    };

    return Speak;

}]);