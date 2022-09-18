import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.FETCH_BUYCOINS_SUCCESS_SESSION:
            return {...state,getSuccessBuyCoinsData:action.payload}
        default:
            return state;
    }
}