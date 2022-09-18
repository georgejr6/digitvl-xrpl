import * as TYPES from "../actions/types"
export const getBlogDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.GET_BLOG_DETAIL:
            return {...state,blogDetailData:action.payload}
        default:
            return state;
    }
}
