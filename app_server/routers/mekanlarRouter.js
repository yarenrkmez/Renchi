var express=require('express');
var router=express.Router();

var ctrlMekan=require('../controllers/mekanlarControl');

router.get('/',ctrlMekan.index);
router.post('/',ctrlMekan.indexPost);
module.exports=router;
