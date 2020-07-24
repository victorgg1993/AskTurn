export const DAR_EMAIL = 'DAR_EMAIL';
export const DAR_PASSW = 'DAR_PASSW';
export const DAR_PASSW_REP = 'DAR_PASSW_REP';
export const DAR_NOMBRE_USER = 'DAR_NOMBRE_USER';

export const darEmail = (email) => ({ type: DAR_EMAIL, dada: email });
export const darPassword = (password) => ({ type: DAR_PASSW, dada: password });
export const darPasswordRepetido = (password_repe) => ({ type: DAR_PASSW_REP, dada: password_repe });
export const darNombreUsuario = (nombre_usuario) => ({ type: DAR_NOMBRE_USER, dada: nombre_usuario });