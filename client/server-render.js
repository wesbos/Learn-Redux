var fs = require('fs');

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

var Main = require('./components/Main');

/* eslint-disable no-sync */
var template = fs.readFileSync(__dirname + '/../index.html', 'utf8');
/* eslint-enable no-sync */

import store from './store';

function renderApp(path, callback) {
  // var store = require('./store')();

  console.log("GOing to render on the server...");
  console.log(store.getState())
  debugger;

  var rendered = renderToString(
    <Main {...store.getState()} dispatch={() => null}/>
  );

  var page = template
    .replace('<!-- CONTENT -->', rendered)
    .replace('"-- STORES --"', JSON.stringify(store.getState()));

  callback(null, page);
}

export default renderApp;
