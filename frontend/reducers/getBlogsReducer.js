import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_BLOGS:
            return {...state,getBlogsData:action.payload}
        default:
            return state;
    }
}