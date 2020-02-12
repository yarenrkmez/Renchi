var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//CLASS JS METODUNDA.
var KodKontrol = new Schema({
    username:{type:String},
    kullanilanKod:[{type:String}]
},{collection:'kodkontrol'});

var kodkontrol = mongoose.model('kodkontrol', KodKontrol);

module.exports = kodkontrol;