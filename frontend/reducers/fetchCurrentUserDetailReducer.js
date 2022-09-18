import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.USER_DETAIL:
            return {...state,currentUserDetailResponse:action.payload}
        default:
            return state;
    }
}