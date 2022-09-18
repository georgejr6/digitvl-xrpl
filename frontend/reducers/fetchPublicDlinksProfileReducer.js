import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.DTREE_PUBLIC_LINK_GET:
            return {...state,getUserDLinksTreeResponse:action.payload}
        default:
            return state;
    }
}