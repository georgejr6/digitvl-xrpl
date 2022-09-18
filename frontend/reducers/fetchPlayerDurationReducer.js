import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_PLAYER_DURATION:
            return {...state,musicPlayerDuration:action.payload}
        default:
            return state;
    }
}