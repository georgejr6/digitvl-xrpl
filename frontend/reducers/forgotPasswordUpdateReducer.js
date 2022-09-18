import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FORGOT_PASSWORD_UPDATE:
            return {...state,forgotPasswordUpdateResponseData:action.payload}
        default:
            return state;
    }
}