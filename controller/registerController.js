studentService=require('../services/studentserves');
router = require('express').Router();



module.exports = router;



router.post('/', Insertstudents)



function Insertstudents(req, res, next) {
  console.log('inside insert register')
  var postdata= req.body
  studentService.insertAllstudents(postdata).then((result)=>{
      console.log(result)
      res.status(200).send({data:result})   
  }).catch((err)=>{
  console.log('error is backend:::::*********************', err)
  res.status(200).send({data:err})
  })
}