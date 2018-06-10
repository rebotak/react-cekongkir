import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
import people from './people';
import cekongkir from './cekongkir';

export default combineReducers({
  router: routerReducer,
  // form: formReducer,
  people,
  cekongkir
});
