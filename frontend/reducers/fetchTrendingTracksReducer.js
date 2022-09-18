import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_TRENDING_TRACKS:
            return {...state,trendingTracksData:action.payload}
        default:
            return state;
    }
}