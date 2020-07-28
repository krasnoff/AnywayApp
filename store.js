// store.js

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import placeReducer from './reducers/placeReducer';
import restReducer from './reducers/restReducer';
import formatMiddleware from "./middleware/formatMiddleware";
import createSagaMiddleware from "redux-saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  places: placeReducer,
  rests: restReducer
});

const configureStore = () => {
  return { ...createStore(
    rootReducer,
    {},
    applyMiddleware(formatMiddleware, initialiseSagaMiddleware)), runSaga: initialiseSagaMiddleware.run };
  
}



export default configureStore;