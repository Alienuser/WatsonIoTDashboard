app.factory('DB', ['$http', 'api', function ($http, api) {

    var DB = {};

    DB.getUrls = function () {
        return $http({
            method: 'GET',
            url: api.url_db_dashboard + '/_all_docs?include_docs=true'
        });
    };

    DB.setUrls = function (did, rev, grovepi, nodered, rest) {
        return $http({
            method: 'PUT',
            url: api.url_db_dashboard + '/' + did + '?rev=' + rev,
            data: {
                grovepi: grovepi,
                url_nodered: nodered,
                url_rest: rest
            }
        });
    };

    return DB;
}]);