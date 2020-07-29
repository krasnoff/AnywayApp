import { DEVICE_LIST_LODED } from "../actions/types";

const forbiddenWords = ["spam", "money"];

function forbiddenWordsMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            // do your stuff

            if (action.type === DEVICE_LIST_LODED) {
                /*let res = [];
                action.payload.items.forEach(el => {
                    res.push({
                        id: el.id,
                        url: el.enclosures[0].url,
                        title: el.title,
                        artist: action.payload.title,
                        artwork: action.payload.image.url
                    })
                });
                action.payload = res;*/
            }

            return next(action);
        }
    }
}

export default forbiddenWordsMiddleware;