import React from 'react';
import './Shop.css';
import Login from '../login/Login'; // ventana de login del usuario
import Registro from '../registro/Registro'; // ventana de registro de usuario
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Shop() {
  return (
    <Router>
      <Switch>
        <Login path="/" exact component={Login} />

        <Route path="/register">
          <div className="div_registro">
            <p>Usuario:</p>
            <Registro />
          </div>
        </Route>

      </Switch>
    </Router>
  );
}

export default Shop;
