app.factory('Api', ['$http', 'api', function ($http, api) {

    var Api = {};

    Api.getAppEnvVariables = function () {
        return $http({
            method: 'GET',
            url: '/api/getAppEnv'
        });
    };

    return Api;
}]);