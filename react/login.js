import React, {useState,useEffect}  from 'react';
import Menu from '../../components/Menu/Menu'
import {Container,Jumbotron,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import {api} from '../../components/configAPI/services';


export  const Login = () => {

  async function services(){
    await axios.get(api).then((response)=>{
        console.log(response);
       //setData(response.data); 
    })
}
useEffect(()=>{
 // services();
},[]);



  const [dadosUsuario,setUsuario ] = useState({
    User:'',
    password:''
  });

  const [status,setStatus] = useState({
    type:'',
    messagem:''
});

  const valorInput = e =>setUsuario({...dadosUsuario,[e.target.name]: e.target.value})

  const loginSubmit = async e =>{
    e.preventDefault();
   //console.log(dadosUsuario.User);
   //console.log(dadosUsuario.password);
  
  const headers ={
    'Content-Type':'Application/json'
  }


  axios.post(api +'/login',dadosUsuario,{headers})
  .then((response)=>{
    console.log(response);
    if(!response){
      setStatus({
        type:"Error",
        mensagem: response.data.mensagem
      })
  
    }else{
      setStatus({
        type:"Success",
        mensagem:response.data.mensagem
      })
    
    }


  });
  
  }
    return (
      <div>
         <Menu />
      <Container  className="text-center">
      {status.type === 'Error' ? <p 
      style={{background:"#FF0000" ,
                   color:'white',
                   fontSize:"30px",
                   marginTop:"10px"
               }}>{status.mensagem}</p> : ''}
          
          {status.type === 'Success' ? <p style={{background:"#0000ff",color:'white',fontSize:"30px"}}>{status.mensagem}</p> : ''}
           <Jumbotron className="m-3">
          
             <Form  inline style={{background:"#008B8B"}} onSubmit={loginSubmit} >
          <h1 className="display-4">Faça seu Login</h1>
      <FormGroup 
      style={{
        width:"380px",
        margin:"auto"
      }}>
        <Label 
        style={{
          color:"#FF0000",
          fontSize:"20px",
          margin:"5px"
      }} for="usuario" hidden>Username:</Label>
        <Input 
         type="text" 
         name="User"  
         placeholder="usuario" 
         onChange={valorInput}
         />
      </FormGroup>
      
      <FormGroup 
      style={{width:"380px",
      margin:"auto"
      }}>
    <Label 
    style={{
      color:"#FF0000",
      fontSize:"20px",
      margin:"5px"
      }} 
      for="Password" hidden>Password</Label>
        <Input type="password"
         name="password"
         placeholder="Password" 
         onChange={valorInput}
         />
      </FormGroup>
      
      <Button  className="mt-4" color="light" outline  size="lg">Entrar</Button>
    </Form>
     </Jumbotron>




      </Container>
      </div>
    );
  }
