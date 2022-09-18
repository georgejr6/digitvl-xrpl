import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.DTREE_LINK_CREATE:
            return {...state,addDtreeLinksData:action.payload}
        default:
            return state;
    }
}