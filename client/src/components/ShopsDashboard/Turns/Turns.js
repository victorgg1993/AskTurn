import React from 'react'
import './Turns.css';

export default function Turns(props) {
    return (
        <section className='StylesShop'>
            <p className="text">{props.title}</p>
            <div className="turn">{("0" + props.turnNumber).slice(-2)}</div>
        </section>
    )
}
