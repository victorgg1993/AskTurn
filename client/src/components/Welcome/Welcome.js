import React, { useEffect } from "react";
import logo from "./AskTurnLogo.svg";
import "./welcome.css";
import "../css/global.css";

export default function Welcome({ history }) {
  useEffect(() => {

    setTimeout(() => { history.push("/shops") }, 3000)
  });

  return (
    <div className="logo">
      <img alt="logo empresa" src={logo}></img>
    </div>
  );
}
