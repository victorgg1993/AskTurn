import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';

export default (props) => {

    const modulos_firebase = useFirebaseApp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        //console.log(email, password);
        await modulos_firebase.auth().createUserWithEmailAndPassword(email,password);
    }


    return (
        <div>
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" onChange={(evento) => setEmail(evento.target.value)} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(evento) => setPassword(evento.target.value)} />

            <button onClick={submit} >Login</button>
        </div>
    )
}
