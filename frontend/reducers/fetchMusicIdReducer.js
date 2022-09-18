import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.SEND_MUSIC_ID_PLAYER:
            return {...state,musicIdResponse:action.payload}
        default:
            return state;
    }
}