const user = require('../models/users.model');

module.exports ={

    async Store(req,res){
     const   usuario = await user.find({})
        return res.json(usuario);
     
    },
    async validarLogin(req,res){
        const {User,password} = req.body;
       const pass = await  user.findOne({password: password}) 
       if(!pass){
           return res.json({
               error:true,
               mensagem:"Senha Inválido!"
           })
       }
       const usuario = await  user.findOne({User: User}) 
        if(!usuario){
            return res.json({
                error:true,
                mensagem:"usuario não encontrada!"
            })
        }else{
            return res.json({
                error:false,
                mensagem:"Login efeutado com sucesso!"
            }) 
        }  
    
    }
    


}