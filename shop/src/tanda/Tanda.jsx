import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';  // activar cuando no esté el debug activo
import 'firebase/firestore';


const Tanda = () => {

    const array_tickets = useSelector(store => store.funcionTickets);

    const mirar_tanda_desde_la_url = () => {
        let current_url = new URL(window.location.href);
        let search_params = current_url.searchParams;
        return (search_params.get('id'));
    };


    useEffect(() => {

        // temporal, haciendo pruebas
        let index = mirar_tanda_desde_la_url();
        let arr_tmp = array_tickets.slice(index, index+1 );
        arr_tmp = arr_tmp[0];
        console.log("index: ", index);
        console.log("arr tmp: ", arr_tmp );
        //console.log("nombre: ", arr_tmp.nombre); // tomamos el elemento que nos interesa

    }, []) // el segundo parámetro está por esto: https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect#answer-53074436


    return (
        <div>
            <p>tanda {mirar_tanda_desde_la_url()}</p>
        </div>
    )
}

export default Tanda;