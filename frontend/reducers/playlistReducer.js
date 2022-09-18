import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.CREATE_PLAYLIST:
            return {...state,playlistResponse:action.payload}
        default:
            return state;
    }
}