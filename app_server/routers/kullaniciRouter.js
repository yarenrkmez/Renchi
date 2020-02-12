var express=require('express');
var router=express.Router();

var ctrlKullanici=require('../controllers/kullaniciControl');

router.get('/',ctrlKullanici.index);

module.exports=router;
