(function () {

    app.directive('widgetUltrasonic', ['$http', '$mdToast', '$filter', 'api', function ($http, $mdToast, $filter, api) {

        return {
            templateUrl: 'templates/directive/directiveUltrasonic.html',
            restrict: 'E',
            scope: {},
            link: function ($scope, attrs) {

                $scope.ultrasonicStartDate = new Date();
                $scope.ultrasonicEndDate = new Date();

                $scope.liveUltrasonic = true;
                $scope.ultrasonicLabel = ["", "", "", "", "", "", "", "", "", ""];
                $scope.ultrasonicData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                $scope.liveOptionsUltrasonic = {
                    showTooltips: true,
                    pointDot: true,
                    animation: false,
                    scaleShowVerticalLines: true,
                    scaleBeginAtZero: true
                };

                $scope.toggleUltrasonicLive = function () {
                    if (!$scope.liveUltrasonic) {
                    } else {
                        $mdToast.showSimple("Ultrasonic is not live now.");
                    }
                };

                $scope.getUltrasonicData = function () {
                    $scope.spinnerUltrasonic = true;
                    var ultrasonicLabel = [];
                    var ultrasonicData = [[]];
                    var startDate = $filter('date')($scope.ultrasonicStartDate, 'yyyy-MM-dd') + "T00:00:00.000Z";
                    var endDate = $filter('date')($scope.ultrasonicEndDate, 'yyyy-MM-dd') + "T23:59:59.000Z";
                    $http({
                        method: 'GET',
                        url: api.url_db_view + '/grovepi-ultrasonic?startkey="' + startDate + '"&endkey="' + endDate + '"'
                    }).success(function (response) {
                        if (response.rows.length > 0) {
                            for (var i = 0; i < response.rows.length; i++) {
                                if (i % 500 === 0) {
                                    ultrasonicLabel.push(response.rows[i].key.substring(0, 10));
                                    ultrasonicData[0].push(response.rows[i].value);
                                }
                                $scope.ultrasonicLabelHistory = ultrasonicLabel;
                                $scope.ultrasonicDataHistory = ultrasonicData;
                            }
                        } else {
                            $scope.ultrasonicLabelHistory = null;
                            $scope.ultrasonicDataHistory = null;
                            $scope.ultrasonicNoDataHistory = true;
                        }
                        $scope.spinnerUltrasonic = false;
                    }).error(function () {
                        $mdToast.showSimple("Could not fetch ultrasonic from database!");
                        $scope.spinnerUltrasonic = false;
                    });
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_ultrasonic', function (event, message) {
                    updateUltrasonicWidget(message);
                });

                function updateUltrasonicWidget(data) {
                    if ($scope.liveUltrasonic) {
                        if (data.distance) {
                            $scope.$apply(function () {                                       //apply changes manually for angular
                                $scope.ultrasonicLabel = $scope.ultrasonicLabel.slice(1);
                                $scope.ultrasonicData[0] = $scope.ultrasonicData[0].slice(1);
                                //add new value
                                $scope.ultrasonicData[0].push(data.distance);
                                $scope.ultrasonicLabel.push(data.timestamp.substring(11, 19));
                            });
                        }
                    }
                }
            }
        };
    }]);

})();