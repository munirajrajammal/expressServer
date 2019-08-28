studentService=require('../services/studentserves');
router = require('express').Router();



module.exports = router;



router.post('/', loginRegister)



function loginRegister(req, res, next) {
  console.log('inside insert login register=============')
  var postdata= req.body
  console.log('the back end input data of servicess==============', postdata)
  studentService.loginRegisterData(postdata).then((result)=>{
    console.log('the back end result of success ====================', result)
      console.log(result)
      res.status(200).send({data:result})   
  }).catch((err)=>{
  console.log('error is backend:::::************', err)
  res.status(200).send({data: err})
  })
}