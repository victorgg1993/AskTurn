import './tanda.css';
import React, { useState } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';
import 'firebase/firestore';
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';

const Tanda = () => {

    const history = useHistory();

    const modulos_firebase = useFirebaseApp();
    const db = modulos_firebase.firestore();
    const usuario = useUser();

    const [estado_tanda, setEstadoTanda] = useState(false);
    let ticket_tmp = [];

    // leemos la DB cuando hayan cambios
    let cerrar_listener = db.collection(`tienda/${usuario.uid}/ticket`)
        .onSnapshot(function () {
            console.log("Cambios en la DB! (tienda)");

            const ref_tienda = db.collection(`tienda/` + usuario.uid + `/ticket`);

            ref_tienda.doc(`ticket_` + mirar_id_url()).get().then(
                (snapshot) => {
                    updateDataUI(snapshot.data(), estado_tanda);
                    ticket_tmp = snapshot.data();
                }
            );
        });


    const mirar_id_url = () => {
        let current_url = new URL(window.location.href);
        let search_params = current_url.searchParams;
        return (search_params.get('id'));
    };

    const updateDataUI = (ticket, e_tanda) => {

        let botones = ['btn_stop', 'btn_anterior', 'btn_siguiente'];

        botones.map( // activamos / desactivamos cada botón en función del estado de la tanda
            (elemento) => {

                let tmp_btns = document.getElementById(elemento);

                if (tmp_btns != null) {
                    tmp_btns.disabled = (!e_tanda);
                }
            }
        );

        let tmp_btn_ps_tanda = document.getElementById('btn_pause_start_tanda');

        if (tmp_btn_ps_tanda != null) {
            tmp_btn_ps_tanda.innerText = (e_tanda ? "Pause" : "Start");
        }

        let tmp_txt_n_actual = document.getElementById('id_texto_n_actual');
        let tmp_txt_n_total = document.getElementById('id_texto_n_total');

        if (ticket !== undefined) {
            tmp_txt_n_actual.innerText = ticket.n_tanda_curso;
            tmp_txt_n_total.innerText = ticket.n_total_clientes;
        }
    }

    const updateDataTicket = (ticket) => {

        const ref_tienda = db.collection(`tienda/` + usuario.uid + `/ticket`);

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
        evento.preventDefault(); //evento.stopPropagation();

        setEstadoTanda(!estado_tanda);

        let obj_boton = document.getElementById('btn_pause_start_tanda');
        (estado_tanda ? obj_boton.innerText = "Pause" : obj_boton.innerText = "Start");

    }

    const handler_stop = (evento) => {
        evento.preventDefault(); //evento.stopPropagation();

        ticket_tmp.activo = false;
        ticket_tmp.date_final = firebase.firestore.Timestamp.fromDate(new Date()); // la fecha final es al darle a stop
        updateDataTicket(ticket_tmp);

        cerrar_listener();
        history.push('/panel');
    }

    const handler_anterior = (evento) => {
        evento.preventDefault(); //evento.stopPropagation();

        console.log("anterior ticket_tmp : ", ticket_tmp);

        if (ticket_tmp !== undefined) {
            if (ticket_tmp.n_tanda_curso > 1) {
                ticket_tmp.n_tanda_curso--;
                updateDataTicket(ticket_tmp);   // enviar por firebase
            }
        }
    }

    const handler_siguiente = (evento) => {
        evento.preventDefault(); //evento.stopPropagation();

        console.log("siguiente ticket tmp : ", ticket_tmp);

        if (ticket_tmp !== undefined) {

            if (ticket_tmp.n_tanda_curso < ticket_tmp.n_total_clientes) {
                ticket_tmp.n_tanda_curso++;
                updateDataTicket(ticket_tmp);   // enviar por firebase
            }
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

            <p><button id="btn_pause_start_tanda" onClick={handler_start_pause}>Start</button></p>
            <p><button id="btn_stop" onClick={handler_stop}>Stop</button></p>
            <p><button id="btn_anterior" onClick={handler_anterior}>Anterior</button></p>

            <p><button id="btn_siguiente" onClick={handler_siguiente}>Siguiente</button></p>
            <p><a href="/panel" >Volver al panel</a></p>
        </div>
    )
}

export default Tanda;