var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect('mongodb://localhost:27017/prestonew');
// Create authenticated Authy and Twilio API clients
var authy = require('authy')(config.authyKey);
var twilioClient = require('twilio')(config.accountSid, config.authToken);

// Used to generate password hash
var SALT_WORK_FACTOR = 10;

// Define user model schema----Haven't added all fields to the database yet.
var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
     lastname: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    codice: {
        type: String,
        required: true
    },
    sesso: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
     authyId: String,
 
    email: {
        type: String,
        required: true,
        unique: true
    },
    credit: {
     type:String,
     default:"0" 
    },
    product: { 
      type:Array, 
      default:[{pname:"productname",pcost:"cost"}]
    }
});

// Send a verification token to this user
UserSchema.methods.sendAuthyToken = function(cb) {
    var self = this;

    if (!self.authyId) {
        // Register this user if it's a new user
        authy.register_user(self.email, self.phone, self.countryCode, 
            function(err, response) {
                
            if (err || !response.user) return cb.call(self, err);
            self.authyId = response.user.id;
            self.save(function(err, doc) {
                if (err || !doc) return cb.call(self, err);
                self = doc;
                sendToken();
            });
        });
    } else {
        // Otherwise send token to a known user
        sendToken();
    }

    // With a valid Authy ID, send the 2FA token for this user
    function sendToken() {
        authy.request_sms(self.authyId, true, function(err, response) {
            cb.call(self, err);
        });
    }
};
//Send a verification token for Login
UserSchema.methods.sendAuthyLoginToken =function(authID,cb){
    var self = this;
    sendToken();
    function sendToken() {
        authy.request_sms(authID,true, function(err, response) {
            cb.call(self, err);
        });
    }
};

// Test a 2FA token
UserSchema.methods.verifyAuthyToken = function(otp, cb) {
    var self = this;
    authy.verify(self.authyId, otp, function(err, response) {
        cb.call(self, err, response);
    });
};

// Send a text message via twilio to this user
UserSchema.methods.sendMessage = function(message, cb) {
    var self = this;
    twilioClient.sendMessage({
        to: self.countryCode+self.phone,
        from: config.twilioNumber,
        body: message
    }, function(err, response) {
        cb.call(self, err);
    });
};

// Export user model
module.exports = mongoose.model('VerifyUser', UserSchema);
