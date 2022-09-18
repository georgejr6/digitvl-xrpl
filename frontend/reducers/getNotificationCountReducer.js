import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_NOTIFICATIONS_COUNT:
            return {...state,notificationCountData:action.payload}
        default:
            return state;
    }
}