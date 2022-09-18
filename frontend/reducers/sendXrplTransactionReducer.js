import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.XRP_TRANSACTION:
            return {...state,xrplTransactionData:action.payload}
        default:
            return state;
    }
}