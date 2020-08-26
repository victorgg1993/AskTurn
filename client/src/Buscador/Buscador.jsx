//import React, { useState, useContext } from 'react';
import './Buscador.css';
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect, useHistory } from "react-router-dom";
import 'firebase/firestore';
import firebase from 'firebase/app';
import { useSelector, useDispatch } from 'react-redux';  // activar cuando no esté el debug activo
import { addTicket, flushTicket } from '../redux/actions';
//import { useCollection } from "react-firebase-hooks/firestore";

const Panel = () => {

    const array_tickets = useSelector(store => store.funcionTickets);

    const history = useHistory();
    const dispatch = useDispatch();

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();



    const entrar_tanda = (evento, index) => {
        evento.stopPropagation();
        history.push('/ticket?tienda=' + array_tickets[index].id_tienda + '+ticket=' + array_tickets[index].id_ticket);
    }


    useEffect(() => {
        console.log("useEffect cliente!");

        dispatch(flushTicket()); // vaciamos el array para tener los más nuevos de la DB

        let id_tiendas = [];

        db.collection('tienda/').get().then(
            (snapshot) => {
                snapshot.forEach(
                    (doc) => {
                        id_tiendas.push(doc.id);
                        //console.log("dbg: ", doc.id);
                    }
                );
            }
        ).then(
            () => {

                id_tiendas.forEach(

                    (id_tienda) => {
                        db.collection('tienda/' + id_tienda + '/ticket').get().then(
                            (snapshot) => {
                                snapshot.forEach(
                                    (doc) => {
                                        if (doc.data().activo) {
                                            
                                            let t = doc.data();
                                            t.id_tienda = id_tienda;
                                            t.id_ticket = doc.id;
                                            dispatch(addTicket(t));
                                        }
                                    }
                                );
                            }).catch((err) => {
                                console.log('Error recibiendo los tickets', err);
                            });
                    }
                );
            }
        );

    }, [dispatch, db, usuario]) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436

    return (
        <div>
            <p>Bienvenido!</p>

            <p>
                <label>Elige un ticket:</label>
            </p>
            <p>
                <select id="id_lista_tickets" size="3">{

                    array_tickets.map((ticket_actual, index) => (
                        <option key={index} onDoubleClick={
                            (evento) => {
                                entrar_tanda(evento, index);
                            }}>

                            Nombre: {ticket_actual.nombre}      ID: {index}
                        </option>
                    ))
                }
                </select>
            </p>

        </div>

    )
}


export default Panel;