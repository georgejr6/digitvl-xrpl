import React from "react";
import Navbar from "./Navbar";
import Link from "next/link"
import Image from "next/image";
import {store as NotifyStore} from 'react-notifications-component';
import {
    fetchCurrentUserLikes,
    fetchHomeMusic,
    fetchHomeChillMusic,
    fetchHomeRelaxMusic,
    playMusic,
    sendMusicIdToPlayer,
    addMusicToList,
    getWhoToFollowList,
    playCount,
    addMusicListToMediaPlayerPlaylist,
    fetchRandomMusic,
    fetchHomeFeaturedMusic,
    fetchCurrentUserDetail,
    fetchExclusiveContent,
    likeMusicApi,
    earnXrpByLike
} from "../actions"
import * as ReactBootstrap from "react-bootstrap";
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";
import Router from "next/router";
import {NextSeo} from "next-seo";
import AnnouncementBar from "./AnnouncementBar";
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import {store} from "react-notifications-component";

let userSession
let guestUser
let loggedUser

class Home extends React.Component {
    state = {
        newReleases: {},
        likes: [],
        chillReleases: {},
        relaxReleases: {},
        featuredReleases: {},
        exclusiveReleases: {},
        whoToFollowList: [],
        openWhoToFollow: true,
        searchTerm: "",
        page: 1,
        translate: undefined,
        chillPage: 1,
        relaxPage: 1,
        featuredPage: 1,
        exclusivePage: 1,
        musicPlayerPlaylist: [],
        adModalShow:false,
        tempUserImage: "http://nicesnippets.com/demo/1499344631_malecostume.png",
        musicId:null,
        playerDurationCounter:0,
        showAddPlaylist:false,
        show:false
    }
    notify = () => {
        NotifyStore.addNotification({
            title: "Success!",
            message: "You earned Xrp",
            type: "success",
            container: "top-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.playerDurationResponse !== prevProps.playerDurationResponse){

            if (this.state.playerDurationCounter === 0){
                if (this.state.musicId !== null){
                    this.props.playCount(this.state.musicId)
                }
                // this.props.sendMusicIdToPlayer(this.state.musicId)
            }
            this.setState({playerDurationCounter : this.state.playerDurationCounter+1})
            if (this.state.playerDurationCounter === 3){
                this.setState({playerDurationCounter : 0})
            }
            // console.log(this.state.playerDurationCounter)

        }
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    componentDidMount() {
        let userLoggedIn = localStorage.getItem("userLoggedIn")
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        // console.log(userSession)
        if (userSession) {
            this.props.fetchCurrentUserDetail(userSession).then(() => {
                // userSession.user.membership_plan.membership.membership_type = this.props.successSubscriptionResponse.user_membership_data[0].membership_plan.membership.membership_type
                userSession.user.membership_plan = this.props.currentUserDataResponse.membership_plan
                // userSession.user.membership_plan.membership.membership_type = "Testing"
                localStorage.setItem("userSession", JSON.stringify(userSession));

            })
            this.props.fetchCurrentUserLikes(userSession, 1).then(() => {
                this.setState({likes: this.props.likesResponse.results})
            })
            if (userLoggedIn === "true") {
                loggedUser = true
                guestUser = false
                if (userSession.user) {
                    this.props.getWhoToFollowList(userSession, userSession.user.profile.username_slug).then(() => {
                        this.setState({whoToFollowList: this.props.whoToFollowResponse.result})
                    }).catch(err => {

                        console.log(err)
                        const options = {
                            title: 'Error!',
                            message: 'Something is wrong with your account. Please Logout and login again',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => {
                                        localStorage.clear()
                                        Router.push("/")
                                    }
                                }
                            ],
                            closeOnEscape: true,
                            closeOnClickOutside: true,
                            willUnmount: () => {
                            },
                            afterClose: () => {
                            },
                            onClickOutside: () => {
                            },
                            onKeypressEscape: () => {
                            }
                        };
                        confirmAlert(options)
                    })
                    this.props.fetchHomeMusic(this.state.page,userSession).then(() => {
                        this.setState({
                            newReleases: this.props.newReleases[0],
                            musicPlayerPlaylist: this.props.newReleases[0].results
                        })
                    }, ({data}) => {
                    })
                    this.props.fetchHomeChillMusic(this.state.chillPage,userSession).then(() => {
                        this.setState({chillReleases: this.props.chillReleases[0]})
                    }, ({data}) => {
                    })
                    this.props.fetchHomeRelaxMusic(this.state.relaxPage,userSession).then(() => {
                        this.setState({relaxReleases: this.props.relaxReleases[0]})
                    }, ({data}) => {
                    })

                    this.props.fetchHomeFeaturedMusic(this.state.featuredPage,userSession).then(() => {
                        this.setState({featuredReleases: this.props.featuredMusicResponse})
                    }, ({data}) => {
                    })
                }
                if (userSession.profile) {
                    this.props.fetchHomeMusic(this.state.page,userSession).then(() => {
                        this.setState({
                            newReleases: this.props.newReleases[0],
                            musicPlayerPlaylist: this.props.newReleases[0].results
                        })
                    }, ({data}) => {
                    })
                    this.props.fetchHomeChillMusic(this.state.chillPage,userSession).then(() => {
                        this.setState({chillReleases: this.props.chillReleases[0]})
                    }, ({data}) => {
                    })
                    this.props.fetchHomeRelaxMusic(this.state.relaxPage,userSession).then(() => {
                        this.setState({relaxReleases: this.props.relaxReleases[0]})
                    }, ({data}) => {
                    })

                    this.props.fetchHomeFeaturedMusic(this.state.featuredPage,userSession).then(() => {
                        this.setState({featuredReleases: this.props.featuredMusicResponse})
                    }, ({data}) => {
                    })
                    this.props.getWhoToFollowList(userSession, userSession.profile.username_slug).then(() => {
                        this.setState({whoToFollowList: this.props.whoToFollowResponse.result})
                    }).catch(err => {
                        const options = {
                            title: 'Error!',
                            message: 'Something is wrong with your account. Please Logout and login again',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => {
                                        history.push("/logout")
                                    }
                                }
                            ],
                            closeOnEscape: true,
                            closeOnClickOutside: true,
                            willUnmount: () => {
                            },
                            afterClose: () => {
                            },
                            onClickOutside: () => {
                            },
                            onKeypressEscape: () => {
                            }
                        };
                        confirmAlert(options)
                    })
                }
            } else {
                loggedUser = false
                guestUser = true
                this.props.fetchHomeMusic(this.state.page,null).then(() => {
                    this.setState({
                        newReleases: this.props.newReleases[0],
                        musicPlayerPlaylist: this.props.newReleases[0].results
                    })
                }, ({data}) => {
                })
                this.props.fetchHomeChillMusic(this.state.chillPage,null).then(() => {
                    this.setState({chillReleases: this.props.chillReleases[0]})
                }, ({data}) => {
                })
                this.props.fetchHomeRelaxMusic(this.state.relaxPage,null).then(() => {
                    this.setState({relaxReleases: this.props.relaxReleases[0]})
                }, ({data}) => {
                })

                this.props.fetchHomeFeaturedMusic(this.state.featuredPage,null).then(() => {
                    this.setState({featuredReleases: this.props.featuredMusicResponse})
                }, ({data}) => {
                })
            }
            if (userSession.user.membership_plan.membership.membership_type !== "Free"){
                this.props.fetchExclusiveContent(userSession,this.state.exclusivePage).then(() => {
                    this.setState({exclusiveReleases:this.props.exclusiveSongsResponse})
                })
            }
        }else{
            this.props.fetchHomeMusic(this.state.page,null).then(() => {
                this.setState({
                    newReleases: this.props.newReleases[0],
                    musicPlayerPlaylist: this.props.newReleases[0].results
                })

            }, ({data}) => {
            })
            this.props.fetchHomeChillMusic(this.state.chillPage,null).then(() => {
                this.setState({chillReleases: this.props.chillReleases[0]})
            }, ({data}) => {
            })
            this.props.fetchHomeRelaxMusic(this.state.relaxPage,null).then(() => {
                this.setState({relaxReleases: this.props.relaxReleases[0]})
            }, ({data}) => {
            })

            this.props.fetchHomeFeaturedMusic(this.state.featuredPage,null).then(() => {
                this.setState({featuredReleases: this.props.featuredMusicResponse})
            }, ({data}) => {
            })
        }

    }

    playSong(data) {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchRandomMusic().then(() => {
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item => {
                if (item.song_title !== data.song_title) {
                    return {
                        song_title: item.song_title,
                        description: item.description,
                        photo_main: item.photo_main,
                        audio_file: item.audio_file
                    }
                    if (item.song_title === data.song_title) {
                        return null
                    }
                }
            }).filter(q => !!q)
            const filterData = {data: data, playlist: filterPlaylist, action: "play"}
            this.props.playMusic(filterData)

            this.setState({musicId:data.id})
            // this.props.playCount(data.id)
        })

        // const playListFilter = {data:this.state.musicPlayerPlaylist,change:data.id}
        // this.props.addMusicListToMediaPlayerPlaylist(this.state.musicPlayerPlaylist)
        // ReactDOM.findDOMNode(this.refs.playerFocus).focus();
    }

    playFeaturedSong(data) {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchRandomMusic().then(() => {
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item => {
                if (item.song_title !== data.song_title) {
                    return {
                        song_title: item.song_title,
                        description: item.description,
                        photo_main: item.photo_main,
                        audio_file: item.audio_file
                    }
                    if (item.song_title === data.song_title) {
                        return null
                    }
                }
            }).filter(q => !!q)
            const filterData = {data: data, playlist: filterPlaylist, action: "play"}
            this.props.playMusic(filterData)
            this.setState({musicId:data.id})
            // this.props.playCount(data.id)
        })

        // const playListFilter = {data:this.state.musicPlayerPlaylist,change:data.id}
        // this.props.addMusicListToMediaPlayerPlaylist(this.state.musicPlayerPlaylist)
        // ReactDOM.findDOMNode(this.refs.playerFocus).focus();
    }

    // addNextToList(data) {
    //     this.props.addMusicToList(data)
    // }

    onRedirectHome = (value) => {
        this.setState({page: value})
        this.fetchMusicList(value)
        this.fetchChillMusicList(value)
        this.fetchRelaxMusicList(value)
    }

    shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    fetchMusicList = (pageNo) => {
        this.props.fetchHomeMusic(pageNo,userSession).then(() => {
            this.setState({newReleases: this.props.newReleases[0]})
            console.log("HELLO2")
        }, ({data}) => {
        })
    }
    fetchChillMusicList = (pageNo) => {
        this.props.fetchHomeChillMusic(pageNo,userSession).then(() => {
            this.setState({chillReleases: this.props.chillReleases[0]})
        }, ({data}) => {
        })
    }
    fetchRelaxMusicList = (pageNo) => {
        this.props.fetchHomeRelaxMusic(pageNo,userSession).then(() => {
            this.setState({relaxReleases: this.props.relaxReleases[0]})
        }, ({data}) => {
        })
    }
    fetchFeaturedMusicList = (pageNo) => {
        this.props.fetchHomeFeaturedMusic(pageNo,userSession).then(() => {
            this.setState({featuredReleases: this.props.featuredMusicResponse})
        }, ({data}) => {
        })
    }
    fetchExclusiveSongsList = (pageNo) => {
        this.props.fetchExclusiveContent(userSession,pageNo).then(() => {
            this.setState({exclusiveReleases:this.props.exclusiveSongsResponse})
        }, ({data}) => {
        })
    }
    onNextExclusiveClick = () => {
        const newPage = this.state.exclusivePage + 1
        this.setState({exclusivePage: newPage})
        this.fetchExclusiveSongsList(newPage)
    }
    onPreviousExclusiveClick = () => {
        const newPage = this.state.exclusivePage - 1
        this.setState({exclusivePage: newPage})
        this.fetchExclusiveSongsList(newPage)
    }
    onNextFeaturedClick = () => {
        const newPage = this.state.featuredPage + 1
        this.setState({featuredPage: newPage})
        this.fetchFeaturedMusicList(newPage)
    }
    onPreviousFeaturedClick = () => {
        const newPage = this.state.featuredPage - 1
        this.setState({featuredPage: newPage})
        this.fetchFeaturedMusicList(newPage)
    }
    onNextClick = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchMusicList(newPage)
    }
    onPreviousClick = () => {
        const newPage = this.state.page - 1
        this.setState({page: newPage})
        this.fetchMusicList(newPage)
    }
    onChillNextClick = () => {
        const newPage = this.state.chillPage + 1
        this.setState({chillPage: newPage})
        this.fetchChillMusicList(newPage)
    }

    onChillPreviousClick = () => {
        const newPage = this.state.chillPage - 1
        this.setState({chillPage: newPage})
        this.fetchChillMusicList(newPage)
    }

    onRelaxNextClick = () => {
        const newPage = this.state.relaxPage + 1
        this.setState({relaxPage: newPage})
        this.fetchRelaxMusicList(newPage)
    }
    onRelaxPreviousClick = () => {
        const newPage = this.state.relaxPage - 1
        this.setState({relaxPage: newPage})
        this.fetchRelaxMusicList(newPage)
    }


    renderPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.newReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onPreviousClick} className="page-link">Previous</button>*/}
                        <img src="/images/back_btn_icon.svg" className="mt-3" onClick={this.onPreviousClick} width={30} height={30} />
                    </li> : null}
                    {this.state.newReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onNextClick} className="page-link">Next</button>*/}
                        <img src="/images/next_btn_icon.svg" className="mt-3" onClick={this.onNextClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderFeaturedPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.featuredReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onPreviousFeaturedClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onPreviousFeaturedClick} width={30} height={30} />
                    </li> : null}
                    {this.state.featuredReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onNextFeaturedClick} className="page-link">Next</button>*/}
                        <Image src="/images/next_btn_icon.svg" onClick={this.onNextFeaturedClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderExclusivePagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.exclusiveReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onPreviousFeaturedClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onPreviousExclusiveClick} width={30} height={30} />
                    </li> : null}
                    {this.state.exclusiveReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onNextFeaturedClick} className="page-link">Next</button>*/}
                        <Image src="/images/next_btn_icon.svg" onClick={this.onNextExclusiveClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderChillPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.chillReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onChillPreviousClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onChillPreviousClick} width={30} height={30} />
                    </li> : null}
                    {this.state.chillReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onChillNextClick} className="page-link">Next</button>*/}
                        <Image src="/images/next_btn_icon.svg" onClick={this.onChillNextClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderWhoToFollowList = () => {
        if (this.state.whoToFollowList){
            if (this.state.whoToFollowList.length === 0){
                return (
                    <div className="col-md-12">
                        <span className="text-center">Follow More People!</span>
                    </div>
                );
            }
            const shuffledArrayV = this.shuffleArray(this.state.whoToFollowList)
            return shuffledArrayV.slice(0,10).map(user =>{
                return (
                    <div className="cupl-container d-flex flex-row justify-content-between align-items-center mb-2">
                        <div className="d-flex flex-row align-items-center"><img
                            className="rounded-circle who-to-follow-user-img" src={user.profile.avatar?user.profile.avatar:this.state.tempUserImage} width="55"
                            height="55"/>
                            <div className="d-flex flex-column align-items-start ml-2">
                                <div className="d-flex">
                                                            <span className="font-weight-bold"><Link href={`/u-details/${user.profile.username_slug}`}
                                                                                                     className="user-name">{user.profile.username}</Link> {user.profile.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}</span>
                                    {/*{user.profile.blue_tick_verified ?<img src={process.env.PUBLIC_URL + '/verified_check.png'} className="my-auto ml-2" alt="" width="15" height="15"/> : null}*/}
                                </div>
                                <span className="followers">{user.profile.followers_count} Followers</span></div>
                        </div>
                    </div>
                )
            })
        }
    }
    renderRelaxPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.relaxReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onRelaxPreviousClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onRelaxPreviousClick} width={30} height={30} />
                    </li> : null}
                    {this.state.relaxReleases.next ? <li className="page-item">
                        <button onClick={this.onRelaxNextClick} className="page-link">Next</button>
                        <Image src="/images/next_btn_icon.svg" onClick={this.onRelaxNextClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    searchTag = (term) => {
        Router.push(`/search/${term}`)
    }
    renderFeaturedReleases = () => {
        if (this.state.featuredReleases.results) {
            if (this.state.featuredReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Track Featured</h3>
                    </div>
                );
            }
            return this.state.featuredReleases.results.map(result => {
                return (
                    <div className="row col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg align-items-center">
                        <div className="col-md-2 col-sm-6">
                            <img src={result.target.photo_main} height="130" width="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div className="d-flex flex-column w-100">
                                <div className="d-flex flex-row custom-trending-item-artist-track fs-mob-11">
                                    {/*<Link href={`/u-details/${result.target.username_slug}`}>{result.target.username}</Link>*/}
                                    {/*<i className="ml-3 mr-3">•</i>*/}
                                    <Link
                                        href={`/m-details/${result.target.username_slug}/${result.target.slug}`}>{result.target.song_title.slice(0, 20)}</Link>
                                </div>
                                {/*<div className="d-flex flex-row mt-2 custom-trending-item-title">*/}
                                {/*    Title: {result.target.song_title}*/}
                                {/*</div>*/}
                                <div className="d-flex flex-row mt-3 custom-trending-item-description fs-mob-11">
                                    <Link href={`/u-details/${result.target.username_slug}`}>{result.target.username}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto w-100">
                            <div className="text-center mt-2" onClick={() => this.playFeaturedSong(result.target)}>
                                <div className="btn btn-outline-primary cus-btn-width">▶ Play</div>
                            </div>
                        </div>
                        <div className="d-inline-block flex-row mt-2 ml-3 mb-3">
                            {userSession ?this.renderFeaturedLikeButton(result.target.user_like,result.target.id):null}
                            {/*<button onClick={this.handleShow} className="btn btn-outline-primary btn-sm m-2" type="button">*/}
                            {/*    <i className="far fa-share-square"/> Share*/}
                            {/*</button>*/}
                            <button onClick={() => this.addNextToList(result.target)} className="btn btn-outline-primary btn-sm m-2" type="button">
                                <i className="far fa-list-alt"/> Add To Next Up
                            </button>
                        </div>
                    </div>
                    // <div className={`col-md-4 custom-home-music-display mobile-track-home-margin`}>
                    //     <div className={`custom-home-music-img ${guestUser?"guest-view-home":null}`} onClick={() => this.playFeaturedSong(result.target)}>
                    //         <img src={result.target.photo_main} className="music-cover-img"/>
                    //         <div className="play">
                    //             <span><i className="fa fa-play"/></span>
                    //         </div>
                    //     </div>
                    //     <div className="custom-home-music-text">
                    //         <Link href={`/m-details/${result.target.username_slug}/${result.target.slug}`}
                    //               className="music-name">{result.target.song_title.slice(0, 20)}</Link> by <Link
                    //         href={`/u-details/${result.target.username_slug}`}
                    //         className="user-name">{result.target.username}</Link>  {result.target.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}
                    //     </div>
                    // </div>
                )
            })
        }
    }

    renderLikesList() {
        if (this.state.likes) {
            if (this.state.likes.length === 0) {
                return (
                    <div className="col-md-12">
                        <span className="text-center">Like Music To Update!</span>
                    </div>
                );
            }
            return this.state.likes.slice(0, 5).map(result => {
                return (
                    <div>
                        <div
                            className="cupl-container d-flex flex-row justify-content-between align-items-center mb-3">
                            <div className="d-flex flex-row align-items-center"><img
                                className="rounded-circle" src={result.photo_main} width="55"
                                height="55"/>
                                <div className="d-flex flex-column align-items-start ml-2">
                                    <div className="d-flex">
                                                        <span className="font-weight-bold"><Link href={`/m-details/${result.username_slug}/${result.slug}`}
                                                                                                 className="user-name">{result.song_title.slice(0,16)}</Link></span>
                                        {/*{user.profile.blue_tick_verified ?<img src={process.env.PUBLIC_URL + '/verified_check.png'} className="my-auto ml-2" alt="" width="15" height="15"/> : null}*/}
                                    </div>
                                    {/*<span className="followers">100 Followers</span>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    addNextToList = (data) => {
        const filterData = {data: data, action: "addToList"}
        this.props.addMusicToList(filterData)
    }
    renderLikeButton = (isLiked, musicId) => {
        var likeCheck = isLiked
        if (isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = false
                            var page = this.state.page
                            this.fetchMusicList(page)

                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm m-2" type="button">
                    <i className="fas fa-heart"/>{likeCheck? " Liked" : " Like"}
                </button>
            );
        }
        if (!isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = true
                            var page = this.state.page
                            this.fetchMusicList(page)
                            const data = {xrp_token_amount_earn:0.2}
                            const formData = new FormData()
                            formData.append("xrp_token_amount_earn", 0.1);
                            this.props.earnXrpByLike(userSession,formData).then(() =>{
                                // console.log(this.props.earnXrpByLikeResponse)
                                // this.notify()
                                alert("You earned 0.1 xrp")
                            }).catch(err => {

                            })
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm mr-2" type="button">
                    <i className="far fa-heart "/>{likeCheck? " Liked" : " Like"}</button>
            );
        }
        return false;
    }
    renderFeaturedLikeButton = (isLiked, musicId) => {
        var likeCheck = isLiked
        if (isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = false
                            var page = this.state.page
                            this.fetchFeaturedMusicList(page)
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm m-2" type="button">
                    <i className="fas fa-heart"/>{likeCheck? " Liked" : " Like"}
                </button>
            );
        }
        if (!isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = true
                            var page = this.state.page
                            this.fetchFeaturedMusicList(page)
                            const formData = new FormData()
                            formData.append("xrp_token_amount_earn", 0.1);
                            this.props.earnXrpByLike(userSession,formData).then(() =>{
                                // console.log(this.props.earnXrpByLikeResponse)
                                // this.notify()
                                alert("You earned 0.1 xrp")
                            }).catch(err => {

                            })
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm mr-2" type="button">
                    <i className="far fa-heart "/>{likeCheck? " Liked" : " Like"}</button>
            );
        }
        return false;
    }
    renderRelaxLikeButton = (isLiked, musicId) => {
        var likeCheck = isLiked
        if (isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = false
                            var page = this.state.page
                            this.fetchRelaxMusicList(page)
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm m-2" type="button">
                    <i className="fas fa-heart"/>{likeCheck? " Liked" : " Like"}
                </button>
            );
        }
        if (!isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = true
                            var page = this.state.page
                            this.fetchRelaxMusicList(page)
                            const formData = new FormData()
                            formData.append("xrp_token_amount_earn", 0.1);
                            this.props.earnXrpByLike(userSession,formData).then(() =>{
                                // console.log(this.props.earnXrpByLikeResponse)
                                // this.notify()
                                alert("You earned 0.1 xrp")
                            }).catch(err => {

                            })
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm mr-2" type="button">
                    <i className="far fa-heart "/>{likeCheck? " Liked" : " Like"}</button>
            );
        }
        return false;
    }
    renderChillLikeButton = (isLiked, musicId) => {
        var likeCheck = isLiked
        if (isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = false
                            var page = this.state.page
                            this.fetchChillMusicList(page)
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm m-2" type="button">
                    <i className="fas fa-heart"/>{likeCheck? " Liked" : " Like"}
                </button>
            );
        }
        if (!isLiked) {
            return (
                <button onClick={() => {
                    if (userSession) {
                        this.props.likeMusicApi(musicId, userSession).then(() => {
                            likeCheck = true
                            var page = this.state.page
                            this.fetchChillMusicList(page)
                            const formData = new FormData()
                            formData.append("xrp_token_amount_earn", 0.1);
                            this.props.earnXrpByLike(userSession,formData).then(() =>{
                                // console.log(this.props.earnXrpByLikeResponse)
                                // this.notify()
                                alert("You earned 0.1 xrp")
                            }).catch(err => {

                            })
                        }).catch(err => {
                        })
                    } else if (!userSession) {
                        Router.push("/login")
                    }
                }} className="btn btn-outline-primary btn-sm mr-2" type="button">
                    <i className="far fa-heart "/>{likeCheck? " Liked" : " Like"}</button>
            );
        }
        return false;
    }
    renderNewReleases() {
        if (this.state.newReleases.results) {
            if (this.state.newReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.newReleases.results.map(result => {
                return (
                    <div className="row col-md-12 col-sm-2 col-xs-2 pt-2 pb-2 custom-trending-item-bg align-items-center">
                        <ReactBootstrap.Modal
                            show={this.state.show}
                            onHide={this.handleClose}
                            backdrop="static"
                            keyboard={false}>
                            <ReactBootstrap.Modal.Header closeButton>
                                <ReactBootstrap.Modal.Title>Share</ReactBootstrap.Modal.Title>
                            </ReactBootstrap.Modal.Header>
                            <ReactBootstrap.Modal.Body>
                                <div className="custom-input">
                                    <span><i className="fas fa-globe"> </i></span>
                                    <input name="shareDescription" value={result.description} type="text"
                                           onChange={this.handleChange}
                                           placeholder="Description"/>
                                </div>
                                <FacebookShareButton
                                    url={`https://app.digitvl.com/${result.username_slug}/${result.slug}`}
                                    quote={result.description}
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookIcon size={32} round/>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://app.digitvl.com/${result.username_slug}/${result.slug}`}
                                    title={result.description}
                                    className="Demo__some-network__share-button"
                                >
                                    <TwitterIcon size={32} round/>
                                </TwitterShareButton>
                                {/*<LinkedinShareButton url="https://www.google.com" className="Demo__some-network__share-button">*/}
                                {/*    <LinkedinIcon size={32} round />*/}
                                {/*</LinkedinShareButton>*/}
                                <input className="form-control" type="text" placeholder={`https://app.digitvl.com/${result.username_slug}/${result.slug}`}
                                       readOnly/>
                            </ReactBootstrap.Modal.Body>
                            <ReactBootstrap.Modal.Footer>
                                <ReactBootstrap.Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </ReactBootstrap.Button>
                            </ReactBootstrap.Modal.Footer>
                        </ReactBootstrap.Modal>
                        <div className="col-md-2 col-sm-2 col-xs-2">
                            <img src={result.photo_main} height="130" width="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-2 col-xs-2 mt-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track fs-mob-11">
                                    {/*<Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>*/}
                                    {/*<i className="ml-3 mr-3">•</i>*/}
                                    <Link
                                        href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
                                </div>
                                {/*<div className="d-flex flex-row mt-2 custom-trending-item-title fs-mob-11">*/}
                                {/*    Title: {result.song_title}*/}
                                {/*</div>*/}
                                <div className="d-flex flex-row mt-3 custom-trending-item-description fs-mob-11">
                                    {/*{result.description}*/}
                                    <Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 my-auto w-100">
                            <div className="text-center mt-2 " onClick={() => this.playSong(result)}>
                                <div className="btn btn-outline-primary cus-btn-width">▶ Play</div>
                            </div>
                        </div>
                        <div className="d-inline-block flex-row mt-2 ml-3 mb-3">
                            {userSession ?this.renderLikeButton(result.user_like,result.id):null}
                            {/*<button onClick={this.handleShow} className="btn btn-outline-primary btn-sm m-2" type="button">*/}
                            {/*    <i className="far fa-share-square"/> Share*/}
                            {/*</button>*/}
                            <button onClick={() => this.addNextToList(result)} className="btn btn-outline-primary btn-sm m-2" type="button">
                                <i className="far fa-list-alt"/> Add To Next Up
                            </button>
                        </div>
                    </div>
                    // <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                    //     <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                    //         <img src={result.photo_main} className="music-cover-img"/>
                    //         <div className="play">
                    //             <span><i className="fa fa-play"/></span>
                    //         </div>
                    //     </div>
                    //     <div className="custom-home-music-text">
                    //         <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                    //               className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                    //         href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link> {result.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}
                    //     </div>
                    // </div>
                )
            })
        }
    }
    renderExclusiveReleases() {
        if (this.state.exclusiveReleases.results) {
            if (this.state.exclusiveReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.exclusiveReleases.results.map(result => {
                return (
                    <div className="row col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg align-items-center">
                        <div className="col-md-2 col-sm-6">
                            <img src={result.photo_main} height="130" width="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track">
                                    {/*<Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>*/}
                                    {/*<i className="ml-3 mr-3">•</i>*/}
                                    <Link
                                        href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
                                </div>
                                {/*<div className="d-flex flex-row mt-2 custom-trending-item-title">*/}
                                {/*    Title: {result.song_title}*/}
                                {/*</div>*/}
                                <div className="d-flex flex-row mt-3 custom-trending-item-description">
                                    {/*{result.description}*/}
                                    <Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 my-auto w-100">
                            <div className="text-center mt-2 " onClick={() => this.playSong(result)}>
                                <div className="btn btn-outline-primary cus-btn-width">▶ Play</div>
                            </div>
                        </div>
                    </div>
                    // <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                    //     <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                    //         <img src={result.photo_main} className="music-cover-img"/>
                    //         <div className="play">
                    //             <span><i className="fa fa-play"/></span>
                    //         </div>
                    //     </div>
                    //     <div className="custom-home-music-text">
                    //         <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                    //               className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                    //         href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link> {result.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}
                    //     </div>
                    // </div>
                )
            })
        }
    }

    renderChillReleases() {
        if (this.state.chillReleases.results) {
            if (this.state.chillReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.chillReleases.results.map(result => {
                return (
                    <div className="row col-md-12 col-sm-6 col-xs-4 pt-2 pb-2 custom-trending-item-bg align-items-center">
                        <div className="col-md-2 col-sm-2">
                            <img src={result.photo_main} width="130" height="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-2 col-xs-2 mt-2 w-50">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track fs-mob-11">
                                    {/*<Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>*/}
                                    {/*<i className="ml-3 mr-3">•</i>*/}
                                    <Link
                                        href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
                                </div>
                                {/*<div className="d-flex flex-row mt-2 custom-trending-item-title fs-mob-11">*/}
                                {/*    Title: {result.song_title}*/}
                                {/*</div>*/}
                                <div className="d-flex flex-row mt-3 custom-trending-item-description fs-mob-11">
                                    {/*{result.description}*/}
                                    <Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto w-100">
                            <div className="text-center mt-2 " onClick={() => this.playSong(result)}>
                                <div className="btn btn-outline-primary cus-btn-width">▶ Play</div>
                            </div>
                        </div>
                        <div className="d-inline-block flex-row mt-2 ml-3 mb-3">
                            {userSession ?this.renderChillLikeButton(result.user_like,result.id):null}
                            {/*<button onClick={this.handleShow} className="btn btn-outline-primary btn-sm m-2" type="button">*/}
                            {/*    <i className="far fa-share-square"/> Share*/}
                            {/*</button>*/}
                            <button onClick={() => this.addNextToList(result)} className="btn btn-outline-primary btn-sm m-2" type="button">
                                <i className="far fa-list-alt"/> Add To Next Up
                            </button>
                        </div>
                    </div>
                    // <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                    //     <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                    //         <img src={result.photo_main} className="music-cover-img"/>
                    //         <div className="play">
                    //             <span><i className="fa fa-play"/></span>
                    //         </div>
                    //     </div>
                    //     <div className="custom-home-music-text">
                    //         <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                    //               className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                    //         href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link> {result.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}
                    //     </div>
                    // </div>
                )
            })
        }
    }

    renderRelaxReleases() {
        const col_md_4 = "col-md-4"
        const col_md_3 = "col-md-3"
        if (this.state.relaxReleases.results) {
            if (this.state.relaxReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.relaxReleases.results.map(result => {
                return (
                    <div className="row col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg align-items-center">
                        <div className="col-md-2 col-sm-6">
                            <img src={result.photo_main} height="130" width="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track fs-mob-11">
                                    {/*<Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>*/}
                                    {/*<i className="ml-3 mr-3">•</i>*/}
                                    <Link
                                        href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
                                </div>
                                {/*<div className="d-flex flex-row mt-2 custom-trending-item-title fs-mob-11">*/}
                                {/*    Title: {result.song_title}*/}
                                {/*</div>*/}
                                <div className="d-flex flex-row mt-3 custom-trending-item-description fs-mob-11">
                                    {/*{result.description}*/}
                                    <Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto w-100">
                            <div className="text-center mt-2 " onClick={() => this.playSong(result)}>
                                <div className="btn btn-outline-primary cus-btn-width">▶ Play</div>
                            </div>
                        </div>
                        <div className="d-inline-block flex-row mt-2 ml-3 mb-3">
                            {userSession ?this.renderRelaxLikeButton(result.user_like,result.id):null}
                            {/*<button onClick={this.handleShow} className="btn btn-outline-primary btn-sm m-2" type="button">*/}
                            {/*    <i className="far fa-share-square"/> Share*/}
                            {/*</button>*/}
                            <button onClick={() => this.addNextToList(result)} className="btn btn-outline-primary btn-sm m-2" type="button">
                                <i className="far fa-list-alt"/> Add To Next Up
                            </button>
                        </div>
                    </div>
                    // <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                    //     <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                    //         <img src={result.photo_main} className="music-cover-img"/>
                    //         <div className="play">
                    //             <span><i className="fa fa-play"/></span>
                    //         </div>
                    //     </div>
                    //     <div className="custom-home-music-text">
                    //         <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                    //               className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                    //         href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link> {result.get_subscription_badge?<img src="/images/subscription_badge.png" className="custom-subscription-badge" />:null}
                    //     </div>
                    // </div>
                )
            })
        }
    }

    renderLoggedInUser = () => {
        return (<div>
            <div className="custom-home-screen">
                <div className="row custom-row-setting">
                    <div className="col-md-9">
                        {userSession.user.membership_plan.subscription_badge ? <div className="custom-home-headers">
                            <h3>Exclusive Tracks</h3>
                        </div>:null}
                        {userSession.user.membership_plan.subscription_badge ?<div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderExclusiveReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderExclusivePagination()}
                            </div>
                        </div>:null}
                        <div className="custom-home-headers">
                            <h3>Featured Tracks</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderFeaturedReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderFeaturedPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>New Releases</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderNewReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Chill Tracks</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderChillReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderChillPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Relax Tracks</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderRelaxReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderRelaxPagination()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="custom-home-right-section-wrapper mobile-home-right-section-wrapper">
                            <div className="row">
                                <div className="col-md-11 home-right-menu-tags-heading">
                                    <span className="span-heading">Popular Tags</span>
                                </div>
                                <div className="col-md-11 cupl home-right-menu-tags-content">
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("chill")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Chill
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("relax")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Relax
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("party")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Party
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("hot")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Hot
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("disco")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Disco
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("love")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Love
                                    </ReactBootstrap.Badge>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-11 home-right-menu-who-to-follow-heading">
                                        <span className="span-heading">
                                            <ReactBootstrap.Accordion
                                                className="btn text-accent font-weight-bold"
                                                onClick={() => this.setState({openWhoToFollow: !this.state.openWhoToFollow})}
                                                aria-controls="example-collapse-text"
                                                aria-expanded={this.state.openWhoToFollow}
                                            >
                                            Who To Follow?  +
                                            </ReactBootstrap.Accordion>
                                        </span>
                                </div>
                                <ReactBootstrap.Collapse in={this.state.openWhoToFollow}>
                                    <div className="home-right-menu-who-to-follow-content">
                                        {this.renderWhoToFollowList()}
                                    </div>
                                </ReactBootstrap.Collapse>
                            </div>
                            <div className="row">
                                <div className="col-md-12 home-right-menu-likes-heading">
                                    <div className="">
                                        <span className="span-heading-likes">Likes</span>
                                        {/*<p className="custom-likes-view-all">*/}
                                        <Link href="/library"><span
                                            className="btn text-link-accent custom-likes-view-all">View all</span></Link>
                                        {/*</p>*/}
                                    </div>
                                </div>
                                <div className="cupl home-right-menu-likes-content">
                                    {this.renderLikesList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    renderGuestUser = () => {
        return (<div>
            <div className="custom-home-screen">
                <div className="row custom-row-margin custom-row-setting">
                    <div className="col-md-9 col-sm-6">
                        <div className="custom-home-headers">
                            <h3>Featured Tracks</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 col-sm-6 custom-row-margin custom-home-left-section">
                                {this.renderFeaturedReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderFeaturedPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>New Releases</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 custom-row-margin custom-home-left-section">
                                {this.renderNewReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Chill Tracks</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 custom-row-margin custom-home-left-section">
                                {this.renderChillReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderChillPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Relax Tracks</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 custom-row-margin custom-home-left-section">
                                {this.renderRelaxReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderRelaxPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    handleChange = (e) => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
    }


    render() {
        const col_md_12 = "col-md-12"
        const col_md_9 = "col-md-9"

        return (
            <div className="home-screen">
                <NextSeo
                    title="Home"
                    description="Explore Hub for independent creators and their unique music art"
                    openGraph={{
                        url: 'https://www.digitvl.com/home',
                        title: 'Home',
                        description: 'Explore Hub for independent creators and their unique music art',
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
                <AnnouncementBar/>
                <Navbar/>
                {userSession ? this.renderLoggedInUser() : this.renderGuestUser()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newReleases: Object.values(state.fetchMusic),
        chillReleases: Object.values(state.fetchChillMusic),
        relaxReleases: Object.values(state.fetchRelaxMusic),
        likesResponse: state.likesList.likesListResponse,
        likeMusicResponse: state.likeMusic.likeMusicResponseData,
        whoToFollowResponse: state.getWhoToFollow.whoToFollowListData,
        playerDurationResponse: state.playerDuration.musicPlayerDuration,
        randomMusicResponse: state.fetchRandomMusic.musicRandomFetchData,
        featuredMusicResponse: state.fetchFeaturedMusic.featuredMusicData,
        currentUserDataResponse: state.currentUserDetail.currentUserDetailResponse,
        exclusiveSongsResponse: state.fetchExclusiveSongs.exclusiveSongsDataResponse,
        earnXrpByLikeResponse: state.earnXrp.earnXrpData
    }
}

export default connect(mapStateToProps, {
    fetchCurrentUserLikes,
    getWhoToFollowList,
    fetchHomeMusic: fetchHomeMusic,
    fetchHomeChillMusic: fetchHomeChillMusic,
    fetchHomeRelaxMusic: fetchHomeRelaxMusic,
    playMusic: playMusic,
    addMusicToList,
    sendMusicIdToPlayer,
    playCount,
    addMusicListToMediaPlayerPlaylist,
    fetchRandomMusic,
    fetchHomeFeaturedMusic,
    fetchCurrentUserDetail,
    fetchExclusiveContent,
    likeMusicApi,
    earnXrpByLike
})(Home);