import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USER_FEEDS:
            return {...state,userFeedsData:action.payload}
        default:
            return state;
    }
}