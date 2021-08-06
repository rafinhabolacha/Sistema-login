const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('api','root','',{
    host:'localhost',
    dialect:'mysql'
});

sequelize.authenticate().then(function(){
  console.log("conexão efetuada com sucesso!");
}).catch(function(){
  console.log("Erro na conexão!");
})

module.exports = sequelize;