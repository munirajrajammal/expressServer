studentService=require('../services/studentserves');
router = require('express').Router();



module.exports = router;

router.get('/', verificationData)

function verificationData(req,res,next){
  console.log('inside the active token controller ===================== ')
  res.status(200).send({msg:'welcome this page'})
}
