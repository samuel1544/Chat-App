const db = require('./db');
const bcrypt = require('bcryptjs');
const helper = require('../helper');
const session = require('express-session');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const moment = require('moment');
const nodemailer = require('nodemailer')



async function getAll(){
  const query = `SELECT * FROM user `;
  const rows = await db.query(query);
  const data = helper.emptyRows(rows);
  return data;
}

async function getUserInfo(client){
  const query = `SELECT * FROM user WHERE email = ?`;
  const params = [client.email];
  const result = await db.query(query,params);
  
  const data = helper.emptyRows(result);
  if (data[0] == null){
    let ms = 'User does not exist';
    return ms;
  }else{
    return data;
  }
  return data;
}

async function getUserName(client){
const query = `SELECT username FROM user WHERE username = ?`;
const params = [client.username];
const result = await db.query(query,params);
const data = helper.emptyRows(result);
console.log(result)
if (data[0] == null){
  let ms = 'User does not exist';
  return ms;
}else{
  return data;
}

}

async function getUserpassword(client){
const query = `SELECT password FROM user WHERE username = ?`;
const params = [client.username];
const result = await db.query(query,params);
const data = helper.emptyRows(result);
if (data[0] == null ){
  let ms = 'User does not exist';
  return ms;
}else{
  return data;
}

}

async function compare(client){
const query = `SELECT password FROM user WHERE username = ?`;
const params = [client.username];
const result = await db.query(query,params);
const data = helper.emptyRows(result);
const verif = await getUserName(client);
const pass = await getUserpassword(client);
const info = await getUserInfo(client);

if (data.length === 0) {
  return 'User does not exist';
}
// if (data[0] == null){
//   let ms = 'User does not exist';
//   return ms;
// }
console.log(data[0].password)
const valid = await bcrypt.compareSync(client.password, data[1].password);
console.log(valid)
if ((verif[0].username == client.username && valid) || (verif[0].username == client.username && pass[0].password == client.password)) {
  const token = jwt.sign({nom:info[0].username,id:info[0].id,mail:info[0].email}, 'secret', {expiresIn: '5m'})
  return {
    message: 'Connected Successfuly',
    token: token
  };
}
  return 'E-mail or password incorrect';


}

async function login(client) {
  const query = `SELECT mdp FROM utilisateur WHERE nom = ?`;
  const params = [client.nom];
  const result = await db.query(query,params);
  const data = helper.emptyRows(result);
  const verif = await getUserName(client);
  const pass = await getUserpassword(client);
  const info = await getUserInfo(client);
  
  if (data.length === 0) {
    return 'User does not exist';
  }
  // if (data[0] == null){
  //   let ms = 'User does not exist';
  //   return ms;
  // }
  const valid = await bcrypt.compareSync(client.mdp, data[0].mdp);
  if ((verif[0].nom == client.nom && valid) || (verif[0].nom == client.nom && pass[0].mdp == client.mdp)) {
    const token = jwt.sign({nom:info[0].nom,id:info[0].id,mail:info[0].mail,profil:info[0].profil}, 'secret', {expiresIn: '5m'})
    return {
      message: 'Connected Successfuly',
      token: token
    };
  }
    return 'E-mail or password incorrect';
  
  

}

// async function UpdateUserInfo(client){
//   const query = `UPDATE TABLE utilisateur`
// }

// async function Upload(client){
//   const detail = ajoutClient(clinet);
//   const Userfile = multer.diskStorage({
//     destination: (req, file, cb) =>{
//       cb(null, "./images");
//     },
//     filename: (req, file, cb) =>{
//       const filename = detail[0].nom + file.originalname;
//       cb(null, filename);
//     }
//   });
//   const upload = multer({storage: Userfile})
// }

async function ajoutClient(client){
  const verif = await getUserInfo(client)
  const user = await getUserName(client)
  if(user[0].username == client.username){
    let ms = 'User with this name already exist'
    return ms;
  }
  if(verif[0].email == client.email){
    let ms= 'E-mail already exist';
    return ms;
  }
  else{
    const query = `INSERT INTO user(username,email,password) VALUES (?,?,?)`;
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(client.password, salt);
    const params = [
          client.username,
          client.email,
          hash
        ];
    const result = await db.query(query, params);
    const data = helper.emptyRows(result);
    let msg = 'Something went wrong during the insertion';
  
    if(result != null){
      msg = 'Data entered sucessfuly!'
      return msg;
    }
    return data;
  }
  
  }

  module.exports = {
    ajoutClient,
    getAll,
    getUserInfo,
    getUserpassword,
    getUserName,
    compare,
    login
  };