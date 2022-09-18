import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_MUSIC_DETAIL:
            return {...state,musicDetailData:action.payload}
        default:
            return state;
    }
}