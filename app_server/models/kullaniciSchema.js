var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//CLASS JS METODUNDA.
var KullaniciSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    puan:{type:Number},
    kod:{type:String}
},{collection:'kullanicilar'});

var kullanici = mongoose.model('Kullanici', KullaniciSchema);

module.exports = kullanici;