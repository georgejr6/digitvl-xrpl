import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.USER_PROFILE_FOLLOW_CHECK:
            return {...state,followCheckData:action.payload}
        default:
            return state;
    }
}