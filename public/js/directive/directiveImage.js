(function () {

    app.directive('widgetImage', ['$http', '$mdToast', '$filter', 'api', 'Image', function ($http, $mdToast, $filter, api, Image) {

        return {
            templateUrl: 'templates/directive/directiveImage.html',
            restrict: 'E',
            scope: {},
            link: function ($scope, attrs) {
                $scope.takeImage = function (dashboard) {
                    $scope.spinnerImage = true;
                    Image.takePhoto($scope.$root.dashboard)
                        .then(function (response) {
                            $scope.picture = "-";
                            $mdToast.showSimple("Image was taken. Now loading...");
                        }, function errorCallback(response) {
                            $scope.picture = "http://static.twoday.net/MhsStv/images/leeres-testbild-klein.jpg";
                            $scope.showImage = true;
                            $mdToast.showSimple("Could not get new Image!");
                            $scope.spinnerImage = false;
                        });
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_image', function (event, message) {
                    $scope.picture = message.url;
                    $scope.gender = message.gender;
                    $scope.age = message.age;
                    $scope.showImage = true;
                    $scope.spinnerImage = false;
                });
            }
        };
    }]);

})();