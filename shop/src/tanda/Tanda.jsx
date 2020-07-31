import React, { useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';  // activar cuando no esté el debug activo
import 'firebase/firestore';


const Tanda = () => {

    let estado_start_pause = 0;
    const array_tickets = useSelector(store => store.funcionTickets);

    const mirar_tanda_desde_la_url = () => {
        let current_url = new URL(window.location.href);
        let search_params = current_url.searchParams;
        return (search_params.get('id'));
    };


    useEffect(() => {

        // temporal, haciendo pruebas
        let index = mirar_tanda_desde_la_url();
        let arr_tmp = array_tickets.slice(index, index + 1);
        //arr_tmp = arr_tmp[0];
        console.log("index: ", index);
        console.log("arr completo: ", arr_tmp);
        console.log("arr 0: ", arr_tmp[0]);
        //console.log("nombre: ", arr_tmp.nombre); // tomamos el elemento que nos interesa

    }, [array_tickets]) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436




    const handler_start_pause = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();
        let obj_boton = document.getElementById('btn_pause_start_tanda');

        estado_start_pause = !estado_start_pause;

        if (estado_start_pause) {
            obj_boton.innerText = "Pause";
        }
        else {
            obj_boton.innerText = "Start";
        }
    }
    const handler_stop = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();
    }
    const handler_anterior = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();
    }
    const handler_siguiente = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();
    }


    return (
        <div>
            <p>tanda {mirar_tanda_desde_la_url()}</p>

            <p>
                <button id="btn_pause_start_tanda" onClick={handler_start_pause}>Start</button>
            </p>

            <p>
                <button onClick={handler_stop}>stop</button>
            </p>

            <p>
                <button onClick={handler_anterior}>anterior</button>
            </p>

            <p>
                <button onClick={handler_siguiente}>siguiente</button>
            </p>

            <p>
                <a href="/panel" >Volver al panel</a>
            </p>


        </div>
    )
}

export default Tanda;