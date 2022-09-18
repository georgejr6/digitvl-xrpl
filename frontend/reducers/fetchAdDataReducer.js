import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_AD_DATA:
            return {...state,adDataResponse:action.payload}
        default:
            return state;
    }
}