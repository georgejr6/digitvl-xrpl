import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.ADD_COINS:
            return {...state,addCoinsData:action.payload}
        default:
            return state;
    }
}