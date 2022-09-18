import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.ADD_MUSIC_TO_PLAYLIST:
            return {...state,addMusicResponseData:action.payload}
        default:
            return state;
    }
}