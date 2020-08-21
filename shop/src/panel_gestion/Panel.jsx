//import React, { useState, useContext } from 'react';
import './Panel.css';
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

    const [n_tickets, setNumTickets] = useState(0);

    const history = useHistory();
    const dispatch = useDispatch();

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    /*
        let cerrar_listener = db.collection(`tienda/${usuario.uid}/ticket`)
            .onSnapshot(function () {
                console.log("Cambios en la DB! (panel)");
            });
            */


    const logout = async (e) => {
        e.preventDefault();
        await modulos_firebase.auth().signOut();
    }

    const crear_tanda = () => {
        // la magia ocurre en onClick_aceptar_tanda()
        let modal = document.getElementById("id_modal_crear_tanda");
        modal.style.display = "block";
    }

    const onClick_aceptar_tanda = (evento) => {
        evento.preventDefault();

        let modal = document.getElementById("id_modal_crear_tanda");
        let nombre_tanda = document.getElementById("id_nombre_tanda").value;

        const ref_tienda = db.collection(`tienda/${usuario.uid}/ticket`);

        ref_tienda.doc(`ticket_` + n_tickets).set({
            activo: true,
            date_final: firebase.firestore.Timestamp.fromDate(new Date()),
            date_inicio: firebase.firestore.Timestamp.fromDate(new Date()),
            n_tanda_curso: 0,
            n_total_clientes: 0,
            nombre: nombre_tanda,
        }).then(
            () => {
                modal.style.display = "none";
                window.location.reload();
            }
        );
    }

    const onClick_cancelar_tanda = () => {

        let modal = document.getElementById("id_modal_crear_tanda");

        if (modal !== undefined) {
            modal.style.display = "none";
        }
    }

    const borrar_tanda = () => {

        let puntero = document.getElementById(`id_lista_tickets`);

        if (puntero.selectedIndex >= 0) {

            let respuesta = window.confirm("Vas a eliminar la tanda. Aceptas?");

            if (respuesta === true) {
                db.collection(`tienda/` + usuario.uid + `/ticket`).doc(`ticket_` + puntero.selectedIndex).delete()
                    .then(function () {
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
            }
        }
    }

    const entrar_tanda = (evento, ticket, index) => {

        evento.stopPropagation();

        let modal = document.getElementById('modal_tickets');
        if (modal != null) {
            modal.show = 'display-block';
        }

        if (index < 0) {  // si no hay ninguna seleccionada, será la primera
            index = 0;
        }

        //console.log("Ticket num: " + index + ", nombre: " + ticket.nombre + " estado: " + ticket.activo + " .");
        history.push('/tanda?id=' + index);
    }

    useEffect(() => {

        if (usuario) { // si hay algún usuario loggeado, buscamos en firebase
            console.log("useEffect!");

            dispatch(flushTicket()); // vaciamos el array para tener los más nuevos de la DB

            db.collection('tienda/' + usuario.uid + '/ticket').get().then(
                (snapshot) => {

                    setNumTickets(snapshot.size); // apuntamos el número de tickets que hay ( usado en crear_tanda() )

                    snapshot.forEach(
                        (doc) => {
                            dispatch(addTicket(doc.data()));
                        }
                    );
                })
                .catch((err) => {
                    console.log('Error recibiendo los tickets', err);
                });


            /*
                        // temporal
                        db.collection("tienda").onSnapshot(function (querySnapshot) {
                            console.log("cambio en la DB!");
                        });
                        */

        }
    }, [dispatch, db, usuario]) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436

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



                    <div id="id_modal_crear_tanda" className="modal">
                        <div className="modal-content">
                            <form>
                                <label>Nombre de la tanda:</label>
                                <input type="text" id="id_nombre_tanda"></input><br />

                                <button onClick={onClick_aceptar_tanda}>Aceptar</button>
                                <button onClick={onClick_cancelar_tanda}>Cancelar</button>
                            </form>
                        </div>
                    </div>


                    <p>
                        <label>Elige un ticket:</label>
                        <select id="id_lista_tickets" size="3">{

                            array_tickets.map((ticket_actual, index) => (
                                <option key={index} onDoubleClick={
                                    (evento) => {
                                        entrar_tanda(evento, ticket_actual, index);
                                    }}>

                                    Nombre: {ticket_actual.nombre}      ID: {index}
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