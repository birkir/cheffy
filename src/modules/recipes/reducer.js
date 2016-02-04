import {
  CREATE_RECIPE_SUCCESS,
  READ_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS
} from './action-types';


export const initialState = {
  deleted: null,
  selected: null,
  list: [],
  previous: []
};


export function recipesReducer (state = initialState, action) {
  switch (action.type) {

    case READ_RECIPE_SUCCESS:

      return {
        deleted: null,
        selected: action.payload,
        list: [],
        previous: []
      };

    case CREATE_RECIPE_SUCCESS:

      let list;

      if (state.deleted && state.deleted.key === action.payload.key) {
        list = [...state.previous];
      }
      else {
        list = [action.payload, ...state.list];
      }

      return {
        deleted: null,
        selected: null,
        list,
        previous: []
      };


    case DELETE_RECIPE_SUCCESS:

      return {
        deleted: action.payload,
        selected: null,
        list: state.list.filter(task => {
          return task.key !== action.payload.key;
        }),
        previous: [ ...state.list ]
      };


    case UPDATE_RECIPE_SUCCESS:

      return {
        deleted: null,
        selected: null,
        list: state.list.map(task => {
          return task.key === action.payload.key ? action.payload : task;
        }),
        previous: []
      };

    default:
      return state;
  }
}
