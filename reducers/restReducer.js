import { DEVICE_LIST_LODED, SEARCH_RESULTS_LOADED, API_ERRORED } from '../actions/types';
import initialState from '../actions/state'

const restReducer = (state = initialState, action) => {
    switch(action.type) {
      case DEVICE_LIST_LODED: {
        state.OriginalXMLResponse = [];
        return Object.assign({}, state, {
          errorCode: 0,
          OriginalXMLResponse: state.OriginalXMLResponse.concat(action.payload)
        });
      }
      case SEARCH_RESULTS_LOADED: {
        state.burstList = [];
        return Object.assign({}, state, {
          errorCode: 0,
          burstList: state.burstList.concat(action.payload)
        });
      }
      case API_ERRORED: {
        state.burstList = [];
        return Object.assign({}, state, {
          errorCode: 404
        });
      }
      default:
        return state;
    }
  }
  
  export default restReducer;