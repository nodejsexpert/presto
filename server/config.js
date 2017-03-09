var cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3030;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
// 
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = "ACac70c0848041b8ff1a6feb565b63090";
cfg.authToken = "a20808b0c14acbaab01dbc450e6c833c";

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioNumber = "+919557641333";

// Your Authy production key - this can be found on the dashboard for your 
// Authy application
cfg.authyKey = "9wdK9P1XtLQntSKvpPQhJwFKMclPfD5C";

// MongoDB connection string - MONGO_URL is for local dev,
// MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
// MONGO_PORT_27017_TCP_ADDR is for connecting to the Mongo container
// when using docker-compose
cfg.mongoUrl = process.env.MONGOLAB_URI || process.env.MONGO_URL || process.env.MONGO_PORT_27017_TCP_ADDR;

// Export configuration object
module.exports = cfg;