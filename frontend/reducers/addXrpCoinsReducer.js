import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.EARN_XRP:
            return {...state,earnXrpData:action.payload}
        default:
            return state;
    }
}