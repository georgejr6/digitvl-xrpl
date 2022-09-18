import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.MUSIC_UPLOAD:
            return {...state,musicUploadResponseData:action.payload}
        default:
            return state;
    }
}