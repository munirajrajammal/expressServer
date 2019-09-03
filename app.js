const express=require('express');
const cors = require('cors');
const mysql=require('mysql');
var jwt = require('jsonwebtoken');

const app=express();
const port=4000;

const db= mysql.createConnection(
    {
        
        host:'localhost',
        user: 'muni',
        password: 'password',
        database:'nuxtcrud'

    }
);
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('connected to database');
});

global.db= db;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/register',require('./controller/registerController'))
app.use('/activeToken',require('./controller/activeController'))
app.use('/loginFormData',require('./controller/loginController'))
app.use('/forgetPassForm',require('./controller/forgotPassController'))
app.use('/rePasswordData',require('./controller/rePasswordDataController'))
app.use(auth)
app.use('/verificationData',require('./controller/verificationController'))

function auth (req, res , next) {
    console.log('the req -----------========', req.headers.authorization)
    jwt.verify(req.headers.authorization, 'muniraj', (err) => {
      if(err){
        console.log('the error data ............', err)
        res.status(401).send({meg:'not allow this page'})
      } else {
        next();
      }
    })
}        

app.listen(port,() => console.log('Server Started ' + port+' !'))