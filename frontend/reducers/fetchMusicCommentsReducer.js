import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_MUSIC_COMMENTS:
            return {...state,musicCommentData:action.payload}
        default:
            return state;
    }
}