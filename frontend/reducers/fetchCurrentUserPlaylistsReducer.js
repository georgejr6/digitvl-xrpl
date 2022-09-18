import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_CURRENT_USER_PLAYLISTS:
            return {...state,currentPlaylistsDetailData:action.payload}
        default:
            return state;
    }
}