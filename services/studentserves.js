const bcrypt=require('bcrypt');
const uuidv1 = require('uuid/v1');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');


module.exports = {
  insertAllstudents,
  ActiveLoginEmail,
  loginRegisterData,
  forgotPassWord,
  ActiveRePassword,
  verificationService
};




function insertAllstudents(postdata) {
  console.log('db test',postdata);
      return new Promise((resolve, reject) => {
        let registertoken = uuidv1()
        console.log("register  token ........", registertoken)
        bcrypt.hash(postdata.password, 10, function(err, hash) {
          console.log("hash is the encrypt the password ",hash);
          query = 'insert into registerform1(name, email, password, actived_token)values("'
          + postdata.name + '","' + postdata.email + '","' 
          + hash + '","'+ registertoken +'")';          
          db.query(query, (err, result, field) => {
            if (err)
            reject("user already exist");
            resolve("Register Success")
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                    user: 'Enter your email',
                    pass: 'Enter your passWord'
              }
            })
            const mailOptions = {
              from: 'Enter your email',
              to: postdata.email,
              subject: 'Actived the mail link',
              text: 'Visit this http://localhost:3000/verifyEmail'+registertoken,
              html: '<a href="http://localhost:3000/verifyEmail/'+ registertoken +'"><H2>Click on this</H2></a>'
            }
            transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
            });            
          });
        })
      })
}




function ActiveLoginEmail (postdata) {
  console.log('the back end post data active token ......', postdata.activationToken)
  return new Promise((resolve, reject) => {
    query = 'select * from registerform1 where actived_token=' + "'"+postdata.activationToken+"'";
    db.query(query, (err, result, field) => {
      console.log('db test is activated ', result[0].isActived)
      if (result[0].isActived == 0) {
        let isActiveTrue =1;
        console.log('the data result of isactive true ', isActiveTrue)
        query = 'UPDATE registerform1 SET  isActived="' + isActiveTrue + '" WHERE actived_token=' + "'"+postdata.activationToken+"'";
          console.log(query)
          db.query(query, (err, result, field) => {
            console.log('db test if condition ', result);
            if (err)
              reject("activatedFailed");
            resolve("activatedSuccess")
          })
        console.log('contion after isActivation', result[0].isActived)
      } else {
          reject("Already activated")
      }
    })
  })
}





function loginRegisterData (postdata) {
  console.log('the back end data of login form ==========', postdata)
  return new Promise((resolve, reject) => {
    query = 'select * from registerform1 where email='+ "'"+postdata.email+"'";
    db.query(query, (err, result, field) => {
      console.log(' the completed data in database --------', result)
      if (result.length == 0) {
        console.log('============================')
        let loginFaildMessage = {success: 'Login faild'}
        reject(loginFaildMessage)
      } else {
        if (result[0].isActived == 1){
          console.log('///////////////////////////////////')
          bcrypt.compare(postdata.password, result[0].password, function(err, res) {
            console.log('the compare post data password----- >>>>> ', postdata.password)
            var token = jwt.sign({ foo: result[0].email }, 'muniraj');
            console.log(',,,,,,,,,,,,,,,,,,', token)
            let successMessageJwt = { success: 'Login Success' , JwtToken: token }
            console.log(';;;;;;;;;;;;;;;;;;;;;;;;', successMessageJwt)
            let loginFaildMessage = {success: 'Login Faild'}
            console.log(']]]]]]]]]]]]]]]]]]]', loginFaildMessage)
            if(res) 
              resolve(successMessageJwt)
            reject(loginFaildMessage)
            })
        } else {
          let loginFaildMessage = {success: 'Activation Faild'}
          reject(loginFaildMessage)
        }
      }  
    })  
  })
}




function forgotPassWord (postdata) {
  console.log('the back end data of forgot pass', postdata)
  return new Promise ((resolve, reject) => {
    let passwordToken = uuidv1()
    query = 'select * from registerform1 where email='+ "'"+postdata.email+"'";
    db.query(query, (err, result, field) => {
      console.log('the select completed data of forget pass', result)
      if (result.length == 0) {
        reject("notSuccess")
      } else {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                  user: 'Enter your email',
                  pass: 'Enter your password'
            }
          })
          const mailOptions = {
            from: 'Enter your email',
            to: postdata.email,
            subject: 'Actived the mail link',
            text: 'Visit this http://localhost:3000/verifyPassword'+passwordToken,
            html: '<a href="http://localhost:3000/verifyPassword/'+ passwordToken +'"><H2>Click on this</H2></a>'
          }
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
          })
          query = 'UPDATE registerform1 set newForgotToken="'+passwordToken+'"where email='+"'"+result[0].email+"'";
          db.query(query, (err, result, field) => {
            if (err)
              reject("notSuccess")
            resolve("SuccessTokenSuccesss")
          })
        }
    })
  })
}




function ActiveRePassword (postdata) {
  console.log('the re enter password data', postdata)
  return new Promise ((resolve, reject) => {
    bcrypt.hash(postdata.password, 10, function(err, hash) {
      query = 'select * from registerform1 where newForgotToken='+ "'"+postdata.token+"'";
      db.query(query, (err, result, field) => {
        console.log('the completed data of in data', result)
        query = 'UPDATE registerform1 set password="'+hash+'"where newForgotToken='+"'"+result[0].newForgotToken+"'";
          db.query(query, (err, result, field) => {
            if (err)
            reject("not match of inside data")
          resolve("SuccessPassWordChange")
        })
      })
    })   
  })
}




function verificationService (postdata) {
  console.log('the front end data of .................', postdata)
  return new Promise ((resolve, reject) => {

  })
}
