import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_MUSIC_FEATURED:
            return {...state,featuredMusicData:action.payload}
        default:
            return state;
    }
}