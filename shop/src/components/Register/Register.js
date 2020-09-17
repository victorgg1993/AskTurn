//import React, { useState, useContext } from 'react';
import React, {useState} from 'react'
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { useHistory, Link} from "react-router-dom";
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../logo/AskTurnLogo.svg";
import './Register.css';
const { v1: uuidv1 } = require('uuid');


export default function Register(props) {

    const dispatch = useDispatch();

    const history = useHistory();
    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    const [texto_mensaje, setMensaje] = useState(''); // tira mensajes de error, aviso, etc

    const [nom_usuari, setNom_usuari] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_repetit, setPassword_repetit] = useState('');

    const esta_vacio = (dato) => {
        if (dato === "" || dato == null) {
            return true;
        }
        return false;
    }

    const ir_panel = () => {
        let path = `/panel`;
        history.push(path);
    }

    const registro = async (event) => {
        event.preventDefault();

        if (esta_vacio(password) || esta_vacio(password_repetit)) {
            setMensaje("Error, casilla de password vacío");
        }
        else if (password !== password_repetit) {
            setMensaje("Error, los passwords no coinciden");
        }
        else if (password.length < 6) {
            setMensaje("Error, el password ha de contener 6 o más caracteres");
        }
        else if (esta_vacio(email)) {
            setMensaje("Error, casilla de email vacío");
        }
        else {
            // creamos usuario

            await modulos_firebase.auth().createUserWithEmailAndPassword(email, password).then(
                (objeto) => {
                    // creamos estructura de datos para ese usuario

                    const ref_tienda = db.collection('tienda');
                        ref_tienda.doc(objeto.user.uid).set({
                            email: email,
                            nombre: nom_usuari,
                        });
                }
            ).catch(
                () => {
                    setMensaje("Error, el usuario ya existe!");
                }
            );

            //console.log("Apagado, ve a Registro.jsx, función registro y activa el await.");
            // delay con algún mensaje de todo bien
            // después:
            ir_panel();
        }
    }

    return (
        <div className="container">
            <div className="container-logo">
                <img className="logoRegister" src={logo} alt=""></img>
            </div>
                <div className="container-form">
                    <div className="form-title">
                        <h1>crear una cuenta</h1>
                        <form action="#" className="form">
                            <div className="form-field">
                                <label htmlFor="name" className="form-label">nombre de usuario</label>
                                <input type="text"  id="usuario" onChange={(evento) => setNom_usuari(evento.target.value)} className="form-input"></input>
                            </div>
                            <div className="form-field">
                                <label htmlFor="email" className="form-label">correo electrónico</label>
                                <input type="email" id="email" onChange={(evento) => setEmail(evento.target.value)} className="form-input"></input>
                            </div>
                            <div className="form-field">
                                <label htmlFor="password" className="form-label">contraseña</label>
                                <input type="password" id="password" onChange={(evento) => setPassword(evento.target.value)} className="form-input"></input>
                            </div>
                            <div className="form-field">
                                <label htmlFor="repeat-password" className="form-label">repetir contraseña</label>
                                <input type="password" id="password_repetit" onChange={(evento) => setPassword_repetit(evento.target.value)} className="form-input"></input>
                            </div>
                        
                            <input type="submit" onClick={registro} className="form-submit" value="Enviar"></input>
                            <p>Ya estas registrado? <Link id="link-login" to={"/login"}>iniciar sesión</Link></p> 
                        </form>
                    </div>
                </div>
        </div>
    )
}
