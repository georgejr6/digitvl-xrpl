import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_EXCLUSIVE_SONGS_LIST:
            return {...state,exclusiveSongsDataResponse:action.payload}
        default:
            return state;
    }
}