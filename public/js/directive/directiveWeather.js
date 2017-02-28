(function () {

    app.directive('widgetWeather', ['$mdToast', '$filter', 'Weather', function ($mdToast, $filter, Weather) {

        return {
            templateUrl: 'templates/directive/directiveWeather.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {
                $scope.showMessage = false;

                Weather.getCities()
                    .then(function (response) {
                        $scope.locals = response.data.rows;
                    });

                $scope.getWeather = function () {
                    $scope.spinnerWeather = true;

                    var locationName = location.name;
                    var latitude = location.latitude;
                    var longitude = location.longitude;
                    var language = $scope.language;

                    Weather.getForcast($scope.$root.dashboard, locationName, latitude, longitude, language)
                        .then(function (response) {
                            $mdToast.showSimple("Getting weather data...");
                            $scope.message = response;
                        }, function errorCallback(response) {
                            $mdToast.showSimple("Could not get weather data!");
                            $scope.spinnerWeather = false;
                        });
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_weather', function (event, message) {
                    $scope.spinnerWeather = false;
                    $scope.showMessage = true;
                    $scope.message = message.text;
                    $scope.weatherIcon = 'img/weathericons/icon' + message.code + '.png';
                });
            }
        };
    }]);

})();