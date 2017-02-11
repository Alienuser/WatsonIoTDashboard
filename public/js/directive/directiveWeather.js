(function () {

    app.directive('widgetWeather', ['$mdToast', '$filter', 'Weather', function ($mdToast, $filter, Weather) {

        return {
            templateUrl: 'templates/directive/directiveWeather.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {
                $scope.showMessage = false;

                // Define the selects
                $scope.locals = [{
                    value: '52.519271,13.405915',
                    label: 'Berlin'
                }, {
                    value: '48.784497,9.182615',
                    label: 'Stuttgart'
                }, {
                    value: '48.144984,11.587935',
                    label: 'München'
                }, {
                    value: '48.738979,9.271984',
                    label: 'Esslingen'
                }];

                $scope.getWeather = function () {
                    $scope.spinnerWeather = true;

                    var location = JSON.parse($scope.location);
                    var locationName = location.label;
                    var latitude = location.value.split(',')[0];
                    var longitude = location.value.split(',')[1];
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
                    $scope.weatherIcon = 'img/weathericons/icon' + message.code +'.png';
                });
            }
        };
    }]);

})();