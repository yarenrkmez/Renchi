var DataBaseKullanici=require('../classes/kullaniciDataBase');
var musteriDataBase=require('../classes/mekanDataBase');
module.exports.index=function(req,res){
    //register sayfasını getir.
    
    res.render('mekanProfil',{error:undefined});
}
module.exports.indexPost=function(req,res){
    if(req.body.puan&&req.body.mekanKoduP){ 
        var pKazan=new DataBaseKullanici('','',req.session.User.username,'','');
        pKazan.puanKazan(req,res);
        
    }
    else{
        console.log("kod girilmedi")
    }
    
}