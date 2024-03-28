const db = require('./db');
const bcrypt = require('bcryptjs');
const helper = require('../helper');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const moment = require('moment');


async function AddInbox(client){
    
      const query = `INSERT INTO INBOX
      (\`id_mail\`, \`From\`, \`To\`, \`Cc\`, \`Date\`, \`Subject\`, \`Text\`, \`Attachment\`, \`Image\`, \`Html\`,\`Seen\`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`;
      const attachment = client.Attachment || 'yeah';
  const image = client.Image || 'yeah';
  
  const params = [
    client.Email,
    client.From,
    client.To,
    client.Cc,
    client.Date,
    client.Subject,
    client.Text,
    attachment,
    image,
    client.Html,
    client.Seen,
  ];
      const result = await db.query(query, params);
      const data = helper.emptyRows(result);
      let msg = 'Something went wrong during the insertion';
      
      if(result != null){
        msg = 'Data entered sucessfuly!'
        console.log(msg);
        return msg;
      }
      return data;
    }

    async function Addtest(client){
    
      const query = `INSERT INTO test
      (\`Seen\`) VALUES(?);`;
      const attachment = client.Attachment || 'yeah';
  const image = client.Image || 'yeah';
  
  const params = [
    client.Seen,
  ];
      const result = await db.query(query, params);
      const data = helper.emptyRows(result);
      let msg = 'Something went wrong during the insertion';
      
      if(result != null){
        msg = 'Data entered sucessfuly!'
        console.log(msg);
        return msg;
      }
      return data;
    }

    async function AddSent(client){
    
      const query = `INSERT INTO SENT
      (\`id_mail\`, \`From\`, \`To\`, \`Cc\`, \`Date\`, \`Subject\`, \`Text\`, \`Attachment\`, \`Image\`, \`Html\`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const attachment = client.Attachment || 'yeah';
  const image = client.Image || 'yeah';
  
  const params = [
    client.Email,
    client.From,
    client.To,
    client.Cc,
    client.Date,
    client.Subject,
    client.Text,
    'attachment',
    'image',
    client.Html,
  ];
      const result = await db.query(query, params);
      const data = helper.emptyRows(result);
      let msg = 'Something went wrong during the insertion';
      
      if(result != null){
        msg = 'Data entered sucessfuly!'
        console.log(msg);
        return msg;
      }
      return data;
    }
    async function AddDeleted(client){
    
      const query = `INSERT INTO DELETED
      (\`id_mail\`, \`From\`, \`To\`, \`Cc\`, \`Date\`, \`Subject\`, \`Text\`, \`Attachment\`, \`Image\`, \`Html\`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const attachment = client.Attachment || 'yeah';
  const image = client.Image || 'yeah';
  
  const params = [
    client.Email,
    client.From,
    client.To,
    client.Cc,
    client.Date,
    client.Subject,
    client.Text,
    'attachment',
    'image',
    client.Html,
  ];
      const result = await db.query(query, params);
      const data = helper.emptyRows(result);
      let msg = 'Something went wrong during the insertion';
      
      if(result != null){
        msg = 'Data entered sucessfuly!'
        console.log(msg);
        return msg;
      }
      return data;
    }
    async function AddSpam(client){
    
      const query = `INSERT INTO SPAM
      (\`id_mail\`, \`From\`, \`To\`, \`Cc\`, \`Date\`, \`Subject\`, \`Text\`, \`Attachment\`, \`Image\`, \`Html\`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const attachment = client.Attachment || 'yeah';
  const image = client.Image || 'yeah';
  
  const params = [
    client.Email,
    client.From,
    client.To,
    client.Cc,
    client.Date,
    client.Subject,
    client.Text,
    'attachment',
    'image',
    client.Html,
  ];
      const result = await db.query(query, params);
      const data = helper.emptyRows(result);
      let msg = 'Something went wrong during the insertion';
      
      if(result != null){
        msg = 'Data entered sucessfuly!'
        console.log(msg);
        return msg;
      }
      return data;
    }

    async function ChangeInboxSeen(client){
      const query = `UPDATE INBOX SET Seen='true' WHERE id_mail = ?`;
      const params = [client]
      const rows = await db.query(query, params);
      const data = helper.emptyRows(rows);
      console.log('Data updated succesfuly')
      return 'Data updated succesfuly';
    }
    async function DeleteMail(table,client){
      const query = `DELETE FROM ${table} WHERE id_mail = ?`;
      const params = [ client.seq]
      const rows = await db.query(query, params);
      const data = helper.emptyRows(rows);
      console.log('Data Deleted succesfuly')
      return 'Data Deleted succesfuly';
    }
    async function NumSeenInbox(){
      const query = `SELECT COUNT(id_mail) As total FROM INBOX WHERE Seen="true"`;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data[0].total)
      return data[0].total;
    }
    async function NumSent(){
      const query = `SELECT COUNT(id_mail) As total FROM SENT `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data[0].total)
      return data[0].total;
    }

    async function LastseqnoInbox(){
      const query = `SELECT id_mail FROM INBOX ORDER BY id_mail DESC LIMIT 1 `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data[0].id_mail)
      return data[0].id_mail;
    }
    //LastseqnoInbox()
    async function LastseqnoSent(){
      const query = `SELECT id_mail FROM SENT ORDER BY id_mail DESC LIMIT 1 `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data)
      return data.id_mail;
    }
    async function LastseqnoDelete(){
      const query = `SELECT id_mail FROM DELETED ORDER BY id_mail DESC LIMIT 1 `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      if(data == ''){
        console.log('No data founded')
      }
      console.log(data)
      return data;
    }
    //LastseqnoDelete();
    async function LastseqnoSpam(){
      const query = `SELECT id_mail FROM SPAM ORDER BY id_mail DESC LIMIT 1 `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data)
      return data;
    }

    async function getInbox(){
      const query = `SELECT * FROM INBOX `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data)
      return data;
    }
    async function getSpam(){
      const query = `SELECT * FROM SPAM `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data)
      return data;
    }
    async function getDeleted(){
      const query = `SELECT * FROM DELETED `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data)
      return data;
    }
    async function getSent(){
      const query = `SELECT * FROM SENT `;
      const rows = await db.query(query);
      const data = helper.emptyRows(rows);
      console.log(data)
      return data;
    }

    //getAll();
    
module.exports = {
    AddInbox,
    AddDeleted,
    AddSent,
    AddSpam,
    LastseqnoInbox,
    LastseqnoDelete,
    LastseqnoSent,
    LastseqnoSpam,
    Addtest,
    getInbox,
    getDeleted,
    getSent,
    getSpam,
    ChangeInboxSeen,
    DeleteMail,
    NumSeenInbox,
    NumSent
}