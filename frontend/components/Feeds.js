import React, {Component} from 'react';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {fetchUserFeeds,tweetApi,getCurrentUserDigitvlCoins} from "../actions";
import {confirmAlert} from "react-confirm-alert";
import MusicPost from "./feed_types/MusicPost";
import LikePost from "./feed_types/LikePost";
import CommentPost from "./feed_types/CommentPost";
import FeaturedFeedPost from "./feed_types/FeaturedFeedPost";
import TweetPost from "./feed_types/TweetPost";
import {NextSeo} from "next-seo";
class Feeds extends Component {
    state = {feedsListResponse: {}, feeds: [], page: 1,tweetBody:""}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchUserFeeds(userSession, this.state.page).then(() => {
            this.setState({
                feedsListResponse: this.props.userFeedsResponse,
                feeds: this.props.userFeedsResponse.results
            })
        }).catch(err => {

        })
    }

    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchFeedsList(newPage)
    }
    fetchFeedsList = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchUserFeeds(userSession, pageNo).then(() => {
            this.setState({
                feedsListResponse: this.props.userFeedsResponse,
                feeds: [...this.state.feeds, ...this.props.userFeedsResponse.results]
            })
        }, ({data}) => {
        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.feedsListResponse.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderFeeds = () => {
        if (this.state.feeds) {
            if (this.state.feeds.length === 0) {
                return (
                    <div className="col-md-12">
                        <h5 className="text-center text-color-white">There are no current feeds to display.</h5>
                    </div>
                );
            }
            return this.state.feeds.map(result => {
                if (result.verb_id === 1) {
                    return (<div className="container"><MusicPost data={result}/></div>)
                }
                if (result.verb_id === 2) {
                    return (<div className="container"><LikePost data={result}/></div>)
                }
                if (result.verb_id === 3) {
                    return (<div className="container"><CommentPost data={result}/></div>)
                }
                if (result.verb_id === 6){
                    return (<div className="container"><FeaturedFeedPost data={result}/></div>)
                }
                if (result.verb_id === 7){
                    return (<div className="container"><TweetPost data={result}/></div>)
                }
            })
        }
    }
    render() {
        const onSubmit = (e) => {
            e.preventDefault();
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            const formData = new FormData();
            formData.append("tweet", this.state.tweetBody);
            this.props.tweetApi(formData,userSession).then(()=>{
                this.setState({tweetBody:"",page:1})
                this.props.fetchUserFeeds(userSession, 1).then(() => {
                    if (this.props.tweetResponse.status){
                        this.setState({
                            feedsListResponse: this.props.userFeedsResponse,
                            feeds: this.props.userFeedsResponse.results
                        })
                        this.props.getCurrentUserDigitvlCoins(userSession).then(()=>{

                        })
                    }else{
                        const options = {
                            title: 'Error!',
                            message: this.props.tweetResponse.message,
                            buttons: [
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
                    }


                }).catch(err => {

                })
            }).catch(err=>{
                alert(err)
            })
        }
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Feeds"
                    description="Get latest feeds from your artists you followed"
                    openGraph={{
                        url: 'https://www.digitvl.com/feed',
                        title: 'DIGITVL',
                        description: 'Get latest feeds from your artists you followed',
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
                    <div className="row custom-row-margin mt-5">
                        <div className="col-md-12">
                            <div className="container bootstrap snippets bootdey">
                                <div className="row">
                                    <div className="col-md-offset-3 col-md-12 col-xs-12">
                                        <div className="well well-sm well-social-post">
                                            <form onSubmit={onSubmit}>
                                                    <textarea name="tweetBody" onChange={handleChange} value={this.state.tweetBody} className="form-control custom-tweet-inputtext resize-disable"
                                                              placeholder="What's in your mind?"/>
                                                <ul className='list-inline post-actions mt-2'>
                                                    <li className=''><div className="justify-content-end align-content-end align-items-end"><button type="submit"
                                                                                                       className='btn btn-primary btn-xs'>Post</button></div>
                                                    </li>
                                                    <li className='pull-right align-items-end mt-2'><b><span className="text-link-accent">Tweet will cost 50 DIGITVL coins</span></b>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container col-md-12">
                            <div className="container">
                            <div className="streams-body-info mt-3">Hear the latest news feed from the people you’re following:</div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3 pt-3">
                            {this.renderFeeds()}
                        </div>
                        <div className="col-md-12 mt-3">
                            {this.renderLoadMore()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userFeedsResponse: state.userFeeds.userFeedsData,
        tweetResponse:state.tweetFeature.tweetFeatureData
    }
}
export default connect(mapStateToProps, {fetchUserFeeds,tweetApi,getCurrentUserDigitvlCoins})(Feeds);