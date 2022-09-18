import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.USER_SUBSCRIPTION_DETAIL:
            return {...state,userSubscriptionDetailResponse:action.payload}
        default:
            return state;
    }
}