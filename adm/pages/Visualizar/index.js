import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../config/services';
import {Redirect} from 'react-router-dom';
export const Visualizar = (props) =>{
    // pegando o id que vem da rota Visualiza
    const[id] = useState(props.match.params.id); 
       
      // const [id, setId]= useState("");
       const [data, setData]= useState("");


       const [ status, setStatus] = useState({
        type:"",
        mensagem: ""
    });


    useEffect(()=>{
        const getProduto = async () =>{
          
            await api.get("/Listar_um_produto/"+ id)
            .then((response)=>{
               setData(response.data.produto);
               console.log(response.data);
            }).catch((err)=>{
                  if(err.response){
                    setStatus({
                        type:"redError",
                        mensagem: err.response.data.mensagem
                    })
                  }else{
                    setStatus({
                        type:"redError",
                        mensagem: "Erro: tente mais tarde !"
                    })
                  }
            })
         /*  setData({
                id: id,
                nome:"Televisão",
                valor: 150.47,
                quantidade: 25
            }) 
          */       
        }
         getProduto();
    },[id]);
        return(
            <div>
                <Menu />
                <h1>Visualizar</h1>
                {status.type === 'redError' ? <Redirect to={{
        pathname:"/listar",
        state:{
            type:'redError',
            mensagem:status.mensagem
        }
    }} /> : ""}   




                {status.type === 'error' ? <p style={{color:"#ff0000"}}>{status.mensagem}</p> : ""}
                <span>ID:{data.id}</span><br />
                <span>Nome:{data.Nome}</span><br />
                <span>Valor:{data.Valor}</span><br />
                <span>Quantidades:{data.Quantidade}</span><br />
            </div>
        )
}
