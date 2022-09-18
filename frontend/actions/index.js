import novamdigital from "../api/novamdigital";
import * as TYPES from "../actions/types"

export const register = (data)=>{
    return async (dispatch)=>{
        const response = await novamdigital.post("/account/create/",{...data});
        dispatch({type:TYPES.REGISTER,payload:response.data});
    }
}
export const login = (data)=>{
    return async (dispatch)=>{
        const response = await novamdigital.post("/account/login/",{...data});
        dispatch({type:TYPES.SIGN_IN,payload:response.data});
    }
}

export const uploadMusic = (data,userSession,options)=>{
// ,options
    return async (dispatch)=>{
        const response = await novamdigital.post("/beats/upload/",data,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        });
        dispatch({type:TYPES.MUSIC_UPLOAD,payload:response.data});
    }
}
export const supportRequest = (data) =>{
    return async (dispatch) => {
        const response = await novamdigital.post("/support/request/",data);
        dispatch({type:TYPES.SUPPORT_REQUEST,payload:response.data})
    }
}
export const tweetApi = (data,userSession) =>{
    return async (dispatch) => {
        const response = await novamdigital.post("/tweets/create/",data,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        });
        dispatch({type:TYPES.TWEET_FEATURE,payload:response.data})
    }
}
export const addDigitvlTreeLinksApi = (data,userSession) =>{
    return async (dispatch) => {
        const response = await novamdigital.post("/link-tree/create/",data,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        });
        dispatch({type:TYPES.DTREE_LINK_CREATE,payload:response.data})
    }
}
export const getDTreePublicProfileLinks = (data) =>{
    return async (dispatch) => {
        const response = await novamdigital.get(`/link-tree/${data}/link/`);
        dispatch({type:TYPES.DTREE_PUBLIC_LINK_GET,payload:response.data})
    }
}
export const deleteDTreePublicProfileLinks = (data,userSession) =>{
    return async (dispatch) => {
        const response = await novamdigital.delete(`/link-tree/update/${data}/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
                'Content-Type' : 'application/json',
            }
        });
        // dispatch({type:TYPES.DTREE_PUBLIC_LINK_GET,payload:response.data})
    }
}
export const getDTreeCurrentUserProfileLinks = (userSession) =>{
    return async (dispatch) => {
        const response = await novamdigital.get(`/link-tree/current-user/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
                'Content-Type' : 'application/json',
            }
        });
        dispatch({type:TYPES.DTREE_CURRENTUSER_LINK_GET,payload:response.data})
    }
}

export const createPlayList = (data,userSession)=>{
    return async (dispatch)=>{
        const response = await novamdigital.post("/beats/create/playlist/",{...data},{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        });
        dispatch({type:TYPES.CREATE_PLAYLIST,payload:response.data});
    }
}
export const verifyEmailApi = (token)=>{
    return async (dispatch)=>{
        const response = await novamdigital.post("/account/email-verify/",token);
        dispatch({type:TYPES.VERIFY_EMAIL,payload:response.data});
    }
}
export const forgotPasswordEmailSendApi = (data)=>{
    return async (dispatch)=>{
        const response = await novamdigital.post("/account/forget-password/request/",{...data});
        dispatch({type:TYPES.FORGOT_PASSWORD_EMAIL_SEND,payload:response.data});
    }
}
export const forgotPasswordUpdateApi = (data)=>{
    return async (dispatch)=>{
        const response = await novamdigital.post("/account/new/forget-password/",{...data});
        dispatch({type:TYPES.FORGOT_PASSWORD_UPDATE,payload:response.data});
    }
}

export const fetchHomeMusic = (pageNo,userSession) =>{
    return async (dispatch) =>{
        let response
        if (userSession){
            response = await novamdigital.get(`/beats/`,{
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                },
                params:{
                    page:pageNo,
                }
            })
        }else{
            response = await novamdigital.get(`/beats/`,{
                params:{
                    page:pageNo,
                }
            })
        }

        dispatch({type:TYPES.FETCH_MUSIC,payload:response.data})
    }
}

export const fetchHomeChillMusic = (pageNo,userSession) =>{
    return async (dispatch) =>{
        let response
        if (userSession){
            response = await novamdigital.get(`/beats/tags/chill/`,{
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                },
                params:{
                    page:pageNo,
                }
            })
        }else{
            response = await novamdigital.get(`/beats/tags/chill/`,{
                params:{
                    page:pageNo,
                }
            })

        }
        dispatch({type:TYPES.FETCH_MUSIC_CHILL,payload:response.data})
    }
}
export const fetchExclusiveContent = (userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/exclusive/songs/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.GET_EXCLUSIVE_SONGS_LIST,payload:response.data})
    }
}
export const fetchHomeRelaxMusic = (pageNo,userSession) =>{
    return async (dispatch) =>{
        let response
        if (userSession){
            response = await novamdigital.get(`/beats/tags/relax/`,{
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                },
                params:{
                    page:pageNo,
                }
            })
        }else{
            response = await novamdigital.get(`/beats/tags/relax/`,{
                params:{
                    page:pageNo,
                }
            })
        }

        dispatch({type:TYPES.FETCH_MUSIC_RELAX,payload:response.data})
    }
}
export const fetchHomeFeaturedMusic = (pageNo,userSession) =>{
    return async (dispatch) =>{
        let response
        if (userSession){
            response = await novamdigital.get(`/featured/songs/`,{
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                },
                params:{
                    page:pageNo,
                }
            })
        }else{
            response = await novamdigital.get(`/featured/songs/`,{
                params:{
                    page:pageNo,
                }
            })
        }
        dispatch({type:TYPES.FETCH_MUSIC_FEATURED,payload:response.data})
    }
}


export const playMusic = (data) =>{
    return {
        type:TYPES.PLAY_MUSIC,
        payload:data
    }
}
export const playMusicDetail = (data) =>{
    return {
        type:TYPES.PLAY_MUSIC_DETAIL,
        payload:data
    }
}
export const addMusicToList = (data) =>{
    return {
        type:TYPES.ADD_MUSIC_TO_LIST,
        payload:data
    }
}
export const sendMusicIdToPlayer = (data) =>{
    return {
        type:TYPES.SEND_MUSIC_ID_PLAYER,
        payload:data
    }
}
export const addMusicListToMediaPlayerPlaylist = (data) =>{
    return {
        type:TYPES.ADD_MUSICLIST_TO_MEDIAPLAYER_PLAYLIST,
        payload:data
    }
}
export const getMusicPlayerDuration = (data) =>{
    return {
        type:TYPES.GET_PLAYER_DURATION,
        payload:data
    }
}
export const editUserProfile = (data,userSession) =>{
    return async (dispatch)=>{
        let response;
        if (userSession.user) {
            response = await novamdigital.patch("/account/profile/update/" + userSession.user.id + "/", data, {
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
        }
        if (userSession.profile){
            response = await novamdigital.patch("/account/profile/update/" + userSession.profile.id + "/", data, {
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
        }
        dispatch({type:TYPES.EDIT_PROFILE,payload:response.data});
    }
}
export const editUserProfileLinks = (data,userSession) =>{
    return async (dispatch)=>{
        let response;
        if (userSession.user) {
            response = await novamdigital.patch("/account/profile/update/" + userSession.user.id + "/", data, {
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                }
            });
        }
        if (userSession.profile){
            response = await novamdigital.patch("/account/profile/update/" + userSession.profile.id + "/", data, {
                headers: {
                    'Authorization': `jwt ${userSession.token}`,
                }
            });
        }
        dispatch({type:TYPES.EDIT_PROFILE,payload:response.data});
    }
}

export const fetchMusicDetails = (username,slug) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/beats/${username}/${slug}`)
        dispatch({type:TYPES.FETCH_MUSIC_DETAIL,payload:response.data})
    }
}

export const fetchCurrentUserPlaylist = (userSession,pageNo) =>{
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.get(`/you/library/playlist/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_CURRENT_USER_PLAYLISTS,payload:response.data})
    }
}
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

export const fetchUserSubscriptionDetail = (userSession,pageNo) =>{
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.get(`/user-subscription/detail/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.USER_SUBSCRIPTION_DETAIL,payload:response.data})
    }
}
export const fetchCurrentUserDetail = (userSession) =>{
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.get(`/account/current-user/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.USER_DETAIL,payload:response.data})
    }
}

export const fetchUserPlaylist = (username,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/playlist/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_PLAYLISTS,payload:response.data})
    }
}
export const fetchUserPlaylistBeats = (username,pLId) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/playlist/${pLId}/detail/`)
        dispatch({type:TYPES.FETCH_USER_PLAYLISTS_BEATS,payload:response.data})
    }
}
export const getSearchList = (searchTerm) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/beats/search/`,{
            params:{
                search:searchTerm,
            }
        })
        dispatch({type:TYPES.GET_SEARCH,payload:response.data})
    }
}
export const fetchCurrentUserLikes = (userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/you/library/likes/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_CURRENT_USER_LIKES,payload:response.data})
    }
}

export const fetchTrendingTracksList = (pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/most-plays/songs/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_TRENDING_TRACKS,payload:response.data})
    }
}
export const fetchUserFeeds = (userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/feeds/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_FEEDS,payload:response.data})
    }
}

export const getUserProfileDetail = (username) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/detail/`)
        dispatch({type:TYPES.FETCH_USER_DETAILS,payload:response.data})
    }
}
export const getUserFollowingList = (username,userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/following/list/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_FOLLOWING_LIST,payload:response.data})
    }
}
export const getUserFollowingListWithoutToken = (username,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/following/list/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_FOLLOWING_LIST,payload:response.data})
    }
}
export const getMusicLikesList = (musicId,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/users/songs/${musicId}/likes/list/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_MUSIC_LIKES_LIST,payload:response.data})
    }
}
export const getUserFollowersList = (username,userSession,pageNo) =>{
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/follower/list/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_FOLLOWERS_LIST,payload:response.data})
    }
}
export const getUserFollowersListWithoutToken = (username,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/follower/list/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_FOLLOWERS_LIST,payload:response.data})
    }
}
export const getUserProfileFollowCheck = (userSession,username) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/check/${username}/follow/status/`,{
            headers: {
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.USER_PROFILE_FOLLOW_CHECK,payload:response.data})
    }
}
export const getMusicComments = (userSession,mId,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/beats/comments/${mId}/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.GET_MUSIC_COMMENTS,payload:response.data})
    }
}
export const getWhoToFollowList = (userSession,username) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/suggestions/${username}/who-to-follow/list/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.WHO_TO_FOLLOW,payload:response.data})
    }
}
export const relatedTracksList = (slug) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/related/tracks/${slug}/songs/list/`)
        dispatch({type:TYPES.RELATED_TRACKS_LIST,payload:response.data})
    }
}

export const getBlogsApi = (pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/blogs/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.GET_BLOGS,payload:response.data})
    }
}

export const getBlogDetailApi = (slug) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/blog/detail/${slug}/`)
        dispatch({type:TYPES.GET_BLOG_DETAIL,payload:response.data})
    }
}

export const postBlog = (userSession,data) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/blog/create/`,data,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.POST_BLOG,payload:response.data})
    }
}
export const posterRewards = (userSession,data) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/poster/reward/${data}/`,data,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.POSTER_REWARD,payload:response.data})
    }
}
export const inviteUser = (userSession,data) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/invite/user/`,data,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.INVITE_USER,payload:response.data})
    }
}
export const getNotificationCount = (userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/notification/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.GET_NOTIFICATIONS_COUNT,payload:response.data})
    }
}
export const getReadNotifications = (userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/notification/read/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.GET_READ_NOTIFICATIONS,payload:response.data})
    }
}



export const getCurrentUserDigitvlCoins = (userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/account/GetCoins/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.GET_DIGITVL_COINS,payload:response.data})
    }
}
export const addMusicComments = (userSession,mId,data) =>{
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.post(`/beats/comments/${mId}/`,{...data},{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.ADD_MUSIC_COMMENTS,payload:response.data})
    }
}

export const playCount = (mId) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/songs/play/counter/${mId}/`,{})
        dispatch({type:TYPES.PLAY_COUNT,payload:response.data})
    }
}
export const followUnfollowUserApi = (userSession,userId) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/profile/${userId}/follow/`,{},{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.FOLLOW_UNFOLLOW_USER,payload:response.data})
    }
}
export const redeemCoinFeatureSongApi = (musicId,data,userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/redeem/coins/featured/track/${musicId}/`,data,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.REDEEM_COIN_FEATURE_SONG,payload:response.data})
    }
}
export const addMusicToPlayList = (playListId,musicId,data,userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/beats/users/${playListId}/${musicId}/added/`,data,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.ADD_MUSIC_TO_PLAYLIST,payload:response.data})
    }
}
export const addCoins = (userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/account/CounterCoins/`,{},{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.ADD_COINS,payload:response.data})
    }
}

export const fetchMusicDetailsWithToken = (username,slug,userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/beats/${username}/${slug}`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.FETCH_MUSIC_DETAIL,payload:response.data})
    }
}
export const fetchSubscriptionSuccessSession = (checkoutSessionId,userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/get-checkout-session/${checkoutSessionId}/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`
            }
        })
        dispatch({type:TYPES.FETCH_SUBSCRIPTION_SUCCESS_SESSION,payload:response.data})
    }
}
export const fetchBuyCoinsSuccessSession = (checkoutSessionId,userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/get-buy-coins/${checkoutSessionId}/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.FETCH_BUYCOINS_SUCCESS_SESSION,payload:response.data})
    }
}

export const fetchCurrentUserMusic = (userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get("/you/library/tracks/",{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_CURRENT_MUSIC,payload:response.data})
    }
}

export const fetchCurrentUserFeeds = (userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get("/feeds/current-user/",{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_CURRENT_USER_FEEDS,payload:response.data})
    }
}
export const deleteUserMusic = (userSession,songId) =>{
    return async (dispatch) =>{
        const response = await novamdigital.delete(`/Songs/update/${songId}/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.DELETE_USER_TRACK,payload:response.data})
    }
}

export const deleteCurrentUserPlaylist = (userSession,slug) =>{
    return async (dispatch) =>{
        const response = await novamdigital.delete(`/you/library/delete/playlist/${slug}`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.DELETE_USER_PLAYLIST,payload:response.data})
    }
}
export const deleteCurrentUserPlaylistSong = (userSession,slug,song_id) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/you/library/playlist/${slug}/delete/song/${song_id}/`,{},{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.DELETE_USER_PLAYLIST_SONG,payload:response.data})
    }
}
export const updateUserMusic = (userSession,songId,data) =>{
    // console.log(userSession.token)
    return async (dispatch) =>{
        const response = await novamdigital.patch(`/Songs/update/${songId}/`,data,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.UPDATE_USER_TRACK,payload:response.data})
    }
}
export const fetchUserMusic = (username,userSession,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/tracks/`,{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            },
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_MUSIC,payload:response.data})
    }
}
export const fetchUserMusicWithoutToken = (username,pageNo) =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/profile/${username}/tracks/`,{
            params:{
                page:pageNo,
            }
        })
        dispatch({type:TYPES.FETCH_USER_MUSIC,payload:response.data})
    }
}
export const fetchRandomMusic = () =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/random/songs/list/`)
        dispatch({type:TYPES.FETCH_RANDOM_MUSIC,payload:response.data})
    }
}
export const fetchWebsiteAnnouncement = () =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/announcement/`)
        dispatch({type:TYPES.FETCH_ANNOUNCEMENT,payload:response.data})
    }
}
export const fetchAdData = () =>{
    return async (dispatch) =>{
        const response = await novamdigital.get(`/poster/`)
        dispatch({type:TYPES.FETCH_AD_DATA,payload:response.data})
    }
}

export const likeMusicApi = (id,userSession) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/beats/${id}/likes/`,{},{
            headers:{
                'Authorization': `jwt ${userSession.token}`,
            }
        })
        dispatch({type:TYPES.LIKE_MUSIC,payload:response.data})
    }
}
export const donateApi = (data) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/donations/stripe/`,{
            amount:data
        })
        dispatch({type:TYPES.DONATE_PLATFORM,payload:response.data})
    }
}
export const hitGoogleAuthApi = (accessToken) =>{
    return async (dispatch) =>{
        const response = await novamdigital.post(`/account/create/google/`,{...accessToken})
        dispatch({type:TYPES.GOOGLE_AUTH,payload:response.data})
    }
}

export const signOut = () =>{
    return{
        type:TYPES.SIGN_OUT
    }
}