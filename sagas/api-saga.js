import { takeEvery, call, put } from "redux-saga/effects";
import { API_ERRORED, DATA_REQUESTED } from "../actions/types";

export default function* watcherSaga() {
    yield takeEvery(DATA_REQUESTED, workerSaga);
}

function* workerSaga(args) {
    try {
        const payload = yield call(getDataSaga, args);
        yield put({ type: args.args.callbackFunction, payload });
    } catch (e) {
        console.log('workerSaga_error', args)
        yield put({ type: API_ERRORED, payload: {errorObj: e, argsObj: args} });
    }
}

function getDataSaga(args) {
    console.log('getDataSaga', args)
    return fetch(encodeURI(args.args.baseURL), {})
    .then(response => response.json())
}