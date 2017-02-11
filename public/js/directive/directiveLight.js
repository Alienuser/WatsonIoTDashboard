(function () {

    app.directive('widgetLight', [function () {

        return {
            templateUrl: 'templates/directive/directiveLight.html',
            restrict: 'E',
            scope: {},
            link: function ($scope, attrs) {

                $scope.LightStartDate = new Date();
                $scope.LightEndDate = new Date();

                $scope.liveLight = true;
                $scope.lightLabel = ["", "", "", "", "", "", "", "", "", ""];
                $scope.lightData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                $scope.liveOptionsLight = {
                    showTooltips: true,
                    pointDot: true,
                    animation: false,
                    scaleShowVerticalLines: true,
                    scaleBeginAtZero: true
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_light', function (event, message) {
                    updateLightWidget(message);
                });

                function updateLightWidget(data) {
                    if ($scope.liveLight) {
                        if (data.light) {
                            $scope.$apply(function () {                                       //apply changes manually for angular
                                $scope.lightLabel = $scope.lightLabel.slice(1);
                                $scope.lightData[0] = $scope.lightData[0].slice(1);
                                //add new value
                                $scope.lightData[0].push(data.light);
                                $scope.lightLabel.push(data.timestamp.substring(11, 19));
                            });
                        }
                    }
                }
            }
        };
    }]);

})();