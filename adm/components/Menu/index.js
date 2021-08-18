import React from 'react';
import {Link} from 'react-router-dom';

export const Menu = () =>{
    const Container ={
        display:"flex",
        backgroundColor:"blue",
        padding:"15px 5px"
    }
    const linkColor ={
        color:"white",
        fontSize:"20px",
        margin:"15px",
        textDecoration:"none"
       
    }
    return(
        <div style={Container}>
            <Link style={linkColor} to="/">Home</Link><br />
            <Link style={linkColor} to="/listar">Listar</Link><br />
            
        
         

        </div>
    )
}