(function () {

    app.controller('controllerGrovepi5', function ($rootScope, Socket) {

        // Disable spinner when page is loaded
        $rootScope.spinnerMode = false;

        // Save the dashboard
        $rootScope.dashboard = 5;

        // Connect the websocket
        Socket.close();
        Socket.connect($rootScope.dashboard);

    });

})();