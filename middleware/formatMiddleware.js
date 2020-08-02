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
                        },
                        severity: el.accident_severity,
                        type: el.accident_type
                    }

                    newMarkers.push(newEl);
                });

                newMarkers = newMarkers.filter(el => (el.severity === 1 || el.severity === 2 || el.severity === 3))

                action.payload.markersNew = newMarkers;
            }

            return next(action);
        }
    }
}

export default forbiddenWordsMiddleware;