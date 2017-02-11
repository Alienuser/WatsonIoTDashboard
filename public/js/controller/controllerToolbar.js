(function () {

    app.controller('controllerToolbar', function ($rootScope, $scope, $route) {

        $scope.refresh = function () {
            $rootScope.spinnerMode = true;
            $route.reload();
        };

    });

})();
