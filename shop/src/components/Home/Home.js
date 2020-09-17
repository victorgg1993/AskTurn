import React from 'react';
import logo from "../logo/AskTurnLogo.svg";
import "./Home.css";
import "../css/global.css";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-center">
            <img className="logoHome" src={logo} alt=""></img>
            <Link to={"/register"} id="button-registre" >registrate</Link>
            <p className="register-p">Ya estas registrado? <Link to={"/login"} id="link-login-home">Iniciar sesión</Link></p>
        </div>
    )
}
