
import ShopHeader from './ShopHeader/ShopHeader';
import CountDown from './CountDown/CountDown';
import Turns from './Turns/Turns';
import Footer from './Footer/Footer';

// nuevo
import React, { useState } from 'react';
//import React, { useState, useEffect } from 'react';
import { getCookie } from '../../Cookies/Cookies';
import { useFirebaseApp } from 'reactfire';

export default function ShopsDashboard(props) {

    const modulos_firebase = useFirebaseApp();
    const db = modulos_firebase.firestore();
    const [turnoActual, setTurnoActual] = useState(0);
    const [tituloBoton, setTituloBoton] = useState('Conectando...');
    const [tuTurno, setTuTurno] = useState(0);
    const [nombreTienda, setNombreTienda] = useState('Conectando...');
    const [estaDentro, setEstaDentro] = useState(0);

    // leemos la DB cuando hayan cambios
    //let cerrar_listener = 
    db.collection("/tienda/" + props.match.params.id_tienda + "/ticket")
        .onSnapshot(function () {
            updateFromDB();
        });

    const updateFromDB = () => {
        const ref_tienda = db.collection("/tienda/" + props.match.params.id_tienda + "/ticket");
        ref_tienda.doc(props.match.params.id_ticket).get().then(
            (snapshot) => {
                console.log("Cambios DB (cliente)");
                getTicket(props.match.params.id_tienda, props.match.params.id_ticket);
                updateDataUI(snapshot.data(), estaDentro);
            }
        );
    }

    const updateDataUI = (ticket, dentroTanda) => {
        setTurnoActual(ticket.n_tanda_curso);
        setNombreTienda(ticket.nombre);
        let obj_boton = document.getElementById('btn_unirse_tanda');

        if (obj_boton) {
            if (dentroTanda) {
                obj_boton.disabled = true;
                setTituloBoton("Unido");
            }
            else {
                obj_boton.disabled = false;
                setTituloBoton("Unirse a la fila");
            }
        }
    }

    const handler_buton_unirse = (evento) => {
        console.log("handler boton unirse");
        evento.preventDefault(); //evento.stopPropagation();
        setTicket(props.match.params.id_tienda, props.match.params.id_ticket);
    }

    const setTicket = (id_tienda, id_ticket) => {

        let existe_ticket;
        const ref_tienda = db.collection("/tienda/" + id_tienda + "/ticket/" + id_ticket + '/clientes');

        ref_tienda.doc(getCookie('uuid')).get()
            .then(
                (snapshot) => {
                    existe_ticket = snapshot.data();
                }
            ).then(
                () => {
                    if (!existe_ticket) {  // Mirar si existe la uuid dentro del ticket. No existe, la creamos:
                        ref_tienda.get().then(
                            (snapshot) => {
                                // añadimos el cliente en la lista de tickets
                                ref_tienda.doc(getCookie('uuid')).set({
                                    num_ticket: (snapshot.size + 1),
                                    esta_dentro: true
                                }).then(
                                    ()=>{
                                        updateFromDB();
                                    }
                                );
                            }
                        )
                    }
                }
            );
    }

    const getTicket = (id_tienda, id_ticket) => {
        const ref_tienda = db.collection("/tienda/" + id_tienda + "/ticket/" + id_ticket + '/clientes');
        ref_tienda.doc(getCookie('uuid')).get()
            .then(
                (snapshot) => {
                    if (snapshot.data()) {
                        setEstaDentro(snapshot.data().esta_dentro);
                        setTuTurno(snapshot.data().num_ticket);
                    }
                }
            );
    }

    return (
        <div>
            <ShopHeader name={nombreTienda} shopId={props.match.params.shopId} />
            <CountDown />
            <Turns title={"Turno actual"} turnNumber={turnoActual} />
            <Turns title={"Tu turno"} turnNumber={tuTurno} />
            <Footer handler={handler_buton_unirse} buttonTitle={tituloBoton} />
        </div>
    )
}