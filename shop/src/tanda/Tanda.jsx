import './tanda.css';
import React, { useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';  // activar cuando no esté el debug activo
import * as actions from '../redux/actions';
//import { addTicket, flushTicket } from '../redux/actions';

import 'firebase/firestore';


const Tanda = () => {

    const dispatch = useDispatch();

    const array_tickets = useSelector(store => store.funcionTickets);
    const estado_tanda = useSelector(store => store.estado_tanda);
    
    const mirar_id_url = () => {
        let current_url = new URL(window.location.href);
        let search_params = current_url.searchParams;
        return (search_params.get('id'));
    };


    useEffect(() => {
        console.log("useEffect tanda");
                
        console.log("estado_tanda", estado_tanda);

        
        if (estado_tanda) { // start
            document.getElementById("btn_stop").disabled = false;
            document.getElementById("btn_anterior").disabled = false;
            document.getElementById("btn_siguiente").disabled = false;
        }
        else { // pause
            document.getElementById("btn_stop").disabled = true;
            document.getElementById("btn_anterior").disabled = true;
            document.getElementById("btn_siguiente").disabled = true;    
        }


        let obj_n_actual = document.getElementById('id_texto_n_actual');
        let obj_n_total = document.getElementById('id_texto_n_total');

        array_tickets.map((elemento, indice) => {

            if (indice == mirar_id_url()) {
                console.log("elemento: ", elemento);
                obj_n_actual.innerText = elemento.n_tanda_curso;
                obj_n_total.innerText = elemento.n_total_clientes;
            }
        });

    }, [array_tickets, estado_tanda]) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436




    const handler_start_pause = (evento) => {
        evento.preventDefault();
        //evento.stopPropagation();

        console.log("valor estado start pause: ", estado_tanda);

        let obj_boton = document.getElementById('btn_pause_start_tanda');

        //dispatch(actions.darEstadoTanda(!estado_tanda)); 


        if (estado_tanda === 'true') {
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