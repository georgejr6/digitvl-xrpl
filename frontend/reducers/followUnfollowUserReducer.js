import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FOLLOW_UNFOLLOW_USER:
            return {...state,followUnfollowData:action.payload}
        default:
            return state;
    }
}