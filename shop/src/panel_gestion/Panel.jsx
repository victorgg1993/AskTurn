//import React, { useState, useContext } from 'react';
import React, { useEffect } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect } from "react-router-dom";
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';  // activar cuando no esté el debug activo
import { addTicket } from '../redux/actions';

const Panel = () => {

    //const _email = useSelector(store => store.email); // activar cuando no esté el debug activo
    const array_tickets = useSelector(store => store.funcionTickets);

    const dispatch = useDispatch();

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    const logout = async () => {
        await modulos_firebase.auth().signOut();
    }

    const crear_tanda = () => {
        console.log("función crear tanda, falta implementar");
    }

    const borrar_tanda = () => {
        console.log("función borrar tanda, falta implementar");
    }

    const entrar_tanda = (evento, ticket, index) => {

        evento.stopPropagation();

        //let lista = document.getElementById('id_lista_tickets').selectedIndex;

        //if (lista < 0) // si no hay ninguna seleccionada, será la primera
        //{
        //  lista = 0;
        //}
        //console.log("Tanda " + lista + " seleccionada!");

        console.log("Ticket num: " + index + ", nombre: " + ticket.nombre + " seleccionado");
    }

    useEffect(() => {
        console.log("useEffect!");

        let _email = "test@test.com"; // debug

        db.collection('tienda/' + _email + '/ticket').get()
            .then((snapshot) => {
                snapshot.forEach(
                    (doc) => {
                        dispatch(addTicket(doc.data()));
                    }
                );
            })
            .catch((err) => {
                console.log('Error recibiendo los tickets', err);
            });
    }, []) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436

    return (
        <div>
            {
                // si el usuario no se ha loggeado, lo enviamos a hacerlo
                !usuario &&
                <div>
                    <Redirect to={'/'} />
                </div>
            }

            {
                // si lo hizo, le mostramos un mensaje de bienvenida
                usuario &&
                <div>
                    <p>Bienvenido!</p>

                    <p>
                        <label>Elige un ticket:</label>
                        <select id="id_lista_tickets" size="3">
                            {
                                array_tickets.map((ticket_actual, index) => (
                                    <option onDoubleClick={(evento) => { entrar_tanda(evento, ticket_actual, index) }} key={index}>
                                        Nombre: {ticket_actual.nombre}
                                     ---   Activo: {ticket_actual.activo ? "Sí" : "No"}
                                    </option>
                                ))}
                        </select>
                    </p>

                    <p>
                        <button onClick={crear_tanda}>crear tanda</button>
                    </p>

                    <p>
                        <button onClick={borrar_tanda}>borrar tanda</button>
                    </p>

                    <p>
                        <button onClick={logout}>Logout</button>
                    </p>
                </div>
            }

        </div>
    )
}


export default Panel;