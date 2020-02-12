var mongoose=require('mongoose');

var url='mongodb://localhost:27017/renchi'

mongoose.connect(url,{useFindAndModify:false},(error)=>{
    if(!error){
        console.log("mongoDb baglandi");
    }
})


