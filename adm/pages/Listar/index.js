import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '../../components/Menu';
import api from '../../config/services';
export const Listar = () =>{

    const [data,setData ] = useState([]);
    //pegando  a mensagem que esta em  Redirect  no cadastrar
    const { state } = useLocation();

    const [ status, setStatus] = useState({
        type: state? state.type:"",
        mensagem: state ? state.mensagem:""
    });

    const  ListarProduto = async () =>{ 
     //consultando a api
     await api.get('/Listar_produtos').then((response)=>{
         console.log(response)
         setData(response.data.produtos);
       }).catch((err)=>{
         //console.log(err.response);
         if(err.response){
            setStatus({
                type:"error",
                mensagem:err.response.data.mensagem
            })
         }else{
            setStatus({
                type:"error",
                mensagem:"Tente mais tarde!"
            })
         }
     })





     /*   var valores=
        [
            {
                "id":3,
                "nome":"DVD",
                "valor": 190.99,
                "quantidade": 45
            },
            {
                "id":2,
                "nome":"Televisão",
                "valor": 150.47,
                "quantidade": 25
            },
            {
                "id":1,
                "nome":"Teclado",
                "valor": 180.90,
                "quantidade":20
            }
            
        ]
        setData(valores);
        */
    }

    //assim que inicia execute essa função
    useEffect(()=>{
          ListarProduto();
    },[])//executa uma unica vez com []


    const ApagaProduto = async (idproduto) =>{
       // console.log(idproduto);
    // alert("tem certeza que deseja Apaga   "+ idproduto);
     await api.delete('/apagar_produto/' + idproduto)
    .then((response)=>{
        setStatus({
            type:"Success",
            mensagem: response.data.mensagem
        })
        //atualizar a lista após apagar
        ListarProduto();

    }).catch((err)=>{
        if(err.response){
            setStatus({
                type:"error",
                mensagem:err.response.data.mensagem
            })
        }else{
            setStatus({
                type:"error",
                mensagem:"Tente mais tarde!"
            })
        }
    })



    }

  
       

        return(
            <div>
                <Menu />
                <h1>Listar</h1>
                
    { status.type === 'Success' ? <p style={{color:"green"}} >{status.mensagem}</p> :""}
    { status.type === 'error' ? <p style={{color:"red"}} >{status.mensagem}</p> :""}
                 <Link to="/cadastrar"><button style={{background:"green",
                          color:"white",
                          fontSize:"15px",
                          cursor:"pointer",
                          margin:"10px" 
                          }} 
                         type="button">Cadastrar</button></Link>
                 <hr />
                <table style={{width:"100%",margin:"2%"}}>
                    <thead>
 <tr style={{textAlign:"center",background:"#bbb",padding:"5px"}}>
                          <td>Id</td>
                          <td>Nome</td>
                          <td>Valor</td>
                          <td>Quantidades</td>
                          <td style={{margin:"5px"}} >Açoes</td>
                        </tr>
                    </thead>
                      <tbody>
                          
                        {data.map(produto =>(
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.Nome}</td>
                                    <td>{produto.Valor}</td>
                                    <td>{produto.Quantidade}</td>
                                    <td>
 <Link to={"/visualizar/"+ produto.id }>
     <button style={{background:"green",
                          color:"white",
                          fontSize:"15px",
                          cursor:"pointer"
                          }} 
                          type="button">Visualizar</button></Link>{""} 

               <Link to={"/editar/"+ produto.id }>
           <button style={{background:"green",
                          color:"white",
                          fontSize:"15px",
                          cursor:"pointer",
                          margin:"10px" 
                          }} 
                           type="button">Editar</button></Link>{""}
                                        
          <Link to={"#"}><button style={{background:"green",
                          color:"white",
                          fontSize:"15px",
                          cursor:"pointer"
                          }} 
                          onClick={()=> ApagaProduto(produto.id)}>Apagar</button></Link>           
                                        
                                         
                                         
                                    </td>
                                </tr>
                        ))}
                   </tbody>
                </table>
            </div>
        )
}