/*
  Import Dependencies
*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createHistory } from 'history'

/*
  Import Components  
*/
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

/* Import CSS */
import css from  './styles/style.styl';

/* Import our data store */
import store from './store';

/*
  Rendering
  This is where we hook up the Store with our actual component and the router
*/
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid} />
        <Route path="/view/:postId" component={Single}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

/*
  Error Logging
*/
import Raven from 'raven-js';
import { SENTRY_URL } from './data/config';
// Raven.config(SENTRY_URL).install();
Raven.config('https://cb55d4f05cd443ce82303222f77ef5e0@app.getsentry.com/61499').install()
