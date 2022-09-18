import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_SEARCH:
            return {...state,searchResponse:action.payload}
        default:
            return state;
    }
}