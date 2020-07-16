import React from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';

export default (props) => {
    return (
        <div>
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />

            <button>Login</button>
        </div>
    )
}
