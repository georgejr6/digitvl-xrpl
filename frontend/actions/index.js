import novamdigital from "../api/novamdigital";
import * as TYPES from "../actions/types"

export const generateXrpWallet = (userSession) => {
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.post(`/xrp/wallet/create/`,{},{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.XRP_WALLET_CREATE,payload:response.data})
    }
}
export const sendXrpTransaction = (userSession,data) => {
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.post(`/xrp/send/`,data,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.XRP_TRANSACTION,payload:response.data})
    }
}
export const earnXrpByLike = (userSession,data) => {
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.post(`/xrp/earn-by/like-song/`,data,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.EARN_XRP,payload:response.data})
    }
}

