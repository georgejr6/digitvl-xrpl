import * as TYPES from "../actions/types"
const INITIAL_STATE = {
    isSignedIn: null,
    userId:null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.SIGN_IN:
            return {...state,isSignedIn: true,user:action.payload}
        case TYPES.SIGN_OUT:
            return {...state,isSignedIn:false,user:null}
        case TYPES.REGISTER:
            return {...state,isSignedIn:true,user:action.payload}
        case TYPES.GOOGLE_AUTH:
            return {...state,isSignedIn:true,user:action.payload}
        default:
            return state;

    }
}