//import React, { useState, useContext } from 'react';
import React, {useRef} from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect } from "react-router-dom";
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
//import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();

    const usuario = useUser();
    const modulos_firebase = useFirebaseApp();

    //const email = useSelector(store => store.email);
    //const password = useSelector(store => store.password);

    const input_email = useRef(null);
    const input_password = useRef(null);


    const hacer_login = async () => {
        dispatch(actions.darEmail(input_email.current.value)); // guardar email
        dispatch(actions.darPassword(input_password.current.value)); // guardar password
        await modulos_firebase.auth().signInWithEmailAndPassword(input_email.current.value, input_password.current.value);
    }

    return (
        <div>
            {
                !usuario &&
                <div>
                    <p>ventana de login:</p>

                    <p>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" ref={input_email} />
                    </p>

                    <p>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" ref={input_password} />
                    </p>

                    <p>
                        <button onClick={hacer_login} >Login</button>
                    </p>

                    <p>
                        <a href="/register" >Registrarse</a>
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