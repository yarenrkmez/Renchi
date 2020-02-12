var musteriDataBase= require('../classes/mekanDataBase');

module.exports.index=function(req,res){
    res.render('isletmeSahibi',{mekan:req.session.Mekan,msg:undefined});
}
module.exports.indexPost=function(req,res){
    var guncelle=new musteriDataBase('','',req.session.Mekan.username,'',req.body.resimUrl1,req.body.resimUrl2,req.body.resimUrl3,'');
    console.log(req.body.mekanKoduG)
    if(req.body.mekanKoduG){
        guncelle.kodGuncelleme(req,res);
    }
    else if(req.body.resimUrl1||req.body.resimUrl2||req.body.resimUrl3){
        guncelle.resimGuncelleme(req,res);
    }
    else if(req.body.kullaniciEmail&&req.body.kullanilacakPuan){
        guncelle.kullaniciPuanDusur(req,res);
    }
    else{
        var msg='veri girişi yapılmadı'
        res.render('isletmeSahibi',{mekan:req.session.Mekan,msg})
    }
}