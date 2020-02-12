var express=require('express');
var router=express.Router();

var ctrlIndex=require('../controllers/indexControl');

router.get('/',ctrlIndex.index);
router.post('/',ctrlIndex.indexPost);


module.exports=router;
