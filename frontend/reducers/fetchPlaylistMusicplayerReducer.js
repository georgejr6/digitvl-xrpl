import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.ADD_MUSICLIST_TO_MEDIAPLAYER_PLAYLIST:
            return {...state,musicPlaylistPlayerData:action.payload}
        default:
            return state;
    }
}