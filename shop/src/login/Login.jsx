import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from "react-router-dom";

export default (props) => {

    const history = useHistory();
    const modulos_firebase = useFirebaseApp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registro = () => {

        let path = `/register`;
        history.push(path);
    }

    const hacer_login = async () => {

        console.log("falta implementar");
    }


    return (
        <div>
            <p>login!</p>
            <p>
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id="email" onChange={(evento) => setEmail(evento.target.value)} />
            </p>

            <p>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(evento) => setPassword(evento.target.value)} />
            </p>

            <p>
                <button onClick={hacer_login} >Login</button>
            </p>

            <p>
                <button onClick={registro} >Registrarse</button>
            </p>

        </div>
    )
}