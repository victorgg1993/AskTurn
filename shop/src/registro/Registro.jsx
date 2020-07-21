import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { useHistory } from "react-router-dom";


export default (props) => {

    const history = useHistory();
    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    const [texto_mensaje, setMensaje] = useState('');

    const [nom_usuari, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_repetit, setPassword_repetit] = useState('');

    const esta_vacio = (dato) => {
        if (dato === "" || dato == null) {
            return true;
        }
        return false;
    }

    const registro = async () => {

        if (esta_vacio(password) || esta_vacio(password_repetit)) {
            setMensaje("Error, casilla de password vacío");
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
                () => {
                    // creamos estructura de datos
                    const ref_tienda = db.collection('tienda');
                    ref_tienda.doc(email).set({
                        email: email,
                        nombre: nom_usuari,
                    });
                }
            ).catch(
                ()=>{
                    setMensaje("Error, el usuario ya existe!");
                }
            );

            //console.log("Apagado, ve a Registro.jsx, función registro y activa el await.");
            // delay con algún mensaje de todo bien
            // después:
            //volver_login();
        }
    }

    const volver_login = () => {
        let path = `/`;
        history.push(path);
    }

    return (
        <div>
            <p>registro!</p>

            <p id="id_mensajes_registro">{texto_mensaje}</p>

            <p>
                <label htmlFor="usuario">Nombre de usuario:</label>
                <input type="text" id="usuario" onChange={(evento) => setNombreUsuario(evento.target.value)} />
            </p>

            <p>
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id="email" onChange={(evento) => setEmail(evento.target.value)} />
            </p>

            <p>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(evento) => setPassword(evento.target.value)} />
            </p>

            <p>
                <label htmlFor="password_repetit">Repite password:</label>
                <input type="password" id="password_repetit" onChange={(evento) => setPassword_repetit(evento.target.value)} />
            </p>

            <p>
                <button onClick={registro} >Registrarse</button>
            </p>

            <p>
                <button onClick={volver_login} >Volver al login</button>
            </p>
        </div>
    )
}
