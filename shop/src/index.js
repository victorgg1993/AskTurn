import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './redux';

import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './configuracion_firebase';

import Login from './login/Login'; // ventana de login del usuario
import Registro from './registro/Registro'; // ventana de registro de usuario
import Panel from './panel_gestion/Panel'; // panel que verá el usuario una vez loggeado
import Tanda from './tanda/Tanda'; // tanda ticket actual


ReactDOM.render(
  <React.StrictMode>
    
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
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

            <Route path="/tanda">
              <Suspense fallback={'Conectando...'}>
                <div className="div_panel_tanda">
                  <Tanda />
                </div>
              </Suspense>
            </Route>


          </Switch>
        </Router>
      </Provider>
    </FirebaseAppProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
