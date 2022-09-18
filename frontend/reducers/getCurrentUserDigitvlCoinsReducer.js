import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_DIGITVL_COINS:
            return {...state,getCoinsData:action.payload}
        default:
            return state;
    }
}