import ReactDOM from 'react-dom';
import 'typeface-roboto';

// nuevo
import React, { Suspense } from 'react';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './configuracion_firebase';
import { Provider } from 'react-redux';
import store from './redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from './components/Welcome/Welcome';
import Shops from './components/Shops/Shops';
import ShopsDashboard from './components/ShopsDashboard/ShopsDashboard';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>

        <Router>

          <Suspense fallback={'Conectando...'}>
            <Route path="/" exact component={Welcome} />
          </Suspense>

          <Suspense fallback={'Conectando...'}>
            <Route path="/shops" exact component={Shops} />
          </Suspense>

          <Suspense fallback={'Conectando...'}>
            <Route path="/ticket/:shopId/:id_tienda/:id_ticket" exact component={ShopsDashboard} />
          </Suspense>

        </Router>

      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

