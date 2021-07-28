import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {Home} from './pages/Home/inde';
import {Login} from './pages/Login/index';
function App() {
  return (
    <div>
      <Router>
        <Switch>
           <Route  exact  path='/'  component={Home} />
           <Route   path='/login'  component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
