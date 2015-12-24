import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';
// bring in css
import css from  './styles/style.styl';

import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

const history = createHistory();
syncReduxAndRouter(history, store)

/*
  Rendering
  This is where we hook up the Store with our actual component 
*/

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid} />
        <Route path="/view/:postId" component={Single}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
