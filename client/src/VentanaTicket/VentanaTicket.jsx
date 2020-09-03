import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import { Redirect, useHistory } from "react-router-dom";
import 'firebase/firestore';
import firebase from 'firebase/app';
import { useSelector, useDispatch } from 'react-redux';  // activar cuando no esté el debug activo
import { addTicket, flushTicket } from '../redux/actions';
import { initCookie, setCookie, getCookie } from '../Cookies/Cookies';
//import { useCollection } from "react-firebase-hooks/firestore";

const VentanaTicket = () => {

  const history = useHistory();

  const modulos_firebase = useFirebaseApp();
  const db = modulos_firebase.firestore();
  const usuario = useUser();

  const [estado_tanda, setEstadoTanda] = useState(false);
  const [ticket_actual, setTicketActual] = useState(0);
  let ticket_tmp = [];

  const mirar_id_url = (reg) => {
    let current_url = new URL(window.location.href);
    let search_params = current_url.searchParams;
    return (search_params.get(reg));
  };


  // leemos la DB cuando hayan cambios
  let cerrar_listener = db.collection("/tienda/" + mirar_id_url('tienda') + "/ticket")
    .onSnapshot(function () {

      //console.log("cookie: ", getCookie('uuid'));

      const ref_tienda = db.collection("/tienda/" + mirar_id_url('tienda') + "/ticket");
      ref_tienda.doc(mirar_id_url('ticket')).get().then(
        (snapshot) => {
          console.log("Cambios DB (cliente)");
          updateDataUI(snapshot.data(), 0);
          //ticket_tmp = snapshot.data();
        }
      );

    });

  const updateDataUI = (ticket, e_tanda) => {

    let botones = ['btn_salir', 'btn_unirse'];

    botones.map( // activamos / desactivamos cada botón en función del estado de la tanda
      (elemento) => {

        let tmp_btns = document.getElementById(elemento);

        if (tmp_btns != null) {
          // tmp_btns.disabled = (!e_tanda);
        }
      }
    );

    let tmp_text_id_titulo_tanda = document.getElementById('id_titulo_tanda');
    let tmp_text_ticket_actual = document.getElementById('id_ticket_actual');
    let tmp_text_tu_turno = document.getElementById('id_tu_turno');

    if (ticket !== undefined) {
      tmp_text_id_titulo_tanda.innerText = ticket.nombre;
      tmp_text_ticket_actual.innerText = ticket.n_tanda_curso;
      tmp_text_tu_turno.innerText = ticket_actual;
    }
  }

  const handler_unirse = (evento) => {
    evento.preventDefault(); //evento.stopPropagation();
    let existe_ticket;

    const ref_tienda = db.collection("/tienda/" + mirar_id_url('tienda') + "/ticket/" + mirar_id_url('ticket') + '/clientes');
    ref_tienda.doc(getCookie('uuid')).get()
      .then(
        (snapshot) => {
          existe_ticket = snapshot.data();
        }
      ).then(
        () => {
          if (existe_ticket) {
            console.log("Existe");
            setTicketActual(existe_ticket.num_ticket);
          }
          else { // 0. mirar si existeix la uuid dins del ticket
            console.log("No existe, lo creamos");

            let n_total_clients = 0;
            ref_tienda.get().then(
              (snapshot) => {
                n_total_clients = snapshot.size;
                setTicketActual((n_total_clients + 1));

                // añadimos el cliente en la lista de tickets
                ref_tienda.doc(getCookie('uuid')).set({
                  num_ticket: (n_total_clients + 1)
                });
              }
            )
          }
        }
      );

    setEstadoTanda(!estado_tanda);
    let obj_boton = document.getElementById('btn_unirse');
    obj_boton.disabled = (estado_tanda ? false : true);
  }

  const handler_salir = (evento) => {
    evento.preventDefault(); //evento.stopPropagation();

    //ticket_tmp.activo = false;
    //ticket_tmp.date_final = firebase.firestore.Timestamp.fromDate(new Date()); // la fecha final es al darle a stop
    //updateDataTicket(ticket_tmp);

    cerrar_listener();
    history.push('/');
  }

  /*
 <p>
        Tiempo restante:
              <textarea readOnly id="id_tiempo_restante" rows="1" cols="3" wrap="hard">
        </textarea>
      </p>
*/

return (
    <div>

      <h2 id="id_titulo_tanda" ></h2>
     
      <p>
        Ticket actual:
              <textarea readOnly id="id_ticket_actual" rows="1" cols="3" wrap="hard">
        </textarea>
      </p>

      <p>
        Tu turno:
              <textarea readOnly id="id_tu_turno" rows="1" cols="3" wrap="hard">
        </textarea>
      </p>

      <p><button id="btn_unirse" onClick={handler_unirse}>Unirse</button></p>
      <p><button id="btn_salir" onClick={handler_salir}>Salir</button></p>
    </div>
  )
}

export default VentanaTicket;
