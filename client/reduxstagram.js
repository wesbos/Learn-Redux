import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
// bring in css
import css from  './styles/style.styl';

/*
  Rendering
  This is where we hook up the Store with our actual component 
*/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
