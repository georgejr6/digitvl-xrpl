import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_MUSIC_LIKES_LIST:
            return {...state,musicLikesListData:action.payload}
        default:
            return state;
    }
}