var express=require('express');
var router=express.Router();

var ctrlLogOut=require('../controllers/logOutControl');

router.get('/',ctrlLogOut.index);

module.exports=router;
