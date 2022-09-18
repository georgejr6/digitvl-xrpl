import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.UPDATE_USER_TRACK:
            return {...state,updateTrackData:action.payload}
        default:
            return state;
    }
}