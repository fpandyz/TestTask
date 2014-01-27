var ServerDate = (function () {
    var requestTime,
    responseTime,
    best = null,
    isAsyncRequest = false;

    function initialize() {
        requestServerTime();

        if (isOptimalPrecision() == false) {
            isAsyncRequest = true;

            repeatRequest();
        }
    }

    return {
        getServerTime: function () {
            if (best == null) {
                initialize();
            }

            return new Date(clientUtcTime() + best.offset);
        }
    };
    
    function requestServerTime() {
        $.ajax({
            url: "/RealTime/CurrentServerTime",
            async: isAsyncRequest,
            beforeSend: function () {
                requestTime = clientUtcTime();
            },
            complete: function (data) {
                responseTime = clientUtcTime();
                processResponse(parseInt(data.responseText.substring(8, 21)));
            }
        });
    }

    function processResponse(serverNow) {
        var precision = (responseTime - requestTime) / 2;
        var offset = serverNow + precision - responseTime;
        var sample = { offset: offset, precision: precision };

        if (best === null)
            best = sample;

        if ((precision <= best.precision))
            best = sample;

        console.log("precision: " + sample.precision + ", offset: " + sample.offset + ", best precision: " + best.precision + ", best offset: " + best.offset);

        if (isAsyncRequest)
            if (isOptimalPrecision())
                clearTimeout();
            else
                repeatRequest();
    }

    function clientUtcTime() {
        return new Date().getTime();
    }

    function isOptimalPrecision() {
        return best.precision <= 100;
    }

    function repeatRequest() {
        setTimeout(requestServerTime, 5000);
    }
})();