import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.INVITE_USER:
            return {...state,inviteUserData:action.payload}
        default:
            return state;
    }
}