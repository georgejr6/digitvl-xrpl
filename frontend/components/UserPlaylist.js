import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUserPlaylist} from "../actions";
import Link from "next/link";
import Image from "next/image";
class UserPlaylist extends Component {
    state = {playlist: {}, playlistList: [], page: 1}

    componentDidMount() {
        this.props.fetchUserPlaylist(this.props.username, this.state.page).then(() => {
            this.setState({
                playlist: this.props.userPlaylistResponse,
                playlistList: this.props.userPlaylistResponse.results
            })
        })
    }

    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchUserPlaylists(newPage)
    }
    fetchUserPlaylists = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchUserPlaylist(userSession, pageNo).then(() => {
            this.setState({
                playlist: this.props.userPlaylistResponse,
                playlistList: [...this.state.playlistList, ...this.props.userPlaylistResponse.results]
            })
        }, ({data}) => {
        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.playlist.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }

    renderPlayLists() {
        if (this.state.playlistList) {
            if (this.state.playlistList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Playlists To Show</h3>
                    </div>
                );
            }
            return this.state.playlistList.map(result => {
                return (
                    <div className="custom-track-list-bg p-3 mt-3">
                        <div className="row">
                            <div className="col-md-2">
                                <Image src="/images/playlist_music_icon.svg" width={60} height={60} className="my-auto"/>
                            </div>
                            <div className="d-flex flex-column col-md-6 my-auto">
                                <span className="custom-user-tracklist-track-title"><Link href={`/ou-playlist/${this.props.username}/beats/${result.slug}`}>{result.name}</Link></span>
                                <span className="custom-user-tracklist-track-plays">{result.beats_count} Beats</span>
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
                        {this.renderPlayLists()}
                    </div>
                    <div className="mt-3">
                        {this.renderLoadMore()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        userPlaylistResponse:state.userPlaylist.userPlaylistResponse
    }
}
export default connect(mapStateToProps,{fetchUserPlaylist})(UserPlaylist);