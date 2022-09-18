import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USER_DETAILS:
            return {...state,userDetailData:action.payload}
        default:
            return state;
    }
}