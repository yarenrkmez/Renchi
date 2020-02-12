var Kullanici=require('../models/kullaniciSchema');
var DataBaseKullanici=require('../classes/kullaniciDataBase');
var Db=require('../models/kullaniciSchema');
var musteriDataBase= require('../classes/mekanDataBase');
module.exports.index=function(req,res){
    if(req.session.User){
        res.render('kullanici',{user:req.session.User})
    }
    else{
        res.render('index',{
            error:undefined
        });
    }
   
}
module.exports.indexPost=function(req,res){
   if(req.body.emailk&&req.body.passwordk){
         var loginK=new DataBaseKullanici('','','',req.body.emailk,req.body.passwordk);
         loginK.login_filter(req,res);
   }
   else if(req.body.mekanemail&&req.body.mekanpassword){
       console.log(req.body.mekanemail+" "+req.body.mekanpassword);
       var loginM=new musteriDataBase('','','',req.body.mekanemail,'','','',req.body.mekanpassword);
       loginM.loginMekan(req,res);
   }
   else{ 
       var mesaj='hatali giris.'
        res.redirect('index',{
              error:mesaj
        });
   }
}

