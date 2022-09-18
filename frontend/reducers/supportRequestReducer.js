import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.SUPPORT_REQUEST:
            return {...state,supportRequestData:action.payload}
        default:
            return state;
    }
}