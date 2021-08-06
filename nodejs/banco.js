const mongoose = require('mongoose');
const banco = mongoose.connect('mongodb://localhost:27017/Login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
   console.log('conexão com mongodb realizada com sucesso!')
  }).catch((erro)=>{
    console.log('Error: com mongodb não foi realizada com sucesso!')
  });

  module.exports = banco;