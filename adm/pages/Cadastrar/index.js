import React, { useState } from 'react';
import { Menu } from '../../components/Menu';
import {Redirect} from 'react-router-dom';
import api from '../../config/services';
export const Cadastrar = () =>{

    const [produto, setProduto] = useState({
        Nome:'',
        Valor:'',
        Quantidade:''

    });

    const [ status, setStatus] = useState({
        type:'',
        mensagem:''
    });

    const valueInput = e =>setProduto({ ... produto,[e.target.name]: e.target.value}); 


    const addProduto = async  e =>{
           e.preventDefault();
          //salvando no banco de dados
          const headers = {
              'headers':{
                  //os dados serao enviado em formato json
                  'Content-Type': 'application/json'
              }
            }
            //sempre verificar se no banco esta com letra maiuscula nome da coluna
          await api.post('/Cadastrar_produto', produto , headers)
          .then((response)=>{
              console.log(response);
            setStatus({
                type:'redSuccess',
                mensagem: response.data.mensagem
               });
          }).catch((err)=>{
              if(err.response){
                setStatus({
                      type:'Error',
                      mensagem: err.response.data.mensagem
                    });
          
              }else{
                setStatus({
                    type:'Error',
                    mensagem: "Error: tente mais tarde"
                  });
        
              }
          })
         

          // console.log("Nome: "+produto.quantidade);

         //  setStatus({
          //  type:'Error',
         //   mensagem:'Error: produto não cadastrado com sucesso!'
        //   });

          // setStatus({
          //  type:'Success',
         //   mensagem:'produto  cadastrado com sucesso!'
         ///  });

        //   setStatus({
         //   type:'redSuccess',
         //   mensagem:'produto  cadastrado com sucesso!'
        //   });


    }
        return(
            <div>
                <Menu />
                <h1>Cadastrar</h1>
    {status.type === 'Error' ? <p style={{color:"#ff0000"}}>{status.mensagem}</p> : ""}
    {status.type === 'Success' ? <p style={{color:"green"}}>{status.mensagem}</p> : ""}
   
    {status.type === 'redSuccess' ? <Redirect to={{
        pathname:"/listar",
        state:{
            type:'Success',
            mensagem:status.mensagem
        }
    }} /> : ""}       
                <hr />
                <form onSubmit={addProduto}>
                 <label>Nome:</label><br />
                <input type="text" name="Nome" placeholder="nome produto..." onChange={ valueInput} /><br />
                
                 <label >Preço:</label><br />
                 <input type="text" name="Valor" placeholder="Preço produto..."onChange={ valueInput}/><br />
                
                
          <label >Quantidade:</label><br />
         <input type="number" name="Quantidade" placeholder="quantidade produto..."  onChange={ valueInput} />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
}