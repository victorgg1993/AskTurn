import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect } from "react-router-dom";
import 'firebase/firestore';

export default (props) => {

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    const trigg = async () => {

        db.collection('tienda').doc(usuario.uid).get().then(
            (consulta) => {
                console.log("consulta: ", consulta.data());
            }
        );

        /*
        // read
                db.collection('tienda').get()
                    .then((snapshot) => {
        
                        snapshot.forEach((doc) => {
        
                            if (doc.data().uid_login_tienda === usuario.uid) // si es la tienda del usuario actual
                            {
                                console.log(doc.data());
                            }
                        });
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    });
        */
    }


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
                        <button onClick={trigg}>temporal</button>
                        <button onClick={logout}>Logout</button>
                    </p>

                </div>
            }

        </div>
    )
}