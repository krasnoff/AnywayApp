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
        yield put({ type: API_ERRORED, payload: e });
    }
}

function getDataSaga(args) {
    return fetch(args.args.baseURL, {})
    .then(response => response.json())
}