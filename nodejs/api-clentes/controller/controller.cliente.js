const controller_cliente = require('../models/cliente');
const controller_pedido = require('../models/cliente');

const pedidos =[];
 
module.exports={

    async stores(req,res){
        res.send("Clientes");
    },
    //============================================
    async cadastrar(req,res){
       const cliente = req.body;
      // pedidos.push(cliente);
      // const numero =  Math.floor(Math.random() * 10) + 1
       if(cliente){
        await controller_cliente.create(cliente).then(function(){
             return res.json({
                erro:false,
                mensagem:"Clientes salvo com sucesso!",
                cliente,
               
            });       
        }).catch(function(err){
            return res.json({
                erro:true,
                mensagem:"Clientes não salvo com sucesso!"+err,
             });
          });
        }
      },
    //================================================================
      
    async pesquisar(req,res){
        const {codigo_pedido} = req.params;
     const cliente = await controller_pedido.findOne({where:{codigo_pedido_cliente: codigo_pedido}}).then(function(){
        if(cliente){
            return res.json({
                erro:false,
                mensagem:"item  encontrado com sucesso!",
                codigo_pedido:codigo_pedido,
                cliente
             });
            }
            else
            {
             return res.json({
                  erro:true,
                  mensagem:"item não encontrado",
                 codigo:codigo_pedido,
              });
           }
       });
      
            
       
    }
   
 }

//========================================================================    
