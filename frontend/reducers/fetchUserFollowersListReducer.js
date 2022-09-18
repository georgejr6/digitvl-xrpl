import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USER_FOLLOWERS_LIST:
            return {...state,userFollowersData:action.payload}
        default:
            return state;
    }
}