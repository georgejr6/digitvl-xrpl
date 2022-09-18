import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_CURRENT_USER_LIKES:
            return {...state,likesListResponse:action.payload}
        default:
            return state;
    }
}