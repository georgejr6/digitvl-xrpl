import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_CURRENT_MUSIC:
            return {...state,currentMusicFetchData:action.payload}
        default:
            return state;
    }
}