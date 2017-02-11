(function () {

    app.controller('controllerDemonstration', function ($rootScope, Socket) {

        // Disable spinner when page is loaded
        $rootScope.spinnerMode = false;

        // Save the dashboard
        $rootScope.dashboard = 0;

        // Connect the websocket
        Socket.close();
        Socket.connect($rootScope.dashboard);

    });

})();