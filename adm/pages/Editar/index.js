import React, { useState,useEffect } from 'react';
import { Menu } from '../../components/Menu';
import { Link,Redirect} from 'react-router-dom';
import api from '../../config/services';

export const Editar = (props) =>{
    const [id] = useState(props.match.params.id);// recebendo o id da rota Editar
    const [Nome ,setNome]= useState("");
    const [Valor ,setValor]= useState("");
    const [Quantidade ,setQuantidade]= useState("");
   

    //const [data, setData]= useState("");
    const [ status, setStatus] = useState({
        type:'',
        mensagem:''
    });

    const editProduto = async e =>{
        e.preventDefault();
       // console.log("nome:"+Nome);
      
       const headers = {
        'headers':{
            //os dados serao enviado em formato json
            'Content-Type': 'application/json'
        }
      }

      await api.put('/editar_produto',{id,Nome,Valor,Quantidade},headers)
      .then((response)=>{
        setStatus({
            type:'redSuccess',
            mensagem: response.data.mensagem
           });
      }).catch((err)=>{
           if(err.response){
            setStatus({
                type:'Error',
                mensagem:err.response.data.mensagem
               });
           }else{
            setStatus({
                type:'Error',
                mensagem:"Error: tente mais tarde!"
               });
           }
      })








 }
       useEffect(()=>{
        const getProduto = async () =>{
           await api.get("/Listar_um_produto/" + id)
            .then((response)=>{
                //console.log(id);
            // console.log(response.data.produto.Nome);
             setNome(response.data.produto.Nome);
             setValor(response.data.produto.Valor);
             setQuantidade(response.data.produto.Quantidade);
            
            }).catch((err)=>{
                console.log(err)
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









          // setNome("Televisão");
          // setValor(150.47);
         //  setQuantidade(25);
         //  setData({
           //    nome:"Televisão",
          //      valor: 150.47,
          //      quantidade: 25
         //   })      
        }
         getProduto();
    },[id]);
    return(
            <div>
                <Menu />
               
   {status.type === 'Error' ? <p style={{color:"#ff0000"}}>{status.mensagem}</p> : ""}
   {status.type === 'Success' ? <p style={{color:"green"}}>{status.mensagem}</p> : ""}
   {status.type === 'redSuccess' ? <Redirect to={{
       pathname:"/listar",
       state:{
           type:'Success',
           mensagem:status.mensagem
       }
   }} /> : ""}  
             
                <h1>Editar</h1>

                <Link to={'/listar'}><button style={{background:"green",
                          color:"white",
                          fontSize:"15px",
                          cursor:"pointer"
                          }} >Listar</button> </Link>
            <hr />

            <form onSubmit={editProduto} >
                 <label>Nome:</label><br />
                 <input type="text" name="Nome" placeholder="nome produto..." value={Nome}  onChange={e => setNome(e.target.value)} /><br />
                
                <label >Preço:</label><br />
   <input type="text" name="Valor" placeholder="Preço produto..." value={Valor}  onChange={e => setValor(e.target.value)}
               /><br />
                
                
          <label >Quantidade:</label><br />
  <input type="number" name="Quantidade" placeholder="quantidade produto..." value={Quantidade}  onChange={e => setQuantidade(e.target.value)}/><br /><br />

                    <button style={{background:"green",
                          color:"white",
                          fontSize:"15px",
                          cursor:"pointer"
                          }}  type="submit">Salvar Alterações</button>


                   
                </form>
                  

            </div>
        )
}