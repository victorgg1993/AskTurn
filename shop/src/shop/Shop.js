import React from 'react';
import './Shop.css';
import Login from '../login/Login'; // ventana de login

function Shop() {
  return (
    <div className="Shop">
      <p>Usuario:</p>
      <Login/>
    </div>
  );
}

export default Shop;
