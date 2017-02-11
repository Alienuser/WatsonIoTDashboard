app.factory('Socket', ['$q', '$rootScope', function ($q, $rootScope) {

    // We return this object to anything injecting our service
    var Socket = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    var ws = false;
    // Save if the closing was an intention
    var intention = false;

    Socket.connect = function (dashboard) {
        wsConnect(dashboard);
    };

    Socket.close = function () {
        if (ws) {
            intention = true;
            ws.close();
        }
    };

    function wsConnect(dashboard) {
        if (localStorage.getItem("url_nodered_" + dashboard) !== null) {
            ws = new WebSocket(localStorage.getItem("url_nodered_" + dashboard));
            ws.onmessage = function (message) {
                listener(JSON.parse(message.data));
            };
            ws.onopen = function () {
            };
            ws.onclose = function () {
                if (!intention) {
                    setTimeout(wsConnect(dashboard), 1000);
                } else {
                    intention = false;
                }
            };
        }
    }

    function sendRequest(request) {
        var defer = $q.defer();
        var callbackId = getCallbackId();
        callbacks[callbackId] = {
            time: new Date(),
            cb: defer
        };
        request.callback_id = callbackId;
        console.log('Sending request', request);
        ws.send(JSON.stringify(request));
        return defer.promise;
    }

    function listener(data) {
        var messageObj = data.d;
        //console.log('event:' + messageObj.device + '_' + messageObj.sensor, messageObj);
        $rootScope.$broadcast('event:' + messageObj.device + '_' + messageObj.sensor, messageObj);

        // If an object exists with callback_id in our callbacks object, resolve it
        if (callbacks.hasOwnProperty(messageObj.callback_id)) {
            console.log(callbacks[messageObj.callback_id]);
            $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
            delete callbacks[messageObj.callbackID];
        }
    }

    // This creates a new callback ID for a request
    function getCallbackId() {
        currentCallbackId += 1;
        if (currentCallbackId > 10000) {
            currentCallbackId = 0;
        }
        return currentCallbackId;
    }

    // Define a "getter" for getting customer data
    Socket.getCustomers = function () {
        var request = {
            type: "get_customers"
        };
        // Storing in a variable for clarity on what sendRequest returns
        var promise = sendRequest(request);
        return promise;
    };

    return Socket;
}]);