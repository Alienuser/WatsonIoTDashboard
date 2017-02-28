(function () {

    app.directive('widgetChatbot', ['Chat', function (Chat) {

        return {
            templateUrl: 'templates/directive/directiveChatBot.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {

                $scope.messages = [
                    {
                        person: 1,
                        text: "Das schreibt Watson."
                    },
                    {
                        person: 2,
                        text: "das schreibst du!"
                    }];
            }
        };
    }]);

})();