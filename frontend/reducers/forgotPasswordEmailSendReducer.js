import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FORGOT_PASSWORD_EMAIL_SEND:
            return {...state,forgotPasswordEmailSendResponseData:action.payload}
        default:
            return state;
    }
}