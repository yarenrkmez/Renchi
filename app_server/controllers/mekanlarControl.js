var musteriDataBase= require('../classes/mekanDataBase');
var DataBaseKullanici=require('../classes/kullaniciDataBase');

module.exports.index=function(req,res){
    //register sayfasını getir.
    res.render('mekanlar',{error:undefined});
}

module.exports.indexPost=function(req,res){
    var aranan = req.body.mekanAdi
    if(aranan){
        var arama = new DataBaseKullanici();
        arama.mekanAra(req,res);
    }
    if(req.body.mekanYonlen){
        var yonlen = new DataBaseKullanici();
        yonlen.yonleMekan(req,res);
    }
    /*else{
        var mesaj='Aranan bulunamadı'
        res.render('mekanlar',{
              error:mesaj
        });
    }*/
}