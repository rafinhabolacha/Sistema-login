import React from 'react';
import Menu from '../../components/Menu/Menu'

import {Container,Jumbotron} from 'reactstrap';


export const Home =()  =>{
    return (
      <div>
         <Menu />
      <Container style={{marginTop:"15px"}}>
        
        <Jumbotron  style={{
                           background:"#008B8B",
                           padding:"10px"
                           }}>
            <h1 style={{
                      background:"#008B8B",
                      padding:"10px",
                      color:"white"
                    }} 
                           
           className="display-4 text-center ">Temos a solução para seu Sistema!</h1>
      
            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-2" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
            <a style={{background:"#0000FF"
                      ,color:"white",
                      textDecoration:"none",
                      padding:"8px"
                      ,borderRadius:"5px"
                      }}
                       href="/login" color="primary" outline  size="lg">Faça seu Cadastro</a>
               
            </p>
        </Jumbotron>
      </Container>
      </div>
    );
  }
  