import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.TWEET_FEATURE:
            return {...state,tweetFeatureData:action.payload}
        default:
            return state;
    }
}