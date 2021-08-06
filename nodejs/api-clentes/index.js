const express = require('express');
const app = express();
const sequelize = require('sequelize');
const cors = require('cors');
const mysql = require('mysql2');
const routes = require('./routes');
app.use(express.json());
require('./models/db');
app.use(routes);
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");     
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
  app.use(cors())
  next();    
});
app.listen(8080,function(){
  console.log('servidor rodando !');
})



