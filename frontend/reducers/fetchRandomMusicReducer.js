import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_RANDOM_MUSIC:
            return {...state,musicRandomFetchData:action.payload}
        default:
            return state;
    }
}