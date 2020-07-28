// index.js

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import watcherSaga from "./sagas/api-saga";

import configureStore from './store';

const store = configureStore();
store.runSaga(watcherSaga);

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);