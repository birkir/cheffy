// Deps
import React from 'react'
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router';
import { authActions } from 'modules/auth';

// Components
import App from './components/App';
import DevTools from './components/DevTools';
import { RecipeList, RecipeDetail } from './routes/Recipes';

// Store
import { FIREBASE_URL } from 'config';
import createStore from './store';

const store = createStore({
  firebase: new Firebase(FIREBASE_URL)
});

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="recipes" component={RecipeList}/>
          <Route path="recipe/:recipeId" component={RecipeDetail} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.querySelector('#app')
);