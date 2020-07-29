import { createStore, combineReducers } from 'redux';
import produce from 'immer';
import { DAR_EMAIL, DAR_PASSW, DAR_PASSW_REP, DAR_NOMBRE_USER, ADD_TICKETS, FLUSH_TICKETS } from './actions';

const initialState = {
  nombre_usuario: "",
  email: "",
  password: "",
  password_repe: "",
  array_tickets: []
};

//const reducerAskturn = (state = initialState, action) => {
function actions(state = initialState, action) {

  switch (action.type) {

    case DAR_EMAIL:
      return {
        ...state,
        email: action.dada
      };

    case DAR_PASSW:
      return {
        ...state,
        password: action.dada
      };

    case DAR_PASSW_REP:
      return {
        ...state,
        password_repe: action.dada
      };

    case DAR_NOMBRE_USER:
      return {
        ...state,
        nombre_usuario: action.dada
      };

    default:
      return state;
  }
};

function funcionTickets(prevState = [], action) {

  switch (action.type) {
    case ADD_TICKETS:
      //return produce(prevState, draftState => { draftState.push(action); })
      return produce(prevState, draftState => {
        draftState.push({ activo: action.dada.activo, nombre: action.dada.nombre });
      })

    case FLUSH_TICKETS:
      return produce(prevState, draftState => {

        draftState.splice(0, draftState.length)
      })

    default:
      return prevState
  }
};

/*
export default createStore(
  reducerAskturn,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/

const todoApp = combineReducers({ actions, funcionTickets })
export default createStore(todoApp, {}, window.__REDUX_DEVTOOLS_EXTENSION__());