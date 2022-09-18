import {combineReducers} from "redux";
import authReducer from "./authReducer";
import musicUploadReducer from "./musicUploadReducer";
import fetchMusicReducer from "./fetchMusicReducer";
import playMusicReducer from "./playMusicReducer";
import editProfileReducer from "./editProfileReducer";
import fetchCurrentUserMusicReducer from "./fetchCurrentUserMusicReducer";
import fetchMusicDetailReducer from "./fetchMusicDetailReducer";
import likeMusicReducer from "./likeMusicReducer";
import fetchUserMusicReducer from "./fetchUserMusicReducer";
import fetchCurrentUserPlaylistsReducer from "./fetchCurrentUserPlaylistsReducer";
import playlistReducer from "./playlistReducer";
import fetchCurrentUserLikesReducer from "./fetchCurrentUserLikesReducer";
import addMusicToPlaylistReducer from "./addMusicToPlaylistReducer";
import fetchUserDetailReducer from "./fetchUserDetailReducer";
import fetchUserPlaylistReducer from "./fetchUserPlaylistReducer";
import fetchSearchResponse from "./fetchSearchResponse";
import fetchChillMusicReducer from "./fetchChillMusicReducer";
import fetchRelaxMusicReducer from "./fetchRelaxMusicReducer";
import followUnfollowUserReducer from "./followUnfollowUserReducer";
import addMusicCommentsReducer from "./addMusicCommentsReducer";
import fetchMusicCommentsReducer from "./fetchMusicCommentsReducer";
import fetchWhoToFollowListReducer from "./fetchWhoToFollowListReducer";
import fetchUserProfileFollowCheckDetailsReducer from "./fetchUserProfileFollowCheckDetailsReducer";
import fetchUserFollowersListReducer from "./fetchUserFollowersListReducer";
import fetchUserFollowingListReducer from "./fetchUserFollowingListReducer";
import fetchMusicLikesListReducer from "./fetchMusicLikesListReducer";
import fetchUserFeedsReducer from "./fetchUserFeedsReducer";
import fetchTrendingTracksReducer from "./fetchTrendingTracksReducer";
import fetchPlaylistMusicplayerReducer from "./fetchPlaylistMusicplayerReducer";
import verifyUserReducer from "./verifyUserReducer";
import forgotPasswordEmailSendReducer from "./forgotPasswordEmailSendReducer";
import forgotPasswordUpdateReducer from "./forgotPasswordUpdateReducer";
import addCoinsReducer from "./addCoinsReducer";
import deleteUserTrackReducer from "./deleteUserTrackReducer";
import updateTrackReducer from "./updateTrackReducer";
import fetchRandomMusicReducer from "./fetchRandomMusicReducer";
import donationReducer from "./donationReducer";
import supportRequestReducer from "./supportRequestReducer";
import tweetFeatureReducer from "./tweetFeatureReducer";
import deletePlaylistReducer from "./deletePlaylistReducer";
import deletePlaylistSongReducer from "./deletePlaylistSongReducer";
import redeemCoinFeatureSongReducer from "./redeemCoinFeatureSongReducer";
import relatedTracksReducer from "./relatedTracksReducer";
import fetchFeaturedMusicReducer from "./fetchFeaturedMusicReducer";
import getCurrentUserDigitvlCoinsReducer from "./getCurrentUserDigitvlCoinsReducer";
import postBlogReducer from "./postBlogReducer";
import getBlogsReducer from "./getBlogsReducer";
import {getBlogDetailReducer} from "./getBlogDetailReducer";
import getNotificationCountReducer from "./getNotificationCountReducer";
import getReadNotificationsReducer from "./getReadNotificationsReducer";
import InviteUserReducer from "./InviteUserReducer";
import addSuccessSubscriptionReducer from "./addSuccessSubscriptionReducer";
import addSuccessBuyCoinsReducer from "./addSuccessBuyCoinsReducer";
import fetchCurrentUserFeedsReducers from "./fetchCurrentUserFeedsReducers";
import fetchWebsiteAnnouncmentReducer from "./fetchWebsiteAnnouncmentReducer";
import fetchAdDataReducer from "./fetchAdDataReducer";
import fetchCurrentUserDetailReducer from "./fetchCurrentUserDetailReducer";
import fetchCurrentUserSubscriptionDetailReducer from "./fetchCurrentUserSubscriptionDetailReducer";
import posterRewardReducer from "./posterRewardReducer";
import fetchExclusiveSongsListReducer from "./fetchExclusiveSongsListReducer";
import addDtreeLinksReducer from "./addDtreeLinksReducer";
import fetchPublicDlinksProfileReducer from "./fetchPublicDlinksProfileReducer";
import fetchCurrentUserDTreeLinksReducer from "./fetchCurrentUserDTreeLinksReducer";
import fetchPlayerDurationReducer from "./fetchPlayerDurationReducer";
import fetchMusicIdReducer from "./fetchMusicIdReducer";
import xrpWalletCreateReducer from "./xrpWalletCreateReducer";
import sendXrplTransactionReducer from "./sendXrplTransactionReducer";
import addXrpCoinsReducer from "./addXrpCoinsReducer";
export default combineReducers({
    auth:authReducer,
    musicUpload:musicUploadReducer,
    fetchMusic:fetchMusicReducer,
    fetchChillMusic:fetchChillMusicReducer,
    fetchRelaxMusic:fetchRelaxMusicReducer,
    playMusic:playMusicReducer,
    editProfile:editProfileReducer,
    fetchCurrentMusic:fetchCurrentUserMusicReducer,
    fetchUserMusic:fetchUserMusicReducer,
    musicDetail:fetchMusicDetailReducer,
    likeMusic:likeMusicReducer,
    fetchCurrentPlaylists:fetchCurrentUserPlaylistsReducer,
    playList:playlistReducer,
    likesList:fetchCurrentUserLikesReducer,
    addMusicPlaylist:addMusicToPlaylistReducer,
    userDetail:fetchUserDetailReducer,
    userPlaylist:fetchUserPlaylistReducer,
    searchList:fetchSearchResponse,
    followUnfollow:followUnfollowUserReducer,
    addMusicComment:addMusicCommentsReducer,
    musicComments:fetchMusicCommentsReducer,
    getWhoToFollow:fetchWhoToFollowListReducer,
    userFollowCheck:fetchUserProfileFollowCheckDetailsReducer,
    userFollowersList:fetchUserFollowersListReducer,
    userFollowingList:fetchUserFollowingListReducer,
    fetchMusicLikesList:fetchMusicLikesListReducer,
    userFeeds:fetchUserFeedsReducer,
    fetchTrending:fetchTrendingTracksReducer,
    fetchMusicplayerPlaylist:fetchPlaylistMusicplayerReducer,
    verifyUser:verifyUserReducer,
    forgotPasswordEmailSend:forgotPasswordEmailSendReducer,
    forgotPasswordUpdate:forgotPasswordUpdateReducer,
    addCoins:addCoinsReducer,
    deleteUserTrack:deleteUserTrackReducer,
    updateTrack:updateTrackReducer,
    fetchRandomMusic:fetchRandomMusicReducer,
    donatePlatform:donationReducer,
    supportRequest:supportRequestReducer,
    tweetFeature:tweetFeatureReducer,
    userCoins:getCurrentUserDigitvlCoinsReducer,
    deletePlaylist:deletePlaylistReducer,
    deletePlaylistSong:deletePlaylistSongReducer,
    redeemCoinFeatureSong:redeemCoinFeatureSongReducer,
    relatedTracks:relatedTracksReducer,
    fetchFeaturedMusic:fetchFeaturedMusicReducer,
    postBlog:postBlogReducer,
    getBlogs:getBlogsReducer,
    getBlogDetail:getBlogDetailReducer,
    notificationCount:getNotificationCountReducer,
    readNotifications:getReadNotificationsReducer,
    inviteUsers:InviteUserReducer,
    successSubscription:addSuccessSubscriptionReducer,
    successBuyCoins:addSuccessBuyCoinsReducer,
    currentUserFeeds:fetchCurrentUserFeedsReducers,
    websiteAnnouncement:fetchWebsiteAnnouncmentReducer,
    adData:fetchAdDataReducer,
    currentUserDetail:fetchCurrentUserDetailReducer,
    currentUserSubscription:fetchCurrentUserSubscriptionDetailReducer,
    posterReward:posterRewardReducer,
    fetchExclusiveSongs:fetchExclusiveSongsListReducer,
    addDtreeLinks:addDtreeLinksReducer,
    publicUserDlinks:fetchPublicDlinksProfileReducer,
    currentUserUserDlinks:fetchCurrentUserDTreeLinksReducer,
    playerDuration:fetchPlayerDurationReducer,
    getMusicId:fetchMusicIdReducer,
    xrpWalletCreate:xrpWalletCreateReducer,
    xrplTransaction:sendXrplTransactionReducer,
    earnXrp:addXrpCoinsReducer
})