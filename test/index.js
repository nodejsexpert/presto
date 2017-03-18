var express = require('express');
var path = require('path');
var verifyController = require('./verify');
var adminController = require('./admin');
var router = express.Router();
var multiparty = require('connect-multiparty');
multiparts = multiparty();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
 router.post('/verify/:id/users',verifyController.verify);
 router.post('/slider',multiparts, adminController.updateSlider); 
 //router.post('/users/:id/resend',verifyController.resend);
 router.post('/query', verifyController.sendMails);
 router.post('/user/:id/query', verifyController.sendMails);

router.post('/signup', verifyController.checkCodice);
router.get('/signup', verifyController.checkCodice);
router.post('/login',verifyController.create);
router.post('/loan',verifyController.loan);
//router.get('/users/:id/user',verifyController.showUser);
router.get('/getinfo/:id/users',verifyController.sendInfo);
router.post('/user/:id/update',verifyController.updateInfo);
router.post('/user/:id/wallet',verifyController.wallet);
router.post('/admin/login', adminController.adminLogin);
router.post('/admin/signup',adminController.adminSignup);

module.exports = router;
