import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.POST_BLOG:
            return {...state,postBlogData:action.payload}
        default:
            return state;
    }
}