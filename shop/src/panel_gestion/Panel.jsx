//import React, { useState, useContext } from 'react';
import React, { useEffect } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect, useHistory } from "react-router-dom";
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';  // activar cuando no esté el debug activo
//import { addTicket, flushTicket } from '../redux/actions';
import { addTicket } from '../redux/actions';

const Panel = () => {

    //const _email = useSelector(store => store.email); // activar cuando no esté el debug activo
    const array_tickets = useSelector(store => store.funcionTickets);

    const history = useHistory();
    const dispatch = useDispatch();

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    const logout = async (e) => {
        e.preventDefault();
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

        let modal = document.getElementById('modal_tickets');
        modal.show = 'display-block';

        if (index < 0) {  // si no hay ninguna seleccionada, será la primera
            index = 0;
        }

        //console.log("Ticket num: " + index + ", nombre: " + ticket.nombre + " estado: " + ticket.activo + " .");
        history.push('/tanda?id=' + index);
    }

    useEffect(() => {

        if (usuario) { // si hay algún usuario loggeado, buscamos en firebase
            let _email = "test@test.com"; // debug

            console.log("useEffect!");

           //dispatch(flushTicket()); // vaciamos el array para tener los más nuevos de la DB

            db.collection('tienda/' + _email + '/ticket').get().then(
                (snapshot) => {
                    snapshot.forEach(
                        (doc) => {
                            dispatch(addTicket(doc.data()));
                        }
                    );
                })
                .catch((err) => {
                    console.log('Error recibiendo los tickets', err);
                });
        }
    }, [dispatch, db , usuario]) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436

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

                    <div id="modal_tickets" className="modal display-block">
                        <section className="modal-main">
                            <button >close</button>
                        </section>
                    </div>

                    <p>
                        <label>Elige un ticket:</label>
                        <select id="id_lista_tickets" size="3">{

                            array_tickets.map((ticket_actual, index) => (
                                <option key={index} onDoubleClick={

                                    (evento) => {
                                        entrar_tanda(evento, ticket_actual, index)
                                    }}>

                                    Nombre: {ticket_actual.nombre}   ID: {index}
                                </option>
                            ))
                        }
                        </select>
                    </p>

                    <p>
                        <button onClick={crear_tanda}>crear tanda</button>
                    </p>

                    <p>
                        <button onClick={borrar_tanda}>borrar tanda</button>
                    </p>

                    <p>
                        <a href="/logout" onClick={logout}>Logout</a>
                    </p>
                </div>
            }

        </div>
    )
}


export default Panel;