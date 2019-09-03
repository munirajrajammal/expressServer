studentService=require('../services/studentserves');
router = require('express').Router();



module.exports = router;

router.post('/', rePassUpdate)


async function rePassUpdate(req,res,next){
  console.log('the active data inside re password token controller........', req.body)
  studentService.ActiveRePassword(req.body).then((result)=>{
      console.log('the back end responce of successs message ........', result)
      console.log(result)
      res.status(200).send({data:result})
  }).catch((err)=>{
      console.log('error is backend:::::', err)
      res.status(200).send({data:err})
    })
}
