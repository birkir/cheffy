import {
  CREATE_RECIPE_ERROR,
  CREATE_RECIPE_SUCCESS,
  READ_RECIPE_ERROR,
  READ_RECIPE_SUCCESS,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE_SUCCESS,
  DELETE_RECIPE_ERROR,
  DELETE_RECIPE_SUCCESS
} from './action-types';


export function createRecipe (title) {
  return (dispatch, getState) => {

    const { auth, firebase } = getState();

    firebase.child(`recipes`)
    .push({
      completed: false,
      title
    }, error => {
      if (error) {
        console.error('ERROR @ createRecipe :', error); // eslint-disable-line no-console
        dispatch({
          type: CREATE_RECIPE_ERROR,
          payload: error
        });
      }
    });
  };
}


export function deleteRecipe(task) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}/${task.key}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteTask :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_RECIPE_ERROR,
            payload: error
          });
        }
      });
  };
}


export function undeleteRecipe() {
  return (dispatch, getState) => {
    const { auth, firebase, tasks } = getState();
    const task = tasks.deleted;

    firebase.child(`tasks/${auth.id}/${task.key}`)
      .set({completed: task.completed, title: task.title}, error => {
        if (error) {
          console.error('ERROR @ undeleteTask :', error); // eslint-disable-line no-console
        }
      });
  };
}


export function updateRecipe(task, changes) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}/${task.key}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateTask :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_RECIPE_ERROR,
            payload: error
          });
        }
      });
  };
}


export function registerListeners(recipeId = null) {

  if (recipeId) {
    return (dispatch, getState) => {
      const { auth, firebase } = getState();
      const ref = firebase.child(`recipes/${recipeId}`);

      ref.on('value', snapshot => {
        console.log(snapshot);
        return dispatch({
          type: READ_RECIPE_SUCCESS,
          payload: recordFromSnapshot(snapshot)
        });
      });
    };
  }

  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.child('recipes');

    ref.on('child_added', snapshot => dispatch({
      type: CREATE_RECIPE_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_RECIPE_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_RECIPE_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
  };
}


function recordFromSnapshot (snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
