export const DAR_EMAIL = 'DAR_EMAIL';
export const DAR_PASSW = 'DAR_PASSW';
export const DAR_PASSW_REP = 'DAR_PASSW_REP';
export const DAR_NOMBRE_USER = 'DAR_NOMBRE_USER';
export const DAR_ESTADO_TANDA = 'DAR_ESTADO_TANDA';

export const ADD_TICKETS = 'DAR_ARR_TICKETS';
export const FLUSH_TICKETS = 'FLUSH_TICKETS';


// Action creators
export function darEmail(email) {
    return { type: DAR_EMAIL, dada: email }
}

export function darPassword(password) {
    return { type: DAR_PASSW, dada: password };
}

export function darPasswordRepetido(password_repe) {
    return { type: DAR_PASSW_REP, dada: password_repe };
}

export function darNombreUsuario(nombre_usuario) {
    return { type: DAR_NOMBRE_USER, dada: nombre_usuario };
}

export function darEstadoTanda(estado_tanda) {
    return { type: DAR_ESTADO_TANDA, dada: estado_tanda };
}



export function addTicket(array_tickets) {
    return { type: ADD_TICKETS, dada: array_tickets };
}

export function flushTicket() {
    return { type: FLUSH_TICKETS};
}