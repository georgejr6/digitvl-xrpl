import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.VERIFY_EMAIL:
            return {...state,verifyUserResponseData:action.payload}
        default:
            return state;
    }
}