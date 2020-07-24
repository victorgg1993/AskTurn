//import React, { useState, useContext } from 'react';
import React from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect } from "react-router-dom";
import 'firebase/firestore';
//import { useSelector } from 'react-redux';  // activar cuando no esté el debug activo

const Panel = () => {

    //const _email = useSelector(store => store.email); // activar cuando no esté el debug activo

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    const trigg = async () => {

        let _email = "test@test.com"; // debug

        db.collection('tienda/' + _email + '/ticket').get()
            .then((snapshot) => {

                snapshot.forEach((doc) => {
                    console.log("ticket: ", doc.data());
                });
            })
            .catch((err) => {
                console.log('Error recibiendo los tickets', err);
            });

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


export default Panel;