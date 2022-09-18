import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.EDIT_PROFILE:
            return {...state,editResponseData:action.payload}
        default:
            return state;
    }
}