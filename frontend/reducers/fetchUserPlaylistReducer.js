import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USER_PLAYLISTS:
            return {...state,userPlaylistResponse:action.payload}
        case TYPES.FETCH_USER_PLAYLISTS_BEATS:
            return {...state,userPlaylistBeatsResponse:action.payload}
        default:
            return state;
    }
}