import Shop from './Shop/Shop'
import Search from './Search/Search';

// pendiente de sacar
import chickens from './icons/chickens.svg';
//import fish from './icons/fish.svg';
//import cheese from './icons/cheese.svg';
//import meat from './icons/meat.svg';
//import wine from './icons/wine.svg';

// nuevo
import React, { useEffect } from 'react';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
//import { useHistory } from "react-router-dom";
import { useFirebaseApp, useUser } from 'reactfire';
import { initCookie } from '../../Cookies/Cookies';
import { addTicket, flushTicket } from '../../redux/actions';

export default function Shops() {

    // nuevo
    const array_tickets = useSelector(store => store.funcionTickets);

    //const history = useHistory();
    const dispatch = useDispatch();

    const modulos_firebase = useFirebaseApp();
    const usuario = useUser();
    const db = modulos_firebase.firestore();

    initCookie();

    useEffect(() => {
        console.log("useEffect cliente, ventana shops.js");

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

    
    // el key ={index} es redundante, para que no se
    // queje de que no hay un key único para cada elemento
    return (
        <div>
            <Search />
            {
                array_tickets.map((ticket_actual, index) =>
                    (
                        <Shop
                            key={index}
                            id_tienda={ticket_actual.id_tienda}
                            id_ticket={ticket_actual.id_ticket}
                            name={ticket_actual.nombre}
                            shopId={index}
                            icon={chickens}
                        />
                    ))
            }
        </div>
    )
}
