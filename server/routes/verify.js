var User = require('../models/VerifyUser');
var codice_fiscale =require('codice-fiscale');
var path =require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
exports.checkCodice = (req,res,next) =>{ 
    console.log(req.body);
  var nome = req.body.firstname;
  var cognome = req.body.lastname;
  var sesso = req.body.sesso;
  var dob = req.body.dob;
  var dates = dob;              
  var dataNascitaMM = dates[0]+dates[1];
  var dataNascitaGG = dates[2]+dates[3];
  var dataNascitaYY = dates[4]+dates[5]+dates[6]+dates[7];
  var luogoNascita = req.body.location;
   User.find({phone:req.body.phone},function(err,user){ 
       if(user.length==0)
   {
  var verifyuser=codice_fiscale.calcola(nome, cognome, sesso, dataNascitaGG, dataNascitaMM, dataNascitaYY, luogoNascita, [provinciaNascita=null]);

  if(verifyuser===req.body.codice)
  {
    var params = req.body;
      var user = new User({
        firstname: params.firstname,
        lastname:params.lastname,
        email: params.emails,
        phone: params.phone,
        dob:params.dob,
        location:params.location,
        codice:params.codice,
        sesso:params.sesso,
        countryCode: "91",
        credit:"50000"
        
    });
    if(user.length==0){
       
        
        
        
        
        res.send({ermsg:"The user does not exist"});
       res.end();
    }
    else{
       res.send({msg:"Confirm your ID",id: user._id});
       res.end();
    }
            user.sendAuthyToken(function(err) {
                if (err) {
                    res.send({ermsg: 'There was a problem sending '
                        + 'your token - sorry :('+err});
                    res.end();
                }
            });
        
    
      }
      else{
       res.send({ermsg:"Fiscal Code doesn't match"});
          res.end();
       }
 }
    else
 {
     res.send({ermsg:" The phone number already exists."});
     res.end();
 }
   
 });
};
exports.create = function(request, response) {
         User.find({phone:request.body.phone},function(err,user){ 
        if(user.length==0){
            response.send({ermsg:"User not found. Signup."});
            response.end();
        }
     
   
      else {
          
            var users = new User;
           var authID= "";
           var intCount = user.length;
              if (intCount > 0) {
                var strJson = "";
                for (var i = 0; i < intCount;) {
                  strJson=user[i]._id
                  authID=user[i].authyId;
                  verified=user[i].verified;
                  i = i + 1;
                }
              }
                    if(verified==true){
                         response.send({msg:"Confirm your ID",id:strJson});
                        response.end();
            // show success page
                 users.sendAuthyLoginToken(authID,function(err) {
                if (err) {
                    response.send({ermsg:"i think there's some problem.."});
                    response.end();
                }

                // Send to token verification page
               
            });
        }
        else{
            User.remove({_id:strJson},function(err){if(err){console.log("something is wrong."+strJson)}});
            response.send({ermsg:"The user is not verified. Please Signup Again."});
            response.end();
        }  
       
        }
     });
};

// Handle submission of verification token
exports.verify = function(request, response) {
    var user;
    

    // Load user model
    User.findById(request.params.id, function(err, doc) {
        if (err || doc.length==0) {
            response.send({ermsg:'User not found for this ID.'});
            response.end();
        }

        // If we find the user, let's validate the token they entered
        user = doc;
        id=request.params.id;
        user.verifyAuthyToken(request.body.code, postVerify);
    });

    // Handle verification response
    function postVerify(err) {
        if (err) {
            console.log(err);
            response.send({ermsg:'The token you entered was invalid - please retry.'});
            response.end();
        }

        // If the token was valid, flip the bit to validate the user account
        user.verified = true;
       
       
        user.save(postSave);
        
    }

    // after we save the user, handle sending a confirmation
    function postSave(err) {
        if (err) {
            response.send({ermsg:'There was a problem validating your account '
                + '- please enter your token again.'});
            response.end();
        }

        // Send confirmation text message
        var message = 'You did it! Signup complete :)';
        user.sendMessage(message, function(err) {
        response.send({msg:"successfull!",_id:id,fname:user.firstname,lname:user.lastname});
            response.end();
    });
    }

    // respond with an error
    function die(message) {
        response.send({ermsg:"The user is not available. Kindly signup."});
        response.end();
    }
};

exports.sendMails = (req,res,next) =>{
  var transporter = nodemailer.createTransport(smtpTransport({
   host: 'smtp.gmail.com',
   port: 25,
   auth: {
       user: 'amrita.rvinfoservices@gmail.com',
       pass: 'blasphemy123'
   }
}));
  var sendFrom = req.body.email;       
  var message = req.body.message;
  var subject = req.body.problem;
  transporter.sendMail({
   from: sendFrom ,
   to: 'amrita.rvinfoservices@gmail.com',
   subject: subject,
   text: message
});
res.send({msg:"Thank you for the query."});
    res.end();
};
exports.sendInfo=(req,res,next) =>{
     var data;
User.find({_id:req.params.id},function(err,user){ 
        if(err||!user){
            console.log("something is wrong");
            res.send({msg:"The user is not available."})
            res.end();
            return next();
        }
     
   
      else {
          var authID= "";
           var fname ="";
           var lname ="";
           var phone ="";
           var countryCode="";
           var loc = "";
           var codice="";
           var dob="";
           var emails="";
           var sess="";
           var strJson = "";
           var credit="";
           var productcost=[];
           var productname=[];
           var productdate=[];
          
           var intCount = user.length;
              if (intCount > 0) {
                
                for (var i = 0; i < intCount;) {
                  strJson=user[i]._id
                  authID=user[i].authyId;
                  sess=user[i].sesso;
                  phone=user[i].phone;
                  emails=user[i].email;
                  countryCode=user[i].countryCode;
                  dob=user[i].dob;
                  loc=user[i].location;
                  fname=user[i].firstname;
                  lname=user[i].lastname;
                  credit=user[i].credit;
                  var productdet = user[i].product;
                  i = i + 1;
                }
               for(var i=0;i<productdet.length;i++)
               {
                    productcost[i]=(productdet[i].pcost);
                    productname[i]=(productdet[i].pname);
                    productdate[i]=(productdet[i].pdate);

               }
           product=[{pname:productname,pcost:productcost,pdate:productdate}];
        data ={id:strJson,sesso:sess,mobile:phone,email:emails,cCode:countryCode,birthdate:dob,
                 location:loc, firstname:fname, lastname:lname,credits:credit,product};                 
            sendInfos(data);
              }              
        }
       
     });
     function sendInfos(data){
         res.send(data);
         res.end();
         
     }
};
exports.updateInfo=(req,res,next) =>{
    var id= req.params.id;
    var param=req.body;
    var fname=param.fname;
    var lname=param.lname;
    var sesso = param.sesso;
    var dob= param.dob;
    var loc=param.loc;
    var phones=param.mob;
    var emails=param.emails;
    if(sesso=="Female")
    {
        sesso="F";
    }
    else
        sesso="M";
User.update({_id:id},{firstname:fname,lastname:lname,sesso:sesso,email:emails,dob:dob,phone:phones,location:loc},function(err,user){
    if(err||!user){
        console.log("something went wrong");
    }
    else{
        console.log(user);
        res.send({msg:"Your info is updated "});
        res.end();
    }
})
};
exports.loan = function(request, response) {
    
    var datetoday = new Date;
      var t= request.body.time;
      var loan = request.body.loan;
      var products= request.body.product;
      var si;
      var message;
       
     User.find({phone:request.body.phone},function(err,user){ 
        if(err||!user){
            return next();
        }
     
   
      else {
            var users = new User;
           var authID= "";
           var intCount = user.length;
              if (intCount > 0) {
                var strJson = "";
                for (var i = 0; i < intCount;) {
                 strJson=user[i]._id;
                   authID=user[i].authyId;
                  credits=user[i].credit;
                   var cr=parseInt(credits,10);
                   if(loan<cr){
                         response.send({msg:"verify to continue",id:strJson});
                          response.end();
                 users.sendAuthyLoginToken(authID,function(err) {
                if (err) {
                    console.log("i think there's some problem..")
                    console.log('errors', 'There was a problem sending '
                        + 'your token - sorry :(');
                }

               
            });
              User.update({_id:strJson},{ $push: { product:{pcost:loan,pname:products,pdate:datetoday} }},function(err,user){
                if(err||!user){
               console.log("something went wrong");
               }
              })}
            
                
                  i = i + 1;
                }
                if(products!=null && loan!=null)
               {
              
                   
                   if(loan>cr)
                   {
                       message="You can't purchase this. Your balance is low."

                   response.send({ermsg:message});
                       response.end();

                   }
                   else{
                        
                         var installment = (100*loan)/((100*t)+(t*(t-1)*10));
                       calculateLoan(cr,installment,t);
                       function calculateLoan(cr,installment,t){
                     
                    cr = cr-installment;
                    t=t-1;
                  User.update({_id:strJson},{credit:cr},function(err,user){
                     if(err||!user){
                   console.log("something went wrong");
                        }
        
                    });
        
                    
                      setTimeout(function(){
                          if(t!=0){
                              console.log("I am in here");
                      if((datetoday<new Date()) && (new Date()-datetoday==0)){
                      calculateLoan(cr,loan,t); 
                      datetoday=new Date();
                    }}
                       else{
                           clearTimeout();
                       }},200);
                       }
                           }    
                            
            // verification token
         
                                console.log(strJson);
              }
              }
          
        }
     });
   
};
 exports.wallet = function(request, response) {
     response.send({msg:"This works"});
     response.end();
 };
