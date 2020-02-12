var musteriDataBase=require('../classes/mekanDataBase')

module.exports.index=function(req,res){
    //register sayfasını getir.
    res.render('musteriKayit');
}
module.exports.indexPost=function(req,res){
    console.log(req.body);
    const {isletmeismi,isletmeadres,usernameM,emailM,image1,image2,image3,passwordM}=req.body;
    if(!isletmeismi||!isletmeadres||!usernameM||!emailM||!image1||!image2||!image3||!passwordM){
        res.render('musteriKayit');
    }
    else{
        var mekanKayit=new musteriDataBase(isletmeismi,isletmeadres,usernameM,emailM,image1,image2,image3,passwordM);
        mekanKayit.mekanKaydet();
        res.render('index',{error:undefined});
    }
}