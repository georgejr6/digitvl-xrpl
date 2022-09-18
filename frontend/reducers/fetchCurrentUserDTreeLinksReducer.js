import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.DTREE_CURRENTUSER_LINK_GET:
            return {...state,getCurrentUserDtreeLinksResponse:action.payload}
        default:
            return state;
    }
}