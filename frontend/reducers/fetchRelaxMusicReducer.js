import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_MUSIC_RELAX:
            return {...state,musicRelaxFetchData:action.payload}
        default:
            return state;
    }
}