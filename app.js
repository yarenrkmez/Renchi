var express=require('express');
var app=express();
var path = require('path');
var bodyparser=require('body-parser');
var dbConnect =require('./app_server/models/dbConnect');
var mongoose =require('mongoose');
const session=require('express-session');
var uniqid=require('uniqid');

//görüntü motoru.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app_server/views'));

//json veri olarak çalışıklcak;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use( express.static( "public" ) );
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:uniqid(),
    resave:false,
    saveUninitialized:true,
}))
var routerRegister=require('./app_server/routers/registerRouter');
app.use('/register',routerRegister);

var routerMRegister=require('./app_server/routers//musteriKayitRouter');
app.use('/musteriKayit',routerMRegister);

var routerMekan=require('./app_server/routers/mekanlarRouter');
app.use('/mekanlar',routerMekan);

var routerKullanici=require('./app_server/routers/kullaniciRouter');
app.use('/kullanici',routerKullanici);

var routerIndex=require('./app_server/routers/indexRouter');
app.use('/index',routerIndex);

var routerIsletmeSahibi=require('./app_server/routers/isletmeSahibiRouter');
app.use('/isletmeSahibi',routerIsletmeSahibi);

var routerLogOut=require('./app_server/routers/logOutRouter');
app.use('/logout',routerLogOut);

var routerMekanProfil=require('./app_server/routers/mekanProfilRouter');
app.use('/mekanProfil',routerMekanProfil);

app.listen(8080);