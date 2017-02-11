(function () {

    app.directive('widgetHumidity', ['$mdToast', '$filter', 'Humidity', function ($mdToast, $filter, Humidity) {

        return {
            templateUrl: 'templates/directive/directiveHumidity.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {

                $scope.liveHumidity = true;
                $scope.humidityLabel = ["", "", "", "", "", "", "", "", "", ""];
                $scope.humidityData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                $scope.liveOptionsHumidity = {
                    showTooltips: true,
                    pointDot: true,
                    animation: false,
                    scaleShowVerticalLines: true,
                    scaleBeginAtZero: true
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_temphum', function (event, message) {
                    updateHumidityWidget(message);
                });

                $scope.toggleHumidityLive = function () {
                    if ($scope.liveHumidity) {
                        $scope.humidityLabel = ["", "", "", "", "", "", "", "", "", ""];
                        $scope.humidityData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                        $mdToast.showSimple("Humidity is live now.");
                    } else {
                        $scope.humidityLabel = [];
                        $scope.humidityData = [[]];
                        $mdToast.showSimple("Humidity is not live now.");
                    }
                };

                $scope.getHumidityData = function () {
                    $scope.spinnerHumidity = true;
                    var humidityLabel = [];
                    var humidityData = [[]];
                    var startDate = $filter('date')($scope.humidityStartDate, 'yyyy-MM-dd') + "T00:00:00.000Z";
                    var endDate = $filter('date')($scope.humidityEndDate, 'yyyy-MM-dd') + "T23:59:59.000Z";

                    Humidity.getHistory(startDate, endDate)
                        .success(function (response) {
                            if (response.rows.length > 0) {
                                for (var i = 0; i < response.rows.length; i++) {
                                    if (i % 500 === 0) {
                                        humidityLabel.push(response.rows[i].key.substring(0, 10));
                                        humidityData[0].push(response.rows[i].value);
                                    }
                                    $scope.humidityLabel = humidityLabel;
                                    $scope.humidityData = humidityData;
                                }
                            } else {
                                $scope.humidityLabel = null;
                                $scope.humidityData = null;
                                $scope.humidityNoData = true;
                            }
                            $scope.spinnerHumidity = false;
                        }).error(function () {
                        $mdToast.showSimple("Could not fetch humidity from database!");
                        $scope.spinnerHumidity = false;
                    });
                };

                function updateHumidityWidget(data) {
                    if ($scope.liveHumidity) {
                        if (data.humidity) {
                            $scope.$apply(function () {
                                $scope.humidityLabel = $scope.humidityLabel.slice(1);
                                $scope.humidityData[0] = $scope.humidityData[0].slice(1);
                                //add new value
                                $scope.humidityData[0].push(data.humidity);
                                $scope.humidityLabel.push(data.timestamp.substring(11, 19));
                            });
                        }
                    }
                }
            }
        };
    }]);

})();