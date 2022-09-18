import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.WHO_TO_FOLLOW:
            return {...state,whoToFollowListData:action.payload}
        default:
            return state;
    }
}