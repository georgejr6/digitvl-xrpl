import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_READ_NOTIFICATIONS:
            return {...state,readNotificationsData:action.payload}
        default:
            return state;
    }
}