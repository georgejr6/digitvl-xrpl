import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUserMusic, fetchUserMusicWithoutToken, playMusic, playCount} from "../actions";
import Link from "next/link";

class UserTracklist extends Component {
    state = {
        tracks: {},
        tracksList: [],
        page: 1,
        musicId:null,
        playerDurationCounter:0
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
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            this.props.fetchUserMusic(this.props.username, userSession, this.state.page).then(() => {
                this.setState({tracks: this.props.userMusicList, tracksList: this.props.userMusicList.results})
            }, ({data}) => {

            });
        }
        if (!userSession) {
            this.props.fetchUserMusicWithoutToken(this.props.username, this.state.page).then(() => {
                this.setState({tracks: this.props.userMusicList, tracksList: this.props.userMusicList.results})
            }, ({data}) => {

            });
        }
    }

    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchTracksList(newPage)
    }
    fetchTracksList = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchUserMusicWithoutToken(this.props.username, pageNo).then(() => {
            this.setState({
                tracks: this.props.userMusicList,
                tracksList: [...this.state.tracksList, ...this.props.userMusicList.results]
            })
        }, ({data}) => {
        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.tracks.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }

    playSong(data) {
        const filterData = {data: data, action: "play"}
        this.props.playMusic(filterData)
        this.setState({musicId:data.id})
        // this.props.playCount(data.id)
    }

    renderTracksList() {
        if (this.state.tracksList) {
            if (this.state.tracksList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Tracks To Show</h3>
                    </div>
                );
            }
            return this.state.tracksList.map(result => {
                return (
                    <div key={result.id} className="custom-track-list-bg p-3 mt-3">
                        <div className="row">
                            <div className="col-md-2">
                                <img  src={result.photo_main} alt="" className="rounded" width="90px" height="90px"/>
                            </div>
                            <div className="d-flex flex-column col-md-6 my-auto">
                                {/*<div className="my-auto">*/}
                                <span className="custom-user-tracklist-track-title"><Link href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title}</Link></span>
                                <span className="custom-user-tracklist-track-plays">{result.total_likes} likes</span>
                                {/*</div>*/}
                            </div>
                            <div className="col-md-3 my-auto">
                                <div onClick={()=>this.playSong(result)} className="btn btn-outline-primary">▶ Play</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <div className="p-3">
                    <div className="col-md-12">
                        {this.renderTracksList()}
                    </div>
                    <div className="mt-3">
                    {this.renderLoadMore()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userMusicList: state.fetchUserMusic.userMusicFetchData,
        playerDurationResponse: state.playerDuration.musicPlayerDuration
    }
}
export default connect(mapStateToProps, {
    fetchUserMusic: fetchUserMusic,
    fetchUserMusicWithoutToken: fetchUserMusicWithoutToken,
    playMusic: playMusic,
    playCount
})(UserTracklist);