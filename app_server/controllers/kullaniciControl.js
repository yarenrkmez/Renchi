var DataBaseKullanici=require('../classes/kullaniciDataBase');
var uniqid=require('uniqid');
module.exports.index=function(req,res){
    //register sayfasını getir.
    res.render('kullanici',{user:req.session.User});
}