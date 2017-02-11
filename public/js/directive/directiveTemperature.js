(function () {

    app.directive('widgetTemperature', ['$mdToast', '$filter', 'Temperature', function ($mdToast, $filter, Temperature) {

        return {
            templateUrl: 'templates/directive/directiveTemperature.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {

                $scope.liveTemperature = true;
                $scope.temperatureLabel = ["", "", "", "", "", "", "", "", "", ""];
                $scope.temperatureData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                $scope.liveOptionsTemperature = {
                    showTooltips: true,
                    pointDot: true,
                    animation: false,
                    scaleShowVerticalLines: true,
                    scaleBeginAtZero: true
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_temphum', function (event, message) {
                    updateTemperatureWidget(message);
                });

                $scope.toggleTemperatureLive = function () {
                    if (!$scope.liveTemperature) {
                        $scope.temperatureLabel = ["", "", "", "", "", "", "", "", "", ""];
                        $scope.temperatureData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                        $mdToast.showSimple("Temperature is live now.");
                    } else {
                        $scope.temperatureLabel = [];
                        $scope.temperatureData = [[]];
                        $mdToast.showSimple("Temperature is not live now.");
                    }
                };

                $scope.getTemperatureData = function () {
                    $scope.spinnerTemperature = true;
                    var temperatureLabel = [];
                    var temperatureData = [[]];
                    var startDate = $filter('date')($scope.temperatureStartDate, 'yyyy-MM-dd') + "T00:00:00.000Z";
                    var endDate = $filter('date')($scope.temperatureEndDate, 'yyyy-MM-dd') + "T23:59:59.000Z";
                    Temperature.getHistory(startDate, endDate)
                        .success(function (response) {
                            if (response.rows.length > 0) {
                                for (var i = 0; i < response.rows.length; i++) {
                                    if (i % 500 === 0) {
                                        temperatureLabel.push(response.rows[i].key.substring(0, 10));
                                        temperatureData[0].push(response.rows[i].value);
                                    }
                                    $scope.temperatureLabel = temperatureLabel;
                                    $scope.temperatureData = temperatureData;
                                }
                            } else {
                                $scope.temperatureLabel = null;
                                $scope.temperatureData = null;
                                $scope.temperatureNoData = true;
                            }
                            $scope.spinnerTemperature = false;
                        }).error(function () {
                        $mdToast.showSimple("Could not fetch temperature from database!");
                        $scope.spinnerTemperature = false;
                    });
                };

                function updateTemperatureWidget(data) {
                    if ($scope.liveTemperature) {
                        if (data.temperature) {
                            $scope.$apply(function () {
                                $scope.temperatureLabel = $scope.temperatureLabel.slice(1);
                                $scope.temperatureData[0] = $scope.temperatureData[0].slice(1);
                                //add new value
                                $scope.temperatureData[0].push(data.temperature);
                                $scope.temperatureLabel.push(data.timestamp.substring(11, 19));
                            });
                        }
                    }
                }
            }
        };
    }]);

})();