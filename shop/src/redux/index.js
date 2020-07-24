import { createStore } from 'redux';
import { DAR_EMAIL, DAR_PASSW, DAR_PASSW_REP, DAR_NOMBRE_USER} from './actions';

const initialState = {
  nombre_usuario: "",
  email: "",
  password: "",
  password_repe: ""
};

const counterReducer = (state = initialState, action) => {
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

export default createStore(
  counterReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
