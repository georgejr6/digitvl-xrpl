import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USER_MUSIC:
            return {...state,userMusicFetchData:action.payload}
        default:
            return state;
    }
}