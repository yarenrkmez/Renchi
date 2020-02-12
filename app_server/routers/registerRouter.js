var express=require('express');
var router=express.Router();

var ctrlRegister=require('../controllers/registerControl');

router.get('/',ctrlRegister.index);
router.post('/',ctrlRegister.indexPost);

module.exports=router;




