import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_MUSIC:
            return {...state,musicFetchData:action.payload}
        default:
            return state;
    }
}