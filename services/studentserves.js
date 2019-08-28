const bcrypt=require('bcrypt');
const uuidv1 = require('uuid/v1');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
// const session = require('express-session');




module.exports = {
  // getAllstudents,
  // getstudentsByid,
  insertAllstudents,
  // uppdateAllstudents,
  // deleteAllstudents,
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
        // let hash = bcrypt.hashSync(postdata.password, 10);
        bcrypt.hash(postdata.password, 10, function(err, hash) {
          // Store hash in database
          console.log("hash is the encrypt the password ",hash);
          query = 'insert into registerform1(name, email, password, actived_token)values("'
          + postdata.name + '","' + postdata.email + '","' 
          + hash + '","'+ registertoken +'")';          
          db.query(query, (err, result, field) => {
            // console.log('db test', result, query);
            if (err)
            reject("user already exist");
            // console.log('filelds', field);
            resolve("Register Success")
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                    user: 'muniraj.rajammal@gmail.com',
                    pass: 'mathammal143muni'
              }
            })
            const mailOptions = {
              from: 'muniraj.rajammal@gmail.com',
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
      // console.log('db test result[0] name ........', result[0].name)
      // console.log('db test result[0] email .........', result[0].email)
      console.log('db test is activated ', result[0].isActived)
      if (result[0].isActived == 0) {
        let isActiveTrue =1;
        console.log('the data result of isactive true ', isActiveTrue)
        // query = 'UPDATE registerform1 SET  isActived="'+isActiveTrue+'" WHERE actived_token=' + postdata.activationToken;
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
      // console.log('email get data .......', )
      // console.log('email get the query of the data .......', queryData.name)
      // if (err)
      //   reject(err);
      // resolve('successs')
    })
    // console.log('query the data ', query)
    // console.log('the query token of ..........', postdata.activationToken)
  })
}





function loginRegisterData (postdata) {
  console.log('the back end data of login form ==========', postdata)
  console.log(' email of subracted data..........=======', postdata.email)
  console.log('the password of front end data in login form======= ----- ', postdata.password)
  return new Promise((resolve, reject) => {
    query = 'select * from registerform1 where email='+ "'"+postdata.email+"'";
    db.query(query, (err, result, field) => {
      console.log(' the completed data in database --------', result)
      // let emptyArray = [] 
      // console.log('the back end email data---------', result[0].email)
      // console.log('the db hash password ------ >>>>>>', result[0].password)
      // console.log('the post data is password of front end login ---->>', postdata.password)
      if (result.length == 0) {
        console.log('============================')
        let loginFaildMessage = {success: 'Login faild'}
        reject(loginFaildMessage)
      } else {
        if (result[0].isActived == 1){
          console.log('///////////////////////////////////')
          bcrypt.compare(postdata.password, result[0].password, function(err, res) {
            console.log('the compare post data password----- >>>>> ', postdata.password)
            // cookie use work on back end data token generation 
            // console.log('the session data +++++++++++++', result[0].email.session)
            // console.log('the compare of post data hash ------ >>>>> ', hash)
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
      // console.log('the inside db of data email ', result[0].email)
      if (result.length == 0) {
        reject("not match")
      } else {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                  user: 'muniraj.rajammal@gmail.com',
                  pass: 'mathammal143muni'
            }
          })
          const mailOptions = {
            from: 'muniraj.rajammal@gmail.com',
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
              reject("not match of inside data")
            resolve("SuccessTokenSuccesss")
          })
        }
    })
  })
}




function ActiveRePassword (postdata) {
  console.log('the re enter password data', postdata)
  console.log('the post data pass==============', postdata.password)
  console.log('the password token ----------==========  >>>', postdata.token)
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






  // Object.keys(resultSelect).forEach(function(activationKey) {
  // var check = resultSelect[activationKey];
  // console.log(check.isVerified)







// function getAllstudents() {
//   console.log('db test');
//   return new Promise((resolve, reject) => {
//     query = 'select * from registerform1';
//     db.query(query, (err, result, field) => {
//     console.log('db test', result, query);
//     if (err)
//       reject(err);
//     console.log('filelds', field);
//     resolve(result)
//     })
//   })
// }





// function getstudentsByid(id) {
//   console.log('db test');
//   return new Promise((resolve, reject) => {
//     query = 'select * from regform1 where id=' + id;
//     db.query(query, (err, result, field) => {
//       // console.log('db test', result, query);
//       if (err)
//         reject(err);
//       // console.log('filelds', field);
//       resolve(result)
//     })
//   })
// }



// 
// function uppdateAllstudents(postdata, id) {
//   console.log('db test');
//   return new Promise((resolve, reject) => {
//     query = 'UPDATE students SET  name="' + postdata.name + '",email="' + postdata.email + '" WHERE id=' + id;
//     console.log(query)
//     db.query(query, (err, result, field) => {
//       console.log('db test', result);
//       if (err)
//         reject(err);
//       resolve("upsuccess")
//     })
//   })
// }




// function deleteAllstudents(id) {
//   console.log('db test');
//   return new Promise((resolve, reject) => {
//     query = 'delete from students WHERE id = ' + id;
//     db.query(query, (err, result, field) => {
//       console.log('db test', result);
//       if (err)
//         reject(err);
//       resolve(result)
//     })
//   })
// }
