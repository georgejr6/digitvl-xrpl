import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.REDEEM_COIN_FEATURE_SONG:
            return {...state,redeemCoinFeatureSongData:action.payload}
        default:
            return state;
    }
}