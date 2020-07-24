//import React, { useState, useContext } from 'react';
import React  from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { useHistory, Redirect } from "react-router-dom";
import * as actions from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();

    const usuario = useUser();
    const history = useHistory();
    const modulos_firebase = useFirebaseApp();

    const email = useSelector(store => store.email);
    const password = useSelector(store => store.password);

    const registro = (e) => {

        e.preventDefault(); // para que no se vaya a "a_ningun_lado"
        let path = `/register`;
        history.push(path);
    }

    const hacer_login = async () => {

        await modulos_firebase.auth().signInWithEmailAndPassword(email, password);
    }

    return (
        <div>
            {
                !usuario &&
                <div>
                    <p>ventana de login:</p>

                    <p>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" onChange={(evento) => dispatch(actions.darEmail(evento.target.value))} />
                    </p>

                    <p>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={(evento) => dispatch(actions.darPassword(evento.target.value))} />
                    </p>

                    <p>
                        <button onClick={hacer_login} >Login</button>
                    </p>

                    <p>
                        <a href="#a_ningun_lado" onClick={registro} >Registrarse</a>
                    </p>
                </div>
            }

            {
                usuario &&
                <div>
                    <Redirect to={'/panel'} />
                </div>
            }

        </div>
    )
}

export default Login;