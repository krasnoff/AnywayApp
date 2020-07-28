import { DATA_REQUESTED } from './types';

export function getDataSaga(args) {
    return { type: DATA_REQUESTED, args }; 
}