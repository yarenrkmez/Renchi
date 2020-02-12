var express=require('express');
var router=express.Router();

var ctrlMekanProfil=require('../controllers/mekanProfilControl');

router.get('/',ctrlMekanProfil.index);
router.post('/',ctrlMekanProfil.indexPost);


module.exports=router;
