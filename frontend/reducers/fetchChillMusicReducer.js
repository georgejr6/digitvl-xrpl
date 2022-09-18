import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_MUSIC_CHILL:
            return {...state,musicChillFetchData:action.payload}
        default:
            return state;
    }
}