import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import DevTools from './components/DevTools';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default (initialState) => {

  const store = applyMiddleware(
    syncHistory(browserHistory),
    thunk
  )(createStore)(reducer, initialState, DevTools.instrument());

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return store;
};
