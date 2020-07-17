import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Shop from './shop/Shop';
import * as serviceWorker from './serviceWorker';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './configuracion_firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Shop />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
