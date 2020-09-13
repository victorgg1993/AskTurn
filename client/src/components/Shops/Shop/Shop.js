import React from 'react'
import iconGo from '../icons/iconGo.svg';
import '../../css/global.css';
import './shop.css';
import { Link } from 'react-router-dom';

export default function Shop(props) {
    return (
        <Link to={`/ticket/${props.shopId}/${props.id_tienda}/${props.id_ticket}`} id="id_bloque_tienda">
            <section>
                <h2>{props.name}</h2>
                <img src={props.icon} alt=""></img>
                <img src={iconGo} alt=""></img>
            </section>
        </Link>
    )
}