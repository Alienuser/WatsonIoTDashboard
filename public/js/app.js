var app = angular.module('cebit', ['ngMaterial', 'ngRoute', 'chart.js', 'cfp.hotkeys', 'gridster']);

// Define all constants.
app.constant('api', {
    url_db_view: 'https://d0fdfee0-7f8c-4b52-b3dd-300d03ccc98d-bluemix.cloudant.com/sensor-data/_design/dashboard/_view',
    url_db_dashboard: 'https://55020a07-ac3a-48ec-b2c9-6bb6de67d5c9-bluemix.cloudant.com/dashboard'
});

// Define all the routes for the web app.
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: 'dashboard/demonstration'
        })
        .when('/dashboard/demonstration', {
            templateUrl: 'templates/sites/demonstration.html',
            controller: 'controllerDemonstration'
        })
        .when('/dashboard/tjbot', {
            templateUrl: 'templates/sites/tjbot.html',
            controller: 'controllerDemonstration'
        })
        .when('/dashboard/furby', {
            templateUrl: 'templates/sites/furby.html',
            controller: 'controllerDemonstration'
        })
        .when('/dashboard/demo1', {
            templateUrl: 'templates/sites/grovepi1.html',
            controller: 'controllerGrovepi1'
        })
        .when('/dashboard/demo2', {
            templateUrl: 'templates/sites/grovepi2.html',
            controller: 'controllerGrovepi2'
        })
        .when('/dashboard/demo3', {
            templateUrl: 'templates/sites/grovepi3.html',
            controller: 'controllerGrovepi3'
        })
        .when('/dashboard/demo4', {
            templateUrl: 'templates/sites/grovepi4.html',
            controller: 'controllerGrovepi4'
        })
        .when('/dashboard/demo5', {
            templateUrl: 'templates/sites/grovepi5.html',
            controller: 'controllerGrovepi5'
        })
        .when('/settings', {
            templateUrl: 'templates/sites/settings.html',
            controller: 'controllerSettings'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function ($rootScope, $location, $mdDialog, $mdSidenav, $mdToast, hotkeys, gridsterConfig, $timeout, DB) {

    // Configure gridster
    gridsterConfig.columns = 8;
    gridsterConfig.margins = [5, 5];
    gridsterConfig.mobileBreakPoint = 900;
    gridsterConfig.rowHeight = 220;

    // Save the visible dashboard
    $rootScope.dashboard = -1;

    // Toggle for menu navigation
    $rootScope.toggleMenu = buildDelayedToggler('left');

    $rootScope.$on("$routeChangeStart", function () {
        // Start the spinner when changing content
        $rootScope.spinnerMode = true;
    });

    $rootScope.openHome = function () {
        $location.path("");
    };

    function debounce(func, wait) {
        var timer;
        return function debounced() {
            var context = $rootScope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildDelayedToggler(navID) {
        return debounce(function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                });
        }, 200);
    }

    $rootScope.$on('event:oh-grovepi-1_button', function (event, message) {
        if (message && message.status && message.status.data) {
            if (message.status.data[0] == 1) {
                $mdToast.showSimple("Button wurde gedrückt!");
            }
        }
    });

    // Get the urls from db and save it to localstorage
    DB.getUrls()
        .then(function (response) {
            var data = response.data.rows;
            for (var i = 0; i < data.length; i++) {
                localStorage.setItem("did_" + data[i].doc.grovepi, data[i].id);
                localStorage.setItem("rev_" + data[i].doc.grovepi, data[i].doc._rev);
                localStorage.setItem("url_nodered_" + data[i].doc.grovepi, data[i].doc.url_nodered);
                localStorage.setItem("url_rest_" + data[i].doc.grovepi, data[i].doc.url_rest);
                localStorage.setItem("url_database_" + data[i].doc.grovepi, data[i].doc.url_database);
            }

        });

    // Add all hotkeys
    hotkeys.bindTo($rootScope)
        .add({
            combo: 'd+1',
            description: 'Open dashboard demonstration.',
            callback: function () {
                $location.path("dashboard/raspi1");
            }
        })
        .add({
            combo: 'd+e',
            description: 'Open menu settings.',
            callback: function () {
                $location.path("settings");
            }
        })
        .add({
            combo: 'n',
            description: 'Open the navigation bar.',
            callback: function () {
                $rootScope.toggleMenu();
            }
        });
});
