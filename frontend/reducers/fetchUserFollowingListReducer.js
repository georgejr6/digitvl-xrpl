import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USER_FOLLOWING_LIST:
            return {...state,userFollowingData:action.payload}
        default:
            return state;
    }
}