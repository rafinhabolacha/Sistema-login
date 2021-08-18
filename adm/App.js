import React from 'react';
import {Home} from './pages/Home';
import {Listar} from './pages/Listar';
import {Visualizar}from './pages/Visualizar';
import { Cadastrar } from './pages/Cadastrar';
import {Editar} from './pages/Editar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route  exact  path="/" component={Home} />
          <Route  exact  path="/listar" component={Listar} />
          <Route  exact  path="/visualizar/:id" component={Visualizar} />
          <Route  exact  path="/cadastrar" component={Cadastrar} />
          <Route  exact  path="/editar/:id" component={Editar} />
        </Switch>
      </Router>
     </div>
  );
}

export default App;
