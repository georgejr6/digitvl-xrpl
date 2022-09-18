import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.POSTER_REWARD:
            return {...state,posterRewardDataResponse:action.payload}
        default:
            return state;
    }
}