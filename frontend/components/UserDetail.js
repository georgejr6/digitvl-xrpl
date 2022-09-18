import React, {Component} from 'react';
import Navbar from "./Navbar";
import Router from "next/router";
import * as ReactBootstrap from "react-bootstrap";
import Link from "next/link";
import {connect} from "react-redux";
import {getUserProfileDetail, followUnfollowUserApi, getUserProfileFollowCheck, addCoins} from "../actions";
import UserTracklist from "./UserTracklist";
import UserPlaylist from "./UserPlaylist";
import {NextSeo} from "next-seo";

let userLoggedIn
let userSession

// User Detail {this.props.params.username_slug}
class UserDetail extends Component {
    state = {
        section: 2,
        ApiError: false,
        profileDetails: {},
        followCheck: false,
        profileImage: "https://www.colorhexa.com/353353.png",
        profileCover: "https://www.colorhexa.com/353353.png",
        followerCount: 0,
        followingCount: 0,
        tracksCount: 0,
        websiteUrl: "",
        instagramUrl: "",
        facebookUrl: "",
        twitterUrl: "",
        youtubeUrl: ""
    }

    componentDidMount() {
        this.props.getUserProfileDetail(this.props.params.username_slug).then(() => {
            userLoggedIn = localStorage.getItem("userLoggedIn")
            userSession = localStorage.getItem("userSession")
            // console.log(this.props.userDetails)
            if (userLoggedIn) {
                userSession = JSON.parse(userSession)
                this.props.getUserProfileFollowCheck(userSession, this.props.params.username_slug).then(() => {
                    this.setState({followCheck: this.props.followUnfollowCheckResponse.followed})
                })
                if (userSession.user) {
                    if (this.props.userDetails.profile_detail.id === userSession.user.profile.id) {
                        Router.push("/profile")
                    }
                }
                if (userSession.profile) {
                    if (this.props.userDetails.profile_detail.id === userSession.profile.id) {
                        Router.push("/profile")
                    }
                }
            }
            if (this.props.userDetails.profile_detail.website_link) {
                this.setState({websiteUrl: this.props.userDetails.profile_detail.website_link})
            }
            if (this.props.userDetails.profile_detail.instagram_link) {
                this.setState({instagramUrl: this.props.userDetails.profile_detail.instagram_link})
            }
            if (this.props.userDetails.profile_detail.facebook_link) {
                this.setState({facebookUrl: this.props.userDetails.profile_detail.facebook_link})
            }
            if (this.props.userDetails.profile_detail.twitter_link) {
                this.setState({twitterUrl: this.props.userDetails.profile_detail.twitter_link})
            }
            if (this.props.userDetails.profile_detail.youtube_link) {
                this.setState({youtubeUrl: this.props.userDetails.profile_detail.youtube_link})
            }
            this.setState({profileDetails: this.props.userDetails.profile_detail})
        }).catch(err => {
            this.setState({ApiError: true})
        })
    }

    hitFollowApi = () => {
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            this.props.followUnfollowUserApi(userSession, this.state.profileDetails.id).then(() => {
                userSession = localStorage.getItem("userSession")
                let user = JSON.parse(userSession)
                if (this.props.followUnfollowDetails.status) {
                    this.props.getUserProfileFollowCheck(user, this.props.params.username_slug).then(() => {
                        this.setState({followCheck: this.props.followUnfollowCheckResponse.followed})
                    })
                    if (user.user) {
                        user.user.profile.followers_count = this.props.followUnfollowDetails.user.profile.followers_count
                        user.user.profile.following_count = this.props.followUnfollowDetails.user.profile.following_count
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    if (user.profile) {
                        user.profile.followers_count = this.props.followUnfollowDetails.user.profile.followers_count
                        user.profile.following_count = this.props.followUnfollowDetails.user.profile.following_count
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    this.props.getUserProfileDetail(this.props.params.username_slug).then(() => {
                        this.setState({profileDetails: this.props.userDetails.profile_detail})
                    })
                    if (!this.state.followCheck) {
                        this.props.addCoins(user).then(() => {
                            let userSession = localStorage.getItem("userSession")
                            let user = JSON.parse(userSession)
                            user.user.coins = this.props.addCoinsResponse.total_coins
                            localStorage.setItem("userSession", JSON.stringify(user));
                        })
                    }
                }
            })
        }
        if (!userSession) {
            Router.push("/login")
        }
    }

    updateState(section) {
        this.setState({section: section})
    }

    renderContainer() {
        if (this.state.section === 0) {
            return (<div></div>
                // <FollowingList username={this.props.match.params.username}/>
            );
        } else if (this.state.section === 1) {
            return (<div></div>
                // <TrackList/>
                // <FollowersList username={this.props.match.params.username}/>
            );
        } else if (this.state.section === 2) {
            return (<UserTracklist username={this.props.params.username_slug}/>
                // <FollowersList/>
                // <UserTrackList username={this.props.match.params.username}/>
            );
        } else if (this.state.section === 3) {
            return (<UserPlaylist username={this.props.params.username_slug}/>
                // <UserPlayList username={this.props.match.params.username}/>
            );
        } else {
            return ("Loading...");
        }
    }

    handleApiErrorClose = () => this.setState({ApiError: false});
    handleApiErrorShow = () => {
        this.setState({ApiError: true});
    }

    render() {
        var divStyle = {
            backgroundImage: `url('${this.state.profileDetails.cover_photo ? this.state.profileDetails.cover_photo : this.state.profileCover}')`
        }
        return (
            <div className="container-fluid custom-user-detail-page">
                {/*<NextSeo*/}
                {/*    title={this.state.profileDetails.username}*/}
                {/*    description={`Checkout ${this.state.profileDetails.username} account on DIGITVL`}*/}
                {/*    openGraph={{*/}
                {/*        url: 'https://www.digitvl.com/',*/}
                {/*        title: this.state.profileDetails.username,*/}
                {/*        description: `Checkout ${this.state.profileDetails.username} account on DIGITVL`,*/}
                {/*        site_name: 'DIGITVL',*/}
                {/*    }}*/}
                {/*    twitter={{*/}
                {/*        handle: '@digitvl',*/}
                {/*        site: '@digitvl',*/}
                {/*        cardType: 'summary_large_image',*/}
                {/*    }}*/}
                {/*/>*/}
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-user-coverImage" style={divStyle}/>
                    <div className="custom-user-social-links">
                        <div className="d-flex flex-row custom-align-social-links justify-content-end pr-5 pt-3">
                            {this.state.websiteUrl ?
                                <p className="my-auto ml-3"><a href={this.state.websiteUrl} target="_blank"
                                                               className="text-link-accent"><i
                                    className="fas fa-globe"/></a></p> : null}
                            {this.state.twitterUrl ?
                                <p className="my-auto ml-3"><a href={this.state.twitterUrl} target="_blank"
                                                               className="text-link-accent"><i
                                    className="fab fa-twitter"/></a></p> : null}
                            {this.state.instagramUrl ?
                                <p className="my-auto ml-3"><a href={this.state.instagramUrl} target="_blank"
                                                               className="text-link-accent"><i
                                    className="fab fa-instagram"/></a></p> : null}
                            {this.state.facebookUrl ?
                                <p className="my-auto ml-3"><a href={this.state.facebookUrl} target="_blank"
                                                               className="text-link-accent"><i
                                    className="fab fa-facebook"/></a></p> : null}
                            {this.state.youtubeUrl ?
                                <p className="my-auto ml-3"><a href={this.state.youtubeUrl} target="_blank"
                                                               className="text-link-accent"><i
                                    className="fab fa-youtube"/></a></p> : null}
                        </div>
                    </div>
                    <div className="justify-content-center">
                    <img
                        src={this.state.profileDetails.avatar ? this.state.profileDetails.avatar : this.state.profileImage}
                        width="140px" height="140px" className="custom-user-profile-image rounded-circle ml-5"/>
                    <div className="custom-user-data-section justify-content-center text-center">
                        <div className="d-flex custom-user-profile-data">
                            <div className="d-inline-flex flex-column custom-user-data ">
                                <span className="custom-profile-username">{this.state.profileDetails.username} {this.state.profileDetails.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}</span>
                                <div className="align-middle text-center justify-content-center">
                                <span onClick={this.hitFollowApi}
                                      className="btn btn-outline-primary custom-profile-follow-btn">{this.state.followCheck ? "Followed" : "Follow"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <ReactBootstrap.Modal
                        show={this.state.ApiError}
                        onHide={this.handleApiErrorClose}
                        backdrop="static"
                        keyboard={false}>
                        <ReactBootstrap.Modal.Header closeButton>
                            <ReactBootstrap.Modal.Title>Error</ReactBootstrap.Modal.Title>
                        </ReactBootstrap.Modal.Header>
                        <ReactBootstrap.Modal.Body>
                            <p>There is something wrong. User not found</p>
                        </ReactBootstrap.Modal.Body>
                        <ReactBootstrap.Modal.Footer>
                            <ReactBootstrap.Button variant="secondary" onClick={this.handleApiErrorClose}>
                                Close
                            </ReactBootstrap.Button>
                        </ReactBootstrap.Modal.Footer>
                    </ReactBootstrap.Modal>
                    <div className="">
                        <div className="row custom-row-margin">
                            <div className="col-md-3 col-sm-6 custom-left-side-user-data ml-5 mt-5">
                                <div className="d-flex flex-column">
                                    <span className="custom-user-profile-data-spans-title"><Link href={`/u-details/${this.props.params.username_slug}/followers`}>Followers</Link></span>
                                    <span className="custom-user-profile-data-spans-counts">{this.state.profileDetails.followers_count}</span>
                                    <span className="custom-user-profile-data-spans-title"><Link href={`/u-details/${this.props.params.username_slug}/followings`}>Following</Link></span>
                                    <span className="custom-user-profile-data-spans-counts">{this.state.profileDetails.following_count}</span>
                                    <span className="custom-user-profile-data-spans-title">Tracks</span>
                                    <span className="custom-user-profile-data-spans-counts">{this.state.profileDetails.track_count}</span>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-6 custom-right-user-nav">
                                <div className="col-md-12 nav-pills-bg-custom">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <div onClick={(e) => this.updateState(2)} className="nav-link active"
                                                 data-toggle="tab">Tracks
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div onClick={(e) => this.updateState(3)} className="nav-link"
                                                 data-toggle="tab">Playlists
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-12">
                                    {this.renderContainer()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        userDetails:state.userDetail.userDetailData,
        followUnfollowDetails:state.followUnfollow.followUnfollowData,
        followUnfollowCheckResponse:state.userFollowCheck.followCheckData,
        addCoinsResponse: state.addCoins.addCoinsData
    }
}
export default connect(mapStateToProps,{addCoins,getUserProfileDetail,followUnfollowUserApi,getUserProfileFollowCheck})(UserDetail);