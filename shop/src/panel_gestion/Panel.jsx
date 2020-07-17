import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect } from "react-router-dom";

export default (props) => {

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();

    const logout = async () => {
        await modulos_firebase.auth().signOut();
    }

    // si el usuario no se ha loggeado, lo enviamos a hacerlo
    // si lo hizo, le mostramos un mensaje de bienvenida
    return (
        <div>
            {
                !usuario &&
                <div>
                    <Redirect to={'/'} />
                </div>
            }

            {
                usuario &&
                <div>
                    <p>bienvenido!</p>
                    <p>
                        <button onClick={logout}>Logout</button>
                    </p>
                </div>
            }

        </div>
    )
}