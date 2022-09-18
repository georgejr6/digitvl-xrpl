import * as TYPES from "../actions/types"
export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.PLAY_MUSIC:
            return {...state,musicData:action.payload}
        case TYPES.ADD_MUSIC_TO_LIST:
            return {...state,addMusicToList:action.payload}
        case TYPES.PLAY_MUSIC_DETAIL:
            return {...state,musicDetailData:action.payload}

        default:
            return state;

    }
}