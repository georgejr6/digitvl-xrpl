import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.DELETE_USER_TRACK:
            return {...state,deleteUserTrackData:action.payload}
        default:
            return state;
    }
}