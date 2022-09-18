import React, {Component} from 'react';
import Link from "next/link"
import {connect} from "react-redux";
import {fetchCurrentUserLikes, playMusic,playCount,fetchRandomMusic} from "../actions";
class CurrentUserLikes extends Component {
    state = {likesListResponse: {}, likes: [], page: 1}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchCurrentUserLikes(userSession, this.state.page).then(() => {
            this.setState({likesListResponse: this.props.likesResponse, likes: this.props.likesResponse.results})
        })
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchLikesList(newPage)
    }
    fetchLikesList = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchCurrentUserLikes(userSession, pageNo).then(() => {
            this.setState({
                likesListResponse: this.props.likesResponse,
                likes: [...this.state.likes, ...this.props.likesResponse.results]
            })
        }, ({data}) => {
        })
    }
    playSong(data) {
        this.props.fetchRandomMusic().then(()=>{
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item =>{
                if (item.song_title !== data.song_title) {
                    return {
                        song_title: item.song_title,
                        description: item.description,
                        photo_main: item.photo_main,
                        audio_file: item.audio_file
                    }
                    if (item.song_title === data.song_title){
                        return null
                    }
                }
            }).filter(q => !!q)
            const filterData = {data: data,playlist:filterPlaylist, action: "play"}
            this.props.playMusic(filterData)
            this.props.playCount(data.id)
        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.likesListResponse.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderTracksList() {
        if (this.state.likes) {
            if (this.state.likes.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">Like Music!</h3>
                    </div>
                );
            }
            return this.state.likes.map(result => {
                return (<div key={result.id} className="custom-track-list-bg p-3 mt-3">
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
                </div>)
            })
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="p-3">
                     <div className="col-md-12">
                         {this.renderTracksList()}
                     </div>
                </div>
                <div className="mt-3">
                    {this.renderLoadMore()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        likesResponse: state.likesList.likesListResponse,
        randomMusicResponse:state.fetchRandomMusic.musicRandomFetchData
    }
}
export default connect(mapStateToProps, {fetchCurrentUserLikes, playMusic: playMusic,playCount,fetchRandomMusic})(CurrentUserLikes);