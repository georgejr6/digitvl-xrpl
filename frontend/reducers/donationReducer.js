import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.DONATE_PLATFORM:
            return {...state,donationData:action.payload}
        default:
            return state;
    }
}