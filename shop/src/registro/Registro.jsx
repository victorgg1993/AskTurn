import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from "react-router-dom";

export default (props) => {

    const history = useHistory();
    const modulos_firebase = useFirebaseApp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const registro = async () => {
        // lo dejo apagado para no generar mil cuentas
        //await modulos_firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log("apagado, ve a Registro.jsx, función registro y activa el await");
    }

    const volver_login = () => {
        let path = `/`; 
        history.push(path);
    }

    return (
        <div>
            <p>registro!</p>

            <p>
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id="email" onChange={(evento) => setEmail(evento.target.value)} />
            </p>

            <p>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(evento) => setPassword(evento.target.value)} />
            </p>

            <p>
                <button onClick={registro} >Registrarse</button>
            </p>

            <p>
                <button onClick={volver_login} >volver al login</button>
            </p>
        </div>
    )
}
