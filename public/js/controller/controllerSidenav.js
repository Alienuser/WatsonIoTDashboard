(function () {

    app.controller('controllerSidenav', function ($rootScope, $scope, $location, $mdToast) {

        $scope.menuGrovePiMaster = function () {
            $location.path("/");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePiTJ = function () {
            $location.path("/dashboard/tjbot");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePiFurby = function () {
            $location.path("/dashboard/furby");
            $rootScope.toggleMenu();
        };

        $scope.menuChatBot = function () {
            $location.path("/chatbot");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePi1 = function () {
            $location.path("/dashboard/demo1");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePi2 = function () {
            $location.path("/dashboard/demo2");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePi3 = function () {
            $location.path("/dashboard/demo3");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePi4 = function () {
            $location.path("/dashboard/demo4");
            $rootScope.toggleMenu();
        };

        $scope.menuGrovePi5 = function () {
            $location.path("/dashboard/demo5");
            $rootScope.toggleMenu();
        };

        $scope.menuSettings = function () {
            $location.path("/settings");
            $rootScope.toggleMenu();
        };

        $scope.settings = function (dashboard) {
            $mdToast.showSimple("Konfiguration geht bald! Dashboard: " + dashboard);
            $rootScope.toggleMenu();
        };

    });

})();
