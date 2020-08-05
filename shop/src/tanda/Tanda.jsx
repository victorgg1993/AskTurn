import './tanda.css';
import React, { useEffect, useState } from 'react';
//import { Redirect } from "react-router-dom";
import { useFirebaseApp, useUser } from 'reactfire';
import { useSelector, useDispatch } from 'react-redux';  // activar cuando no esté el debug activo
import { addTicket } from '../redux/actions';
import 'firebase/auth';
import 'firebase/firestore';

const Tanda = () => {

    const modulos_firebase = useFirebaseApp();
    const db = modulos_firebase.firestore();
    const dispatch = useDispatch();
    const usuario = useUser();

    const arr_tickets = useSelector(store => store.funcionTickets);
    const [estado_tanda, setEstadoTanda] = useState(false);
    const [n_ticket, setIndiceTicket] = useState(0);

    const mirar_id_url = () => {
        let current_url = new URL(window.location.href);
        let search_params = current_url.searchParams;
        return (search_params.get('id'));
    };


    useEffect(() => {
        console.log("useEffect tanda");
        let id_url = mirar_id_url();
        setIndiceTicket(id_url);

        let botones = ['btn_stop', 'btn_anterior', 'btn_siguiente'];

        botones.map( // activamos / desactivamos cada botón en función del estado de la tanda
            (elemento) => {
                document.getElementById(elemento).disabled = (!estado_tanda);
            }
        );

        document.getElementById('btn_pause_start_tanda').innerText = (estado_tanda ? "Pause" : "Start");

        arr_tickets.map((elemento, indice) => {
            if (indice == id_url) {
                document.getElementById('id_texto_n_actual').innerText = elemento.n_tanda_curso;
                document.getElementById('id_texto_n_total').innerText = elemento.n_total_clientes;
            }
        });

    }, [arr_tickets, estado_tanda]) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436


    const updateDataTicket = (ticket) => {
        const ref_tienda = db.collection(`tienda/` + usuario.email + `/ticket`);

        ref_tienda.doc(`ticket_` + mirar_id_url()).set({
            activo: ticket.activo,
            date_final: ticket.date_final,
            date_inicio: ticket.date_inicio,
            n_tanda_curso: ticket.n_tanda_curso,
            n_total_clientes: ticket.n_total_clientes,
            nombre: ticket.nombre,
        });
    }

    const handler_start_pause = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();
        setEstadoTanda(!estado_tanda);
        
        let obj_boton = document.getElementById('btn_pause_start_tanda');
        (estado_tanda? obj_boton.innerText = "Pause": obj_boton.innerText = "Start");
    }

    const handler_stop = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();
    }

    const handler_anterior = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();

        if (arr_tickets[n_ticket].n_tanda_curso > 0) {
            arr_tickets[n_ticket].n_tanda_curso--;
            console.log("numero tanda: ", arr_tickets[n_ticket].n_tanda_curso);
            dispatch(addTicket(arr_tickets));
            // enviar por firebase
            updateDataTicket(arr_tickets[n_ticket]);
        }
    }

    const handler_siguiente = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();

        if (arr_tickets[n_ticket].n_tanda_curso < arr_tickets[n_ticket].n_total_clientes) {
            arr_tickets[n_ticket].n_tanda_curso++;
            dispatch(addTicket(arr_tickets));
            // enviar por firebase
            updateDataTicket(arr_tickets[n_ticket]);
        }
    }


    return (
        <div>

            <p>
                Actual:
                <textarea readOnly id="id_texto_n_actual" rows="1" cols="3" wrap="hard">
                </textarea>
            </p>

            <p>
                Total:
                <textarea readOnly id="id_texto_n_total" rows="1" cols="3" wrap="hard">
                </textarea>
            </p>


            <p>
                <button id="btn_pause_start_tanda" onClick={handler_start_pause}>Start</button>
            </p>

            <p>
                <button id="btn_stop" onClick={handler_stop}>stop</button>
            </p>

            <p>
                <button id="btn_anterior" onClick={handler_anterior}>anterior</button>
            </p>

            <p>
                <button id="btn_siguiente" onClick={handler_siguiente}>siguiente</button>
            </p>

            <p>
                <a href="/panel" >Volver al panel</a>
            </p>


        </div>
    )
}

export default Tanda;