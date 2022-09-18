import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.DELETE_USER_PLAYLIST:
            return {...state,deleteUserPlaylistData:action.payload}
        default:
            return state;
    }
}