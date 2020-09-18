import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './redux';

import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './configuracion_firebase';

import Home from './components/Home/Home';
import Login from './components/Login/Login'; // ventana de login del usuario
// import Login from './login/Login'; // ventana de login del usuario
import Register from './components/Register/Register';
// import Registro from './registro/Registro'; // ventana de registro de usuario
import Panel from './panel_gestion/Panel'; // panel que verá el usuario una vez loggeado
import PanelGestion from './components/PanelGestion/PanelGestion'; // panel que verá el usuario una vez loggeado
// import Tanda from './tanda/Tanda'; // tanda ticket actual
import Tanda from './components/Tanda/Tanda'; // tanda ticket actual



ReactDOM.render(
  <React.StrictMode>
    
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <Router>
           <Route path="/" exact>
              <Suspense fallback={'Conectando...'}>
                  <Home />
              </Suspense>
            </Route>

            <Route path="/login" exact>
              <Suspense fallback={'Conectandoooo...'}>
                  <Login />
              </Suspense>
            </Route>

            <Route path="/register" exact>
              <Suspense fallback={'Conectando...'}>
                <div className="div_registro">
                  <Register/>
                </div>
              </Suspense>
            </Route>

            <Route path="/panel" exact>
              <Suspense fallback={'Conectando...'}>
                <div className="div_panel_gestion">
                  <PanelGestion/>
                </div>
              </Suspense>
            </Route>

            <Route path="/tanda" exact>
              <Suspense fallback={'Conectando...'}>
                <div className="div_panel_tanda">
                  <Tanda />
                </div>
              </Suspense>
            </Route>
       </Router>
      </Provider>
    </FirebaseAppProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
