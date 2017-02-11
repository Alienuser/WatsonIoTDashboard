(function () {

    app.controller('controllerFabApps', function ($rootScope, $scope, $http, $mdDialog, $mdToast, api, hotkeys, Apps) {

        hotkeys.bindTo($rootScope)
            .add({
                combo: 's',
                description: 'Open the modal for speak.',
                callback: function () {
                    $scope.openInput($rootScope.dashboard);
                }
            })
            .add({
                combo: 'l',
                description: 'Open the modal for led.',
                callback: function () {
                    $scope.changeLed($rootScope.dashboard);
                }
            });

        $scope.changeLed = function (dashboard) {
            $mdDialog.show({
                templateUrl: 'templates/modal/setLed.html',
                clickOutsideToClose: false,
                closeTo: angular.element(document.querySelector('#fabMessageApp')),
                openFrom: angular.element(document.querySelector('#fabMessageApp')),
                controller: function ($scope) {

                    // Define the default value
                    $scope.red = $scope.green = $scope.blue = false;

                    $scope.set = function (led, status) {
                        Apps.setLed(dashboard, led, status)
                            .then(function (response) {
                                $mdToast.showSimple("Color successful set.");
                            }, function errorCallback(response) {
                                $mdToast.showSimple("An error occurred :(");
                            });
                    };

                    $scope.close = function () {
                        $mdDialog.hide();
                    };
                }
            });
        };

        $scope.changeBuzzer = function (dashboard) {
            $mdDialog.show({
                templateUrl: 'templates/modal/setBuzzer.html',
                clickOutsideToClose: false,
                closeTo: angular.element(document.querySelector('#fabMessageApp')),
                openFrom: angular.element(document.querySelector('#fabMessageApp')),
                controller: function ($scope) {

                    // Define the default value
                    $scope.status = false;
                    $scope.tone = 0;

                    $scope.set = function () {
                        Apps.setBuzzer(dashboard, $scope.status)
                            .then(function (response) {
                            }, function errorCallback(response) {
                                $mdToast.showSimple("An error occurred :(");
                            });
                    };

                    $scope.close = function () {
                        $mdDialog.hide();
                    };
                }
            });
        };

        $scope.changeColor = function (dashboard) {
            $mdDialog.show({
                templateUrl: 'templates/modal/changeColor.html',
                clickOutsideToClose: false,
                closeTo: angular.element(document.querySelector('#fabMessageApp')),
                openFrom: angular.element(document.querySelector('#fabMessageApp')),
                controller: function ($scope) {

                    // Define the default value
                    $scope.red = 0;
                    $scope.green = 0;
                    $scope.blue = 0;

                    $scope.disable = function () {
                        // Send the message
                        $http({
                            method: 'PUT',
                            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-light',
                            data: {
                                lightr: '000',
                                lightg: '000',
                                lightb: '000'
                            }
                        }).then(function (response) {
                            $mdToast.showSimple("Color successfully disabled!");
                            $mdDialog.hide();
                        }, function errorCallback(response) {
                            $mdToast.showSimple("An error occurred :(");
                            $mdDialog.hide();
                        });
                    };

                    $scope.send = function () {
                        var red = $scope.red;
                        var green = $scope.green;
                        var blue = $scope.blue;

                        if (!red) {
                            red = "000";
                        } else if (parseInt($scope.red) < 10) {
                            red = "00" + $scope.red;
                        } else if (parseInt($scope.red) < 100) {
                            red = "0" + $scope.red;
                        }

                        if (!green) {
                            green = "000";
                        } else if (parseInt($scope.green) < 10) {
                            green = "00" + $scope.green;
                        } else if (parseInt($scope.green) < 100) {
                            green = "0" + $scope.green;
                        }

                        if (!blue) {
                            blue = "000";
                        } else if (parseInt($scope.blue) < 10) {
                            blue = "00" + $scope.blue;
                        } else if (parseInt($scope.blue) < 100) {
                            blue = "0" + $scope.blue;
                        }

                        // Send the message
                        $http({
                            method: 'PUT',
                            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-light',
                            data: {
                                lightr: red,
                                lightg: green,
                                lightb: blue
                            }
                        }).then(function (response) {
                        }, function errorCallback(response) {
                            $mdToast.showSimple("An error occurred :(");
                            $mdDialog.hide();
                        });
                    };

                    $scope.close = function () {
                        // Send the message
                        $http({
                            method: 'PUT',
                            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-light',
                            data: {
                                lightr: '000',
                                lightg: '000',
                                lightb: '000'
                            }
                        }).then(function (response) {
                            $mdToast.showSimple("Disable the color.");
                        }, function errorCallback(response) {
                            $mdToast.showSimple("An error occurred :(");
                            $mdDialog.hide();
                        });
                        $mdDialog.hide();
                    };
                }
            });
        };

        $scope.playSound = function (dashboard) {
            $mdDialog.show({
                templateUrl: 'templates/modal/playSound.html',
                clickOutsideToClose: false,
                closeTo: angular.element(document.querySelector('#fabMessageApp')),
                openFrom: angular.element(document.querySelector('#fabMessageApp')),
                controller: function ($scope) {

                    $scope.close = function () {
                        $mdDialog.hide();
                    };

                    $scope.send = function () {
                        $rootScope.spinnerMode = true;
                        $http({
                            method: 'PUT',
                            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-sound',
                            data: {
                                file: $scope.soundFile + '.wav'
                            }
                        }).then(function () {
                            $rootScope.spinnerMode = false;
                            $mdToast.showSimple("Sound will be played!");
                            $mdDialog.hide();
                        }, function errorCallback(response) {
                            $rootScope.spinnerMode = false;
                            $mdToast.showSimple("An error occurred :(");
                            $mdDialog.hide();
                        });
                    }
                }
            });
        };

        $scope.openInput = function (dashboard) {

            var voices = null;

            $mdDialog.show({
                templateUrl: 'templates/modal/messageInput.html',
                clickOutsideToClose: true,
                closeTo: angular.element(document.querySelector('#fabMessageApp')),
                openFrom: angular.element(document.querySelector('#fabMessageApp')),
                controller: function ($scope) {
                    $scope.changeVoice = function () {
                        if ($scope.dest == "de") {
                            voices = [
                                {send: "de-DE_DieterVoice", name: 'Dieter (männlich)'},
                                {send: "de-DE_BirgitVoice", name: 'Birgit (weiblich)'}
                            ];
                        } else if ($scope.dest == "fr") {
                            voices = [
                                {send: "fr-FR_ReneeVoice", name: 'Renee (weiblich)'}
                            ];
                        } else if ($scope.dest == "it") {
                            voices = [
                                {send: "it-IT_FrancescaVoice", name: 'Francesca (weiblich)'}
                            ];
                        } else if ($scope.dest == "sp") {
                            voices = [
                                {send: "es-ES_LauraVoice", name: 'Laura (weiblich)'},
                                {send: "es-US_SofiaVoice", name: 'Sofia (weiblich)'},
                                {send: "es-ES_EnriqueVoice", name: 'Enrique (männlich)'}
                            ];
                        } else {
                            voices = [
                                {send: "en-US_MichaelVoice", name: 'Michael (männlich)'},
                                {send: "en-US_LisaVoice", name: 'Lisa (weiblich)'},
                                {send: "en-US_AllisonVoice", name: 'Allison (weiblich)'},
                                {send: "en-GB_KateVoice", name: 'Kate (weiblich)'}
                            ];
                        }
                        $scope.voices = voices;
                    };

                    $scope.send = function () {
                        // Show the spinner
                        $rootScope.spinnerMode = true;
                        if ($scope.message == null) {
                            $scope.message = "Hi! Please enter some text to let me speak!"
                        }
                        if ($scope.src == null) {
                            $scope.src = "en";
                        }
                        if ($scope.dest == null) {
                            $scope.dest = "en";
                        }
                        if ($scope.person == null && $scope.dest == "de") {
                            $scope.person = "de-DE_DieterVoice";
                        } else if ($scope.person == null && $scope.dest == "fr") {
                            $scope.person = "fr-FR_ReneeVoice";
                        } else if ($scope.person == null && $scope.dest == "it") {
                            $scope.person = "it-IT_FrancescaVoice";
                        } else if ($scope.person == null && $scope.dest == "sp") {
                            $scope.person = "es-ES_LauraVoice";
                        } else if ($scope.person == null && $scope.dest == "en") {
                            $scope.person = "en-GB_KateVoice";
                        }

                        // Send the message
                        $http({
                            method: 'PUT',
                            url: localStorage.getItem('url_rest_' + dashboard) + '/grovepi' + dashboard + '-speak',
                            data: {
                                voice: $scope.person,
                                message: $scope.message,
                                srclang: $scope.src,
                                destlang: $scope.dest
                            }
                        }).then(function (response) {
                            $mdToast.showSimple("Message is successfully send!");
                            $scope.openFurbySentiment(response.data.split(";")[1]);
                            $mdDialog.hide();
                        }, function errorCallback(response) {
                            $mdToast.showSimple("An error occurred :(");
                            $rootScope.spinnerMode = false;
                            $mdDialog.hide();
                        });
                    };

                    $scope.openFurbySentiment = function (sentiment) {
                        $mdDialog.show({
                            templateUrl: 'templates/modal/sentiment.html',
                            clickOutsideToClose: true,
                            closeTo: angular.element(document.querySelector('#fabFurby')),
                            controller: function ($scope) {
                                // Disable the spinner
                                $rootScope.spinnerMode = false;
                                // Show the sentiment
                                $scope.sentiment = sentiment;
                                if (parseInt(sentiment) <= -5) {
                                    $scope.sentimentimage = "angry";
                                } else if (parseInt(sentiment) < 0) {
                                    $scope.sentimentimage = "bad";
                                } else if (parseInt(sentiment) == 0) {
                                    $scope.sentimentimage = "normal";
                                } else if (parseInt(sentiment) > 0) {
                                    $scope.sentimentimage = "good";
                                } else {
                                    $scope.sentimentimage = "super";
                                }

                                $scope.close = function () {
                                    $mdDialog.hide();
                                };
                            }
                        });
                    };

                    $scope.close = function () {
                        $mdDialog.hide();
                    };
                }
            });
        };
    });

})();