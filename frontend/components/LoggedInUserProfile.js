import React, {Component} from 'react';
import Navbar from "./Navbar";
import Router from "next/router";
import {connect} from "react-redux";
import * as ReactBootstrap from "react-bootstrap";
import Link from "next/link";
import {confirmAlert} from "react-confirm-alert";
import {createPlayList,addCoins} from "../actions";
import CurrentUserTracks from "./CurrentUserTracks";
import CurrentUserFeeds from "./CurrentUserFeeds";
import {NextSeo} from "next-seo";


class LoggedInUserProfile extends Component {
    state = {
        text: 1,
        userImage: "http://nicesnippets.com/demo/1499344631_malecostume.png",
        userCover: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        username: "Demo",
        firstName: "Demo",
        lastName: "Demo",
        verified_blue_tick:false,
        get_subscription_badge:false,
        followerCount: 0,
        followingCount: 0,
        tracksCount: 0,
        createPlaylist:false,
        showCreatePlayList: false,
        showAddMusic: false,
        isPrivate: "false",
        playListName: "",
        websiteUrl: "",
        instagramUrl: "",
        facebookUrl: "",
        twitterUrl: "",
        youtubeUrl: ""
    }
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession);
        if (userSession.user) {
            this.setState({verified_blue_tick:userSession.user.profile.blue_tick_verified})
            this.setState({get_subscription_badge:userSession.user.membership_plan.subscription_badge})
            if (userSession.user.profile.avatar) {
                this.setState({
                    userImage: userSession.user.profile.avatar,
                    username: userSession.user.username,
                    firstName: userSession.user.first_name,
                    lastName: userSession.user.last_name,
                    username_slug:userSession.user.username_slug
                })
            }
            if (userSession.user.profile.cover_photo) {
                this.setState({
                    userCover: userSession.user.profile.cover_photo,
                    username: userSession.user.username,
                    firstName: userSession.user.first_name,
                    lastName: userSession.user.last_name,
                    username_slug:userSession.user.username_slug
                })
            }
            if (userSession.user.profile.website_link) {
                this.setState({websiteUrl: userSession.user.profile.website_link})
            }
            if (userSession.user.profile.instagram_link) {
                this.setState({instagramUrl: userSession.user.profile.instagram_link})
            }
            if (userSession.user.profile.facebook_link) {
                this.setState({facebookUrl: userSession.user.profile.facebook_link})
            }
            if (userSession.user.profile.twitter_link) {
                this.setState({twitterUrl: userSession.user.profile.twitter_link})
            }
            if (userSession.user.profile.youtube_link) {
                this.setState({youtubeUrl: userSession.user.profile.youtube_link})
            }
            if (!userSession.user.profile.avatar) {
                this.setState({
                    username: userSession.user.username,
                    firstName: userSession.user.first_name,
                    lastName: userSession.user.last_name,
                    username_slug:userSession.user.username_slug
                })
            }
            if (!userSession.user.profile.cover_photo) {
                this.setState({
                    username: userSession.user.username,
                    firstName: userSession.user.first_name,
                    lastName: userSession.user.last_name,
                    username_slug:userSession.user.username_slug
                })
            }
            this.setState({
                followerCount: userSession.user.profile.followers_count,
                followingCount: userSession.user.profile.following_count,
                tracksCount: userSession.user.profile.track_count
            })
        }

        if (userSession.profile) {
            if (userSession.profile.avatar) {
                this.setState({
                    userImage: userSession.profile.avatar,
                    username: userSession.username,
                    firstName: userSession.first_name,
                    lastName: userSession.last_name,
                    username_slug:userSession.username_slug
                })
            }
            if (!userSession.profile.avatar) {
                this.setState({
                    username: userSession.username,
                    firstName: userSession.first_name,
                    lastName: userSession.last_name,
                    username_slug:userSession.username_slug
                })
            }
            if (userSession.profile.cover_photo) {
                this.setState({
                    userCover: userSession.profile.cover_photo,
                    username: userSession.username,
                    firstName: userSession.first_name,
                    lastName: userSession.last_name,
                    username_slug:userSession.username_slug
                })
            }
            if (!userSession.profile.cover_photo) {
                this.setState({
                    username: userSession.username,
                    firstName: userSession.first_name,
                    lastName: userSession.last_name,
                    username_slug:userSession.username_slug
                })
            }
            if (userSession.profile.website_link) {
                this.setState({websiteUrl: userSession.profile.website_link})
            }
            if (userSession.profile.instagram_link) {
                this.setState({instagramUrl: userSession.profile.instagram_link})
            }
            if (userSession.profile.facebook_link) {
                this.setState({facebookUrl: userSession.profile.facebook_link})
            }
            if (userSession.profile.twitter_link) {
                this.setState({twitterUrl: userSession.profile.twitter_link})
            }
            this.setState({
                followerCount: userSession.profile.followers_count,
                followingCount: userSession.profile.following_count,
                tracksCount: userSession.profile.track_count
            })
        }
    }
    updateState(text1) {
        this.setState({text: text1})
    }

    radioValue = (event) => {
        if (event.target.value === "public") {
            this.setState({isPrivate: "false"})
        }
        if (event.target.value === "private") {
            this.setState({isPrivate: "true"})
        }

    }
    renderContainer() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (this.state.text === 0) {
            return (
                <CurrentUserFeeds/>
                // <FeaturedMusic/>
            );
        } else if (this.state.text === 1) {
            return (
                <CurrentUserTracks/>
            );
        } else if (this.state.text === 2) {
            if (userSession.user) {
                return (
                    <div></div>
                    // <FollowersList username={userSession.user.profile.username_slug}/>
                );
            }
            if (userSession.profile) {
                return (
                    <div></div>
                    // <FollowersList username={userSession.profile.username_slug}/>
                );
            }
        } else if (this.state.text === 3) {
            if (userSession.user) {
                return (
                    <div></div>
                    // <FollowingList username={userSession.user.profile.username_slug}/>
                );
            }
            if (userSession.profile) {
                return (
                    <div></div>
                    // <FollowingList username={userSession.profile.username_slug}/>
                );
            }
        } else if (this.state.text === 4) {
            return (
                <div></div>
                // <CurrentUserPlayList/>
            );
        } else {
            return ("Loading...");
        }
    }
    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const handleCloseCreatePlayList = () => this.setState({showCreatePlayList: false});
        const handleShowCreatePlayList = () => this.setState({showCreatePlayList: true});
        const createPlaylist = () => {
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession);
            this.setState({createPlaylist:true})
            const data = {name: this.state.playListName, is_private: this.state.isPrivate}
            this.props.createPlayList(data, userSession).then(() => {
                if (this.props.playListResponse.status) {
                    this.setState({showCreatePlayList: false})
                    const options = {
                        title: 'Success!',
                        message: "Your playlist is created",
                        buttons: [
                            {
                                label: 'Goto Library',
                                onClick: () => {
                                    Router.push("/library")
                                }
                            },
                            {
                                label: 'Okay',
                                onClick: () => {}
                            }
                        ],
                        closeOnEscape: true,
                        closeOnClickOutside: true,
                        willUnmount: () => {},
                        afterClose: () => {},
                        onClickOutside: () => {},
                        onKeypressEscape: () => {}
                    };
                    confirmAlert(options)
                    this.props.addCoins(userSession).then(() => {
                        let userSession = localStorage.getItem("userSession")
                        let user = JSON.parse(userSession)
                        user.user.coins = this.props.addCoinsResponse.total_coins
                        localStorage.setItem("userSession", JSON.stringify(user));
                    })
                    Router.push("/profile")
                }
                this.setState({createPlaylist:false})
            })
        };
        var divStyle = {
            backgroundImage: `url('${this.state.userCover}')`
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Profile"
                    description="Checkout your own profile"
                    openGraph={{
                        url: 'https://www.digitvl.com/',
                        title: 'Profile',
                        description: 'Checkout your own profile',
                        site_name: 'DIGITVL',
                        type:'website'
                    }}
                    additionalMetaTags={[
                        {
                            property:"twitter:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"twitter:image:src",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image:width",
                            content:800
                        },
                        {
                            property:"og:image:height",
                            content:500
                        }
                    ]}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                        image:'https://www.digitvl.com/images/landing_bg_img.png'
                    }}
                />
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-user-coverImage" style={divStyle}/>
                    <img
                        src={this.state.userImage}
                        width="140px" height="140px" className="custom-user-profile-image rounded-circle ml-5"/>
                    <div className="custom-user-data-section">
                        <div className="d-flex custom-currentuser-profile-data ml-3">
                            <div className="d-inline-flex flex-column custom-user-data">
                                <span className="custom-profile-username">{this.state.username}{this.state.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge ml-2" />:null}</span>
                                <div className="align-middle text-center justify-content-center">
                                    {/*<span className="custom-profile-edit"><Link href={"/"}>Edit Profile</Link></span>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row custom-profile-options-row pb-5">
                        <div className="row col-md-12 col-sm-6 justify-content-end">
                            <Link href="/profile/edit"><div className="col-md-2 mt-3 ml-3 btn btn-primary btn-sm">Edit Profile</div></Link>
                            <Link  href="/profile/links"><div className="col-md-2 mt-3 ml-3 btn btn-primary btn-sm">Add Social Links</div></Link>
                            <button onClick={handleShowCreatePlayList}
                                    className="col-md-2 mt-3 ml-3 btn btn-primary btn-sm">Create Playlist
                            </button>
                            <Link href="/profile/invite-user"><div className="col-md-2 mt-3 ml-3 btn btn-primary btn-sm">Invite User(Earn Points) </div></Link>
                        </div>
                    </div>
                    <div className="">
                        <div className="row custom-row-margin">
                            <div className="col-md-3 col-sm-6 custom-left-side-user-data ml-5 mt-5">
                                <div className="d-flex flex-column">
                                    <div className="custom-user-social-links">
                                        <div className="d-flex flex-row custom-align-social-links justify-content-start pr-5 pt-3">
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
                                    <ReactBootstrap.Modal
                                        show={this.state.showCreatePlayList}
                                        onHide={handleCloseCreatePlayList}
                                        backdrop="static"
                                        keyboard={false}>
                                        <ReactBootstrap.Modal.Header closeButton>
                                            <ReactBootstrap.Modal.Title>Create
                                                PlayList</ReactBootstrap.Modal.Title>
                                        </ReactBootstrap.Modal.Header>
                                        <ReactBootstrap.Modal.Body>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">A</span>
                                                </div>
                                                <input type="text" name="playListName"
                                                       onChange={handleChange}
                                                       value={this.state.playListName}
                                                       className="form-control"
                                                       placeholder="Playlist Name"/>
                                            </div>
                                            <div onChange={this.radioValue}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                           name="exampleRadios" id="exampleRadios1"
                                                           value="public"
                                                           checked/>
                                                    <label className="form-check-label"
                                                           htmlFor="exampleRadios1">
                                                        Public
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                           name="exampleRadios" id="exampleRadios2"
                                                           value="private"/>
                                                    <label className="form-check-label"
                                                           htmlFor="exampleRadios2">
                                                        Private
                                                    </label>
                                                </div>
                                            </div>
                                        </ReactBootstrap.Modal.Body>
                                        <ReactBootstrap.Modal.Footer>
                                            <ReactBootstrap.Button variant="secondary"
                                                                   onClick={handleCloseCreatePlayList}>
                                                Close
                                            </ReactBootstrap.Button>
                                            <ReactBootstrap.Button variant="primary" disabled={this.state.createPlaylist}
                                                                   onClick={this.state.createPlaylist?null:createPlaylist}>
                                                Create
                                            </ReactBootstrap.Button>
                                        </ReactBootstrap.Modal.Footer>
                                    </ReactBootstrap.Modal>
                                    <span className="custom-user-profile-data-spans-title mt-3"><Link href={`/u-details/${this.state.username_slug}/followers`}>Followers</Link></span>
                                    <span className="custom-user-profile-data-spans-counts">{this.state.followerCount}</span>
                                    <span className="custom-user-profile-data-spans-title"><Link href={`/u-details/${this.state.username_slug}/followings`}>Following</Link></span>
                                    <span className="custom-user-profile-data-spans-counts">{this.state.followingCount}</span>
                                    <span className="custom-user-profile-data-spans-title">Tracks</span>
                                    <span className="custom-user-profile-data-spans-counts">{this.state.tracksCount}</span>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-6 custom-right-user-nav">
                                <div className="col-md-12 nav-pills-bg-custom">
                                    <ul className="nav nav-pills">
                                        <li className="d-flex nav-item">
                                            <div onClick={(e) => this.updateState(1)} className="nav-link active"
                                                 data-toggle="tab">Tracks
                                            </div>
                                            <div onClick={(e) => this.updateState(0)} className="nav-link active ml-2"
                                                 data-toggle="tab">Feeds
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
const mapStateToProps = (state) => {
    return {
        playListResponse: state.playList.playlistResponse,
        addCoinsResponse: state.addCoins.addCoinsData
    }
}
export default connect(mapStateToProps, {createPlayList,addCoins})(LoggedInUserProfile);