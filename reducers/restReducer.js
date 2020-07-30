import { DEVICE_LIST_LODED, API_ERRORED } from '../actions/types';
import initialState from '../actions/state'

const restReducer = (state = initialState, action) => {
    switch(action.type) {
      case DEVICE_LIST_LODED: {
        state.OriginalXMLResponse = [];
        return Object.assign({}, state, {
          errorCode: 0,
          OriginalXMLResponse: state.OriginalXMLResponse.concat(action)
        });
      }
      case API_ERRORED: {
        state.burstList = [];
        state.urlRetry = action.payload.argsObj.args.baseURL;
        return Object.assign({}, state, {
          errorCode: 404
        });
      }
      default:
        return state;
    }
  }
  
  export default restReducer;