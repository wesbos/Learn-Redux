var fs = require('fs');

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import store from './store';
import App from './components/App';

/* eslint-disable no-sync */
var template = fs.readFileSync(__dirname + '/../index.html', 'utf8');
/* eslint-enable no-sync */


function renderApp(path, callback) {
  console.log("Going to render on the server...");

  var rendered = renderToString(<App store={store}/>);

  var page = template
    .replace('<!-- CONTENT -->', rendered)
    .replace('"-- STORES --"', JSON.stringify(store.getState()));

  callback(null, page);
}

export default renderApp;
