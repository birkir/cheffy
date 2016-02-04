import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

// Reducers
import { authReducer } from 'modules/auth';
import { firebaseReducer } from 'modules/firebase';
import { recipesReducer } from 'modules/recipes';


export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  routing: routeReducer,
  recipes: recipesReducer
});
