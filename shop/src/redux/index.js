import { createStore, combineReducers } from 'redux';
import produce from 'immer';
import { 
          DAR_EMAIL, DAR_PASSW, DAR_PASSW_REP, 
          DAR_NOMBRE_USER, ADD_TICKETS, FLUSH_TICKETS, 
          DAR_ESTADO_TANDA 
        } from './actions';

const initialState = {
  nombre_usuario: "",
  email: "",
  password: "",
  password_repe: "",
  estado_tanda: "false",
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

      case DAR_ESTADO_TANDA:
        console.log("actions redux tanda: ", action.dada);
        return {
          ...state,
          estado_tanda: action.dada
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
        draftState.push(
          { 
            activo: action.dada.activo,
            date_final: action.dada.date_final,
            date_inicio: action.dada.date_inicio,
            n_tanda_curso: action.dada.n_tanda_curso,
            n_total_clientes: action.dada.n_total_clientes,
            nombre: action.dada.nombre 
          });
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