studentService=require('../services/studentserves');
router = require('express').Router();



module.exports = router;

router.post('/', forPassActive)


async function forPassActive(req,res,next){
  console.log('the active data inside fprgot password controller........', req.body)
  studentService.forgotPassWord(req.body).then((result)=>{
      console.log('the back end responce of password activated successs message ........', result)
      console.log(result)
      res.status(200).send({data:result})
  }).catch((err)=>{
      console.log('error is backend:::::', err)
      res.status(200).send({data:err})
    })
}
