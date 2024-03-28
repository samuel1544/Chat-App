const db = require('./db');
const bcrypt = require('bcrypt');
const helper = require('../helper');
const session = require('express-session');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const moment = require('moment');
const nodemailer = require('nodemailer')



async function getAll(){
  const query = `SELECT * FROM virtual_users `;
  const rows = await db.query(query);
  const data = helper.emptyRows(rows);
  console.log(data)
  return data;
}
getAll()

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
const query = `SELECT email FROM user WHERE email = ?`;
const params = [client.email];
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
const query = `SELECT password FROM user WHERE email = ?`;
const params = [client.email];
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
const query = `SELECT password FROM user WHERE email = ?`;
const params = [client.email];
const result = await db.query(query,params);
const data = helper.emptyRows(result);
 const verif = await getUserName(client);
const pass = await getUserpassword(client);
const info = await getUserInfo(client);

if (pass.length === 0) {
  return 'User does not exist';
}
if (data[0] == null){
  let ms = 'User does not exist';
  return ms;
}
console.log(pass[0].password)
const valid = await bcrypt.compare(client.password, pass[0].password);
console.log(valid)
if ((verif[0].email == client.email && valid) || (verif[0].email == client.email && pass[0].password == client.password)) {
  const token = jwt.sign({nom:info[0].username,id:info[0].Id,mail:info[0].email}, 'secret', {expiresIn: '5m'})
  return {
    status: 'Connected',
    token: token
  };
}
  return 'E-mail or password incorrect';


}
async function userdata(client){
  try {
    const data = jwt.verify(client.token, 'secret');
  // Si le token est valide, decoded contient les informations décodées du token
  console.log(data);
  return data
} catch (err) {
  // Si une erreur se produit, le token est invalide ou a expiré
  console.error(err);
  return 'Token Expired'
}

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
    if(client.username == null || client.email == null){
      msg = 'Please all fields are required!'
      return msg;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(client.password, salt);
    const params = [
          client.username,
          client.email,
          hash
        ];
    const result = await db.query(query, params);
    const data = helper.emptyRows(result);
    console.log(result)
    let msg = 'Something went wrong during the insertion';
    
    if(result != null){
      msg = 'Data entered sucessfuly!'
      return data[0];
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
    login,
    userdata
  };