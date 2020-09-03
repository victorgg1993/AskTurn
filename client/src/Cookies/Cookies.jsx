import 'firebase/auth';
import 'firebase/firestore';
//import { useCollection } from "react-firebase-hooks/firestore";

const { v1: uuidv1 } = require('uuid');

export function initCookie() {
    let cookie_uuid = getCookie('uuid');

    if (!cookie_uuid) {
        //console.log("no existe la cookie, la creamos");
        setCookie('uuid', uuidv1(), 1); // expira en un día porque las tandas no se reaprovechan
    }
    else {
        //console.log("Nueva cookie: ", getCookie('uuid'));
    }
}

export function setCookie(nom_cookie, valor, dies_expira) {
    let data = new Date();
    data.setTime(data.getTime() + (dies_expira * 24 * 60 * 60 * 1000));

    let expires = "expires=" + data.toUTCString();
    document.cookie = nom_cookie + "=" + valor + ";" + expires + ";path=/"; // uuid = $uuid_generada; expires = xx/xx/xx; path=/
}

export function getCookie(nom_cookie) {
    let nom = nom_cookie + "=";
    let contingut_cookie = decodeURIComponent(document.cookie);
    let params_cookie = contingut_cookie.split(';');

    for (let i = 0; i < params_cookie.length; i++) {

        let c = params_cookie[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nom) === 0) {
            return c.substring(nom.length, c.length);
        }
    }
    return "";
}
