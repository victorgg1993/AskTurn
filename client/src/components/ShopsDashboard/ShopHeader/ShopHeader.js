import React from 'react'
import './ShopHeader.css';
import iconReturn from './iconReturn.svg';
import { Link } from 'react-router-dom';

export default function ShopHeader(props) {

    return (
        <header className="container-1">
            <Link to='/shops'><img src={iconReturn} alt=""></img></Link>
            <h1>{props.name}</h1>
            <p></p>
        </header>
    )
}
