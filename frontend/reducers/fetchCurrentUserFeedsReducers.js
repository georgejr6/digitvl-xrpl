import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_CURRENT_USER_FEEDS:
            return {...state,fetchCurrentUserFeedsData:action.payload}
        default:
            return state;
    }
}