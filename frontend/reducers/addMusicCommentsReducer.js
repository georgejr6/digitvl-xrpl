import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.ADD_MUSIC_COMMENTS:
            return {...state,addMusicCommentData:action.payload}
        default:
            return state;
    }
}