var express=require('express');
var router=express.Router();

var ctrlIsletmeSahibi = require('../controllers/isletmeSahibiControl');

router.get('/',ctrlIsletmeSahibi.index);
router.post('/',ctrlIsletmeSahibi.indexPost);

module.exports=router;