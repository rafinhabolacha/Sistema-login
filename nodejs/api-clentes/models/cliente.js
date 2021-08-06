const Sequelize =  require('sequelize');
const db = require('./db');
const Cliente =db.define('clientes',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    Data_pedido:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    codigo_pedido:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
},{
    timestamps:true
});
module.exports = Cliente;
