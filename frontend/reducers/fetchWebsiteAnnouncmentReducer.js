import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_ANNOUNCEMENT:
            return {...state,announcementData:action.payload}
        default:
            return state;
    }
}