import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { useHistory } from "react-router-dom";

export default (props) => {

    const history = useHistory();
    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();

    const volver_login = () => {
        let path = `/`;
        history.push(path);
    }

    // si el usuario no se ha loggeado, lo enviamos a hacerlo
    // si lo hizo, le mostramos un mensaje de bienvenida
    return (
        <div>
            {
                !usuario &&
                <div>
                    <p>Lo lamentamos, no ha hecho login, así que todavía no puede entrar aquí</p>
                    <button onClick={volver_login}>Ir al login</button>
                </div>
            }

            {
                usuario &&
                <p>bienvenido!</p>
            }
        </div>
    )
}

