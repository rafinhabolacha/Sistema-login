const Sequelize =  require('sequelize');
const db = require('../models/db');
const Pedido =db.define('pedidos',{
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
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    quantidade:{
        type:Sequelize.INTEGER,
        allowNull:true

    },
    preco_unitario:{
        type:Sequelize.DOUBLE,
        allowNull:true
    },
    total:{
        type:Sequelize.DOUBLE
    },
    situacao:{//tipo 1 Pago  tipo 2: Pendente
        type: Sequelize.INTEGER,
        allowNull:true
    },
    data_pagamento:{
        type:Sequelize.DATE,
        allowNull:false
    }
});
//cria a tabela
// antes de cadastrar o segundo desativa essa opcao 
//Pedido.sync({force:true});
//depois deixe assim 
//Pedido.sync();
module.exports = Pedido;