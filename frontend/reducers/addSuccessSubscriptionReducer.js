import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_SUBSCRIPTION_SUCCESS_SESSION:
            return {...state,getSuccessSubscriptionData:action.payload}
        default:
            return state;
    }
}