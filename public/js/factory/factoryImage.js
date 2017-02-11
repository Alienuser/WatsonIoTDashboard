app.factory('Image', ['$http', function ($http) {

    var Image = {};

    Image.takePhoto = function (dashboard) {
        return $http({
            method: 'PUT',
            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-getimage',
            data: {
                cmd: 'take-photo'
            }
        });
    };

    return Image;

}]);