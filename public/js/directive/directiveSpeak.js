(function () {

    app.directive('widgetSpeak', ['$mdToast', '$filter', 'Speak', function ($mdToast, $filter, Speak) {

        return {
            templateUrl: 'templates/directive/directiveSpeak.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {

                $scope.startRecording = function () {
                    $scope.buttonRecording = true;
                    $scope.speaking = true;

                    Speak.startSpeak($scope.$root.dashboard)
                        .then(function (response) {
                            $mdToast.showSimple("Start recording!");
                        }, function errorCallback(response) {
                            $mdToast.showSimple("Could not start recording.");
                            $scope.spinnerSpeak = false;
                        });
                };

                $scope.stopRecording = function () {
                    $scope.spinnerSpeak = true;
                    $scope.buttonRecording = false;
                    $scope.speaking = false;

                    Speak.stopSpeak($scope.$root.dashboard)
                        .then(function (response) {
                            $mdToast.showSimple("Stop recording! Analysing text...");
                        }, function errorCallback(response) {
                            $mdToast.showSimple("Could not analyse text!");
                            $scope.spinnerSpeak = false;
                        });
                };

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_microphone', function (event, message) {
                    $scope.spinnerSpeak = false;
                    $scope.showMessage = true;
                    $scope.message = message.text;
                });
            }
        };
    }]);

})();