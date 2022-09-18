import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.RELATED_TRACKS_LIST:
            return {...state,relatedTracksListData:action.payload}
        default:
            return state;
    }
}