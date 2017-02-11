(function () {

    app.controller('controllerSettings', function ($rootScope, $scope, $mdToast, DB) {

        // Disable spinner when page is loaded
        $rootScope.spinnerMode = false;

        // Set the values of the data
        $scope.nodered_0 = localStorage.getItem("url_nodered_0");
        $scope.restapi_0 = localStorage.getItem("url_rest_0");
        $scope.database_0 = localStorage.getItem("url_database_0");
        $scope.nodered_1 = localStorage.getItem("url_nodered_1");
        $scope.restapi_1 = localStorage.getItem("url_rest_1");
        $scope.database_1 = localStorage.getItem("url_database_1");
        $scope.nodered_2 = localStorage.getItem("url_nodered_2");
        $scope.restapi_2 = localStorage.getItem("url_rest_2");
        $scope.database_2 = localStorage.getItem("url_database_2");
        $scope.nodered_3 = localStorage.getItem("url_nodered_3");
        $scope.restapi_3 = localStorage.getItem("url_rest_3");
        $scope.database_3 = localStorage.getItem("url_database_3");
        $scope.nodered_4 = localStorage.getItem("url_nodered_4");
        $scope.restapi_4 = localStorage.getItem("url_rest_4");
        $scope.database_4 = localStorage.getItem("url_database_4");
        $scope.nodered_5 = localStorage.getItem("url_nodered_5");
        $scope.restapi_5 = localStorage.getItem("url_rest_5");
        $scope.database_5 = localStorage.getItem("url_database_5");


        $scope.updateUrls = function () {
            $rootScope.spinnerMode = true;

            // Save all fields
            DB.setUrls(localStorage.getItem('did_0'), localStorage.getItem('rev_0'), '0', $scope.nodered_0, $scope.restapi_0);
            DB.setUrls(localStorage.getItem('did_1'), localStorage.getItem('rev_1'), '1', $scope.nodered_1, $scope.restapi_1);
            DB.setUrls(localStorage.getItem('did_2'), localStorage.getItem('rev_2'), '2', $scope.nodered_2, $scope.restapi_2);
            DB.setUrls(localStorage.getItem('did_3'), localStorage.getItem('rev_3'), '3', $scope.nodered_3, $scope.restapi_3);
            DB.setUrls(localStorage.getItem('did_4'), localStorage.getItem('rev_4'), '4', $scope.nodered_4, $scope.restapi_4);
            DB.setUrls(localStorage.getItem('did_5'), localStorage.getItem('rev_5'), '5', $scope.nodered_5, $scope.restapi_5)
                .success(function () {
                    // Get the new data
                    DB.getUrls()
                        .success(function (response) {
                            localStorage.clear();
                            for (var i = 0; i < response.rows.length; i++) {
                                localStorage.setItem("did_" + response.rows[i].doc.grovepi, response.rows[i].id);
                                localStorage.setItem("rev_" + response.rows[i].doc.grovepi, response.rows[i].doc._rev);
                                localStorage.setItem("url_nodered_" + response.rows[i].doc.grovepi, response.rows[i].doc.url_nodered);
                                localStorage.setItem("url_rest_" + response.rows[i].doc.grovepi, response.rows[i].doc.url_rest);
                            }
                            $rootScope.spinnerMode = false;
                            $mdToast.showSimple("Daten wurden erfolgreich gespeichert.");
                        }).error(function () {
                        $mdToast.showSimple("Daten konnten nicht gespeichert werden.");
                        $rootScope.spinnerMode = false;
                    });
                });
        };

        // Delete the local storage
        $scope.deleteLocalStorage = function () {
            localStorage.clear();
            $mdToast.showSimple("Storage successfully cleared!");
        };

    });

})();