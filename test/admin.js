var User = require('../models/VerifyUser');
var Admin =require('../models/Admin');
var UserWallet = require('../models/UserWallet');
var codice_fiscale =require('codice-fiscale');
var path =require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport'); 
var multer=require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, __dirname+'/uploads/')
        } });
var upload = multer({ //multer settings
storage: storage }).single('file');
exports.updateSlider= function(req,res,next){
    console.log(req.files.file);
 upload(req.files.file,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
};

exports.deleteUsers = function(req,res,next){
    var id = req.body.id;
    var users = new User;
    User.remove({_id:id},function(err){
       if(err){
           res.send({ermsg:"An error occurred while deleting"});
           res.end();
       }
       else{
           res.send({msg:"User Deleted"});
           res.end();
       }
    });
};
exports.updateUsers = function(req,res,next){exports.adminLogin = function(req,res,next){
    var email = req.body.email;
    var pass = req.body.password;
    Admin.find({email:req.body.email},function(err,admin){
            if(admin.length==0){
                res.send({ermsg:"The email you entered does not belong to any account."});
                res.end();
            }
            else{
                for(var i=0;i<admin.length;i++){
                    var ema = admin[i].email;
                    var passw = admin[i].password;
                }
                if(passw==pass){
                    res.send({msg:"You are signed in."});
                    res.end();
                }
            }
    })

    
    
};
var id = req.body.id;
var fname = req.body.firstname;
var lname = req.body.lastname;
var sesso = req.body.sesso;
var phone = req.body.phone;
var emails = req.body.email;
var users = new User;
User.update({_id:id},{firstname:fname,lastname:lname,sesso:sesso,phone:phone,email:emails},function(err){
    if(err){
        res.send({ermsg:"An error occurred while updating"});
        res.end();
    }
    else{
        res.send({msg:"User Updated"});
        res.end();
    }
});
};
exports.getUsers= function(req,res,next){
var user = new User;
User.find()

};
exports.adminLogin = function(req,res,next){
    var email = req.body.email;
    var pass = req.body.password;
    Admin.find({email:req.body.email},function(err,admin){
            if(admin.length==0){
                res.send({ermsg:"The email you entered does not belong to any account."});
                res.end();
            }
            else{
                for(var i=0;i<admin.length;i++){
                    var ema = admin[i].email;
                    var passw = admin[i].password;
                }
                if(passw==pass){
                    res.send({msg:"You are signed in."});
                    res.end();
                }
            }
    })

    
    
};
exports.adminSignup = function(req,res,next){
var fullname =req.body.fullname;
var email = req.body.email;
var pass = req.body.password;
console.log(fullname);
console.log("In here");
Admin.find({email:req.body.email},function(err,admin){
    if(admin.length!=0||err){
        res.send({ermsg:"This email is already registered."});
        res.end();
    }
    else{
           var admin = new Admin({
        fullname:fullname,
        email:email,
        password: pass
       
    },function(err){
        if(err){
            console.log(err);
        }

    });
    res.end();
    }
})
};
