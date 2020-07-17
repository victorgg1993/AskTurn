import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './configuracion_firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './login/Login'; // ventana de login del usuario
import Registro from './registro/Registro'; // ventana de registro de usuario
import Panel from './panel_gestion/Panel'; // panel que verá el usuario una vez loggeado

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>

      <Router>
        <Switch>

        <Route path="/" exact>
            <Suspense fallback={'Conectando...'}>
              <div className="div_login">
                <Login />
              </div>
            </Suspense>
          </Route>

          <Route path="/register">
            <Suspense fallback={'Conectando...'}>
              <div className="div_registro">
                <Registro />
              </div>
            </Suspense>
          </Route>

          <Route path="/panel">
            <Suspense fallback={'Conectando...'}>
              <div className="div_panel_gestion">
                <Panel />
              </div>
            </Suspense>
          </Route>

        </Switch>
      </Router>


    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
