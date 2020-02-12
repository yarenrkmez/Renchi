var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var isletmeSahibiSchema = new Schema({
    name:{type:String,required:true},
    adres:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    pic1:{type:String,required:true},
    pic2:{type:String,required:true},
    pic3:{type:String,required:true},
    password:{type:String,required:true},
    puan:{type:Number},
    mekanKodu:{type:String},
    puanVerenSayisi:{type:Number}
},{collection:'mekanlar'});

var isletmeSahibi= mongoose.model('İsletmeSahibi',isletmeSahibiSchema);

module.exports=isletmeSahibi;