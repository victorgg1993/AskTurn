import React from 'react'
import './Footer.css';

export default function Footer(props) {

    return (
        <div className="sec-button">
            <button id="btn_unirse_tanda" className="button" onClick={props.handler} >{props.buttonTitle}</button>
        </div>
    )
}
