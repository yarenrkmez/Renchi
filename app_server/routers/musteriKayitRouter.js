var express=require('express');
var router=express.Router();

var ctrlMusteriKayit=require('../controllers/mekanKayitController');

router.get('/',ctrlMusteriKayit.index);
router.post('/',ctrlMusteriKayit.indexPost);

module.exports=router;