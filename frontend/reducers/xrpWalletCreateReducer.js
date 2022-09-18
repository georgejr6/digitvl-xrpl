import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.XRP_WALLET_CREATE:
            return {...state,xrpWalletCreateResponseData:action.payload}
        default:
            return state;
    }
}