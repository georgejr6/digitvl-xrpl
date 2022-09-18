import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.LIKE_MUSIC:
            return {...state,likeMusicResponseData:action.payload}
        default:
            return state;
    }
}