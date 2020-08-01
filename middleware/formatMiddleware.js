import { DEVICE_LIST_LODED } from "../actions/types";

function forbiddenWordsMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            // do your stuff

            if (action.type === DEVICE_LIST_LODED) {
                let newMarkers = [];
                action.payload.markers.forEach(el => {
                    const newEl = {
                        title: el.title,
                        description: el.description,
                        latlng: {
                            latitude: el.latitude,
                            longitude: el.longitude
                        }
                    }
                    newMarkers.push(newEl);
                });

                action.payload.markersNew = newMarkers;
            }

            return next(action);
        }
    }
}

export default forbiddenWordsMiddleware;