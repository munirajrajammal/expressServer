studentService=require('../services/studentserves');
router = require('express').Router();



module.exports = router;

router.post('/', activedToken)


async function activedToken(req,res,next){
  console.log('inside the active token controller')
  console.log('the active data inside token controller........', req.body)
  studentService.ActiveLoginEmail(req.body).then((result)=>{
      console.log('the back end responce of activated successs message ........', result)
      console.log(result)
      res.status(200).send({data:result})
  }).catch((err)=>{
      console.log('error is backend:::::', err)
      res.status(200).send({data:err})
    })
}
