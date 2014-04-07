$(function(){
	var doc = window.document;

    window.is3rd_cookie = function (result) {
        result = result + '';
        if (result == 'true') {
            console.log('Third party cookies enabled');
        } else{
          console.log('Third party cookies disabled');
        }
    };
    var loadJS = function (url, successCallback, errorCallback, removeAfter) {
        var clean_up,
            script = doc.createElement('script'),
            head = doc.head || doc.getElementsByTagName('head')[0];

        if (head) {
            clean_up = function () {
                if (removeAfter && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };

            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        clean_up();
                        if (successCallback) {
                            successCallback();
                        }
                    }
                };
            } else {
                script.onload = function () {
                    script.onload = null;
                    clean_up();
                    if (successCallback) {
                        successCallback();
                    }
                };
            }

            script.onerror = function () {
                clean_up();
                if (errorCallback) {
                    errorCallback();
                }
            };

            script.async = 'async';
            script.src = url;

            head.insertBefore(script, head.firstChild);
        }
    };
    loadJS('http://grantmocktrial.com/cookieTest/test1.php');
});
