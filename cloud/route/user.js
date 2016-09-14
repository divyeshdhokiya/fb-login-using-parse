exports.getFBLogin = function (request, response) {
    response.render("login");
};

exports.logout = function (request, response) {
    Parse.User.logOut();
    console.log("User successfully logged out");
    response.redirect('/');
};

exports.home = function (request, response) {
    var currentSession = Parse.User.current();
    if (Parse.User.current())
    {
        Parse.User.current()
            .fetch()
            .then(fetchDataSuccess, fetchDataError);
    }else{
        response.redirect("/");
    }

    function fetchDataSuccess(user) {
        response.render("home", {currentSession: currentSession, user: user.get("displayName")});
    }

    function fetchDataError(error) {
        console.log("Error while fetching current user data:" + error);
    }
};

exports.fbLogin = function (request, response) {
    console.log("Inside fblogin function,user session token is:" + request.body.sessionToken);
    var sessionToken = request.body.sessionToken;

    Parse.User.become(sessionToken)
        .then(setCurrentUserSuccess, setCurrentUserError);

    function setCurrentUserSuccess(user) {
        console.log("current user session set successfully");
        response.redirect("/home");
    }

    function setCurrentUserError(error) {
        console.log("Error while setting current user by session token: " + JSON.stringify(error, null, "\t"));
    }
};
