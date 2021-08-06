const controller_pedido = require('../models/cliente');


module.exports={
    
    async stores(req,res){
        res.send("pedido");
    },
    async cadastro(req,res){
        const pedidos = req.body;
        if(pedidos){
            await controller_pedido.create(pedidos).then(function(err){
                 return res.json({
                    erro:false,
                    mensagem:"pedido realizado  com sucesso!",
                    pedidos,
                   
                });       
            }).catch(function(err){
                return res.json({
                    erro:true,
                    mensagem:"Erro: ao realizar pedido !"+err
                 });
              });
            }
          },

          async pesquisar(req,res){
            const situacao = req.body;
          const situacao_pedido = await controller_pedido.findOne({situacao: situacao}).then(function(){
             if(situacao_pedido){
                 return res.json({
                   situacao: situacao
                 });
             }
                 
                  



        
       });
    },
    
} 