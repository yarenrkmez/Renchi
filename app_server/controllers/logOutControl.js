module.exports.index=function(req,res){
   //session bloklarır
    req.session.destroy((err) =>{ 
        if(err){  
            console.log(err);  
        }  
        else{  
            res.redirect('index');  
        }  
    });
}

