var DataBaseKullanici=require('../classes/kullaniciDataBase');

module.exports.index=function(req,res){
    //register sayfasını getir.
    
    res.render('register',{error:undefined});
}
module.exports.indexPost=function(req,res){
    console.log(req.body);
    const {name,surname,username,email,password}=req.body;
    //|| veya && ve
    if(!name||!surname||!username||!email||!password){
         res.render('register',{error:"boşkuklar dolmadı"});
    }
    else{
        //nesne olusturma.
        var DataSave=new DataBaseKullanici(name,surname,username,email,password);
        DataSave.kaydet(req,res);
        
    }
}



