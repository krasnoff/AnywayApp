// placeReducer.js

import { ADD_PLACE, DATA_LOADED } from '../actions/types';
import initialState from '../actions/state'

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    default:
      return state;
  }
}

export default placeReducer;