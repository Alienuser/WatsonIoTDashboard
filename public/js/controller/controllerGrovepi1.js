(function () {

    app.controller('controllerGrovepi1', function ($rootScope, Socket) {

        // Disable spinner when page is loaded
        $rootScope.spinnerMode = false;

        // Save the dashboard
        $rootScope.dashboard = 1;

        // Connect the websocket
        Socket.close();
        Socket.connect($rootScope.dashboard);

    });

})();