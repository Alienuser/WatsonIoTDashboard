app.factory('DB', ['$http', function ($http) {

    var DB = {};

    DB.getUrls = function () {
        return $http({
            method: 'GET',
            url: localStorage.getItem('url_db_dashboard') + 'dashboard/_all_docs?include_docs=true'
        });
    };

    DB.setUrls = function (did, rev, grovepi, nodered, rest) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_db_dashboard') + '/dashboard/' + did + '?rev=' + rev,
            data: {
                grovepi: grovepi,
                url_nodered: nodered,
                url_rest: rest
            }
        });
    };

    return DB;
}]);