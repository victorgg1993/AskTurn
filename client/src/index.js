import './index.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux';

import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './configuracion_firebase';


import Buscador from './Buscador/Buscador';
import VentanaTicket from './VentanaTicket/VentanaTicket';







ReactDOM.render(
  <React.StrictMode>
    
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <Router>
          <Switch>


            <Route path="/" exact>
              <Suspense fallback={'Conectando...'}>
                <div className="div_buscador">
                  <Buscador />
                </div>
              </Suspense>
            </Route>


            <Route path="/ticket">
              <Suspense fallback={'Conectando...'}>
                <div className="div_VentanaTicket">
                  <VentanaTicket />
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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
