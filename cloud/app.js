// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var user = require("cloud/route/user");
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');

var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'jade');    // Set the template engine

app.use(express.bodyParser());    // Middleware for reading request body
app.use(parseExpressHttpsRedirect());
app.use(express.cookieParser('SIGNING_SECRET'));
app.use(parseExpressCookieSession({cookie: {maxAge: 3600000}}));

app.get('/', user.getFBLogin);
app.get("/home",user.home);
app.get("/logout", user.logout);
app.post("/fblogin", user.fbLogin);

app.listen();
