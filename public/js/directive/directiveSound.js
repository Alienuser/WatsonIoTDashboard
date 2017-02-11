(function () {

    app.directive('widgetSound', ['$http', '$mdToast', '$filter', 'api', function ($http, $mdToast, $filter, api) {

        return {
            templateUrl: 'templates/directive/directiveSound.html',
            restrict: 'E',
            scope: {},
            link: function ($scope, attrs) {

                $scope.soundStartDate = new Date();
                $scope.soundEndDate = new Date();

                $scope.liveSound = true;
                $scope.soundLabel = ["", "", "", "", "", "", "", "", "", ""];
                $scope.soundData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                $scope.liveOptionsSound = {
                    showTooltips: true,
                    pointDot: true,
                    animation: false,
                    scaleShowVerticalLines: true,
                    scaleBeginAtZero: true
                };

                $scope.toggleSoundLive = function () {
                    if (!$scope.liveSound) {
                        $mdToast.showSimple("Sound is live now.");
                    } else {
                        $mdToast.showSimple("Sound is not live now.");
                    }
                };

                $scope.getSoundData = function () {
                    $scope.spinnerSound = true;
                    var soundLabel = [];
                    var soundData = [[]];
                    var startDate = $filter('date')($scope.soundStartDate, 'yyyy-MM-dd') + "T00:00:00.000Z";
                    var endDate = $filter('date')($scope.soundEndDate, 'yyyy-MM-dd') + "T23:59:59.000Z";
                    $http({
                        method: 'GET',
                        url: api.url_db_view + '/grovepi-sound?startkey="' + startDate + '"&endkey="' + endDate + '"'
                    }).success(function (response) {
                        if (response.rows.length > 0) {
                            for (var i = 0; i < response.rows.length; i++) {
                                if (i % 500 === 0) {
                                    soundLabel.push(response.rows[i].key.substring(0, 10));
                                    soundData[0].push(response.rows[i].value);
                                }
                                $scope.soundLabelHistory = soundLabel;
                                $scope.soundDataHistory = soundData;
                            }
                        } else {
                            $scope.soundLabelHistory = null;
                            $scope.soundDataHistory = null;
                            $scope.soundNoDataHistory = true;
                        }
                        $scope.spinnerSound = false;
                    }).error(function () {
                        $mdToast.showSimple("Could not fetch sound from database!");
                        $scope.spinnerSound = false;
                    });
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_sound', function (event, message) {
                    updateSoundWidget(message);
                });

                function updateSoundWidget(data) {
                    if ($scope.liveSound) {
                        if (data.sound) {
                            $scope.$apply(function () {                                       //apply changes manually for angular
                                $scope.soundLabel = $scope.soundLabel.slice(1);
                                $scope.soundData[0] = $scope.soundData[0].slice(1);
                                //add new value
                                $scope.soundData[0].push(data.sound);
                                $scope.soundLabel.push(data.timestamp.substring(11, 19));
                            });
                        }
                    }
                }

            }
        };
    }]);

})();