$(document).ready(function () {
    Parse.initialize("qZL2rDoLhwR2yKgCJDrYi87fPvCCzmxoh1ce5jKS", "vqhv3A3InIcU3apaaBCJLpYsmJ8eG4VARTzlqVjo");
    window.fbAsyncInit = function () {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId: '960958013923938', // Facebook App ID
            cookie: true,
            xfbml: true,  // initialize Facebook social plugins on the page
            version: 'v1.0' // point to the latest Facebook Graph API version
        });
    };


    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

function Login_Signup() {
    Parse.User.logOut();
    Parse.FacebookUtils.logIn(null, {
        success: function (user) {
            if (!user.existed()) {
                FB.api('/me', function (response) {
                    user.set("displayName", response.name);
                    user.save(null).then(function (success) {
                        postFBLogin(success, "User signed up and logged in through Facebook!");
                    }, function (error) {
                        console.log("Error in setting display name");
                    });
                });
            } else {
                postFBLogin(user, "User logged in through Facebook!");
            }
        },
        error: function (user, error) {
            console.log("Error details:" + JSON.stringify(error, null, "\t"));
            console.log("User details: " + JSON.stringify(user, null, "\t"));
            alert("User cancelled the Facebook login or did not fully authorize.");
        }
    });
}
function postFBLogin(user, message) {
    //console.log("Current user: " + JSON.stringify(user, null, "\t"));
    console.log("Message: " + message);

    var sessionToken = user._sessionToken;
    $.ajax({
        url: '/fblogin',
        type: 'post',
        data: {sessionToken: sessionToken},
        success: function (data) {
            console.log("Post success");
            window.location = "/home";
        },
        error: function (error) {
            console.log("post error: " + JSON.stringify(error, null, "\t"));
        }
    });
}

function fbLogout() {
    FB.logout(function () {
        console.log("logged out from facebook successfully.");
    });
}