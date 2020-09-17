//import React, { useState, useContext } from 'react';
import React, {useRef} from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect, Link } from "react-router-dom";
import * as actions from '../../redux/actions';
import { useDispatch } from 'react-redux';
//import { useSelector, useDispatch } from 'react-redux';
import logo from "../logo/AskTurnLogo.svg";
import './Login.css';

const Login = () => {
    
    const dispatch = useDispatch();

    const usuario = useUser();
    const modulos_firebase = useFirebaseApp();

    //const email = useSelector(store => store.email);
    //const password = useSelector(store => store.password);

    const input_email = useRef(null);
    const input_password = useRef(null);


    const hacer_login = async event => {
        event.preventDefault();
        // console.log(input_email.current.value,input_password.current.value)
        dispatch(actions.darEmail(input_email.current.value)); // guardar email
        dispatch(actions.darPassword(input_password.current.value)); // guardar password
        await modulos_firebase.auth().signInWithEmailAndPassword(input_email.current.value, input_password.current.value);
    }

    return (
        <div>
         {
        !usuario &&     
        <div className="container">
        <div className="container-logo">
        <img className="logoLogin" src={logo} alt=""></img>
        </div>
        <div className="container-form">
                <form action="#" className="form">
                    <div className="form-field">
                        <label htmlFor="email" className="form-label">correo electronico</label>
                        <input type="email" id="email" ref={input_email} className="form-input"></input>
                    </div>
                    <div className="form-field">
                        <label htmlFor="password" className="form-label">contraseña</label>
                        <input type="password" id="password" ref={input_password} className="form-input"></input>
                    </div>   
                    <input type="submit" className="form-submit" onClick={hacer_login} value="inicia sesion"></input>
                    <p>No tienes una cuenta aún?<Link id="link-login" to={"/register"}>registrate</Link></p> 
                </form>
            </div>
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
