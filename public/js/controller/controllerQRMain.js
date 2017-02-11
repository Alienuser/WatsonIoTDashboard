(function () {

    app.controller('controllerQRMain', function ($rootScope, $scope, $mdDialog, hotkeys) {

        hotkeys.bindTo($rootScope)
            .add({
                combo: 'q',
                description: 'Open the qr-code modal.',
                callback: function () {
                    $scope.openQRCode();
                }
            });

        $scope.openQRCode = function () {
            $mdDialog.show({
                templateUrl: 'templates/modal/qr_main.html',
                clickOutsideToClose: true,
                openFrom: angular.element(document.querySelector('#fabQR')),
                closeTo: angular.element(document.querySelector('#fabQR')),
                controller: function ($scope) {
                    $scope.url = window.location.href;
                    $scope.close = function () {
                        $mdDialog.hide();
                    };
                }
            });
        };
    });

})();