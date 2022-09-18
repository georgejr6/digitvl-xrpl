import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchCurrentUserFeeds} from "../actions";
import Link from "next/link";
import {confirmAlert} from "react-confirm-alert";
import MusicPost from "./feed_types/MusicPost";
import LikePost from "./feed_types/LikePost";
import CommentPost from "./feed_types/CommentPost";
import FeaturedFeedPost from "./feed_types/FeaturedFeedPost";
import TweetPost from "./feed_types/TweetPost";

class CurrentUserFeeds extends Component {
    state = {feedsListResponse: {}, feeds: [], page: 1}

    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchCurrentUserFeeds(userSession, this.state.page).then(() => {
            this.setState({
                feedsListResponse: this.props.currentUserMusicList,
                feeds: this.props.currentUserMusicList.results
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
                feedsListResponse: this.props.currentUserMusicList,
                feeds: [...this.state.feeds, ...this.props.currentUserMusicList.results]
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
                        <h5 className="text-center">There are no current feeds to display.</h5>
                    </div>
                );
            }
            return this.state.feeds.map(result => {
                if (result.verb_id === 1) {
                    // return (<div className="container"><MusicPost data={result}/></div>)
                }
                if (result.verb_id === 2) {
                    return (<div className="container"><LikePost data={result}/></div>)
                }
                if (result.verb_id === 3) {
                    return (<div className="container"><CommentPost data={result}/></div>)
                }
                if (result.verb_id === 6) {
                    return (<div className="container"><FeaturedFeedPost data={result}/></div>)
                }
                if (result.verb_id === 7) {
                    return (<div className="container"><TweetPost data={result}/></div>)
                }
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 mt-3 pt-3">
                        {this.renderFeeds()}
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    {this.renderLoadMore()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserMusicList: state.currentUserFeeds.fetchCurrentUserFeedsData
    }
}
export default connect(mapStateToProps, {fetchCurrentUserFeeds})(CurrentUserFeeds);