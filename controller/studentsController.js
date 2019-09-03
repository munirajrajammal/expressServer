studentService=require('../services/studentserves');
router = require('express').Router();

module.exports = router;
router.get('/', getAllstudents);
router.post('/', Insertstudents)
router.get('/verifyEmail/:registertoken', ActivedloginEmail)

async function getAllstudents(req, res, next) {
    studentService.getAllstudents().then((result)=>{
        console.log(result)
        res.status(200).send({data:result})
    })
}

async function getstudentsByid(req,res,next){
    studentService.getstudentsByid(req.params['id']).then((result)=>{
        console.log(result)
        res.status(200).send({data:result})
    })
}


function Insertstudents(req, res, next) {
    console.log('inside insert students')
    var postdata= req.body
    studentService.insertAllstudents(postdata).then((result)=>{
        console.log(result)
        res.status(200).send({data:result})   
    }).catch((err)=>{
    console.log('error is backend:::::', err)
    res.status(200).send({data:err})
    })
}

function Updatestudents(req, res, next) {
    var postdata= req.body
    studentService.uppdateAllstudents(postdata,req.params['id']).then((result)=>{
        res.status(200).send({data:result})
    })
}

function Deletestudents(req, res, next) {
    studentService.deleteAllstudents(req.params['id']).then((result)=>{
        console.log(result)
        res.status(200).send({data:result})
    })
}





function ActivedloginEmail(req , res , next) {
    studentService.ActiveLoginEmail(req.params['verifyEmail/:registertoken']).then((result)=>{
        res.status(200).send({data:result})
    })
}