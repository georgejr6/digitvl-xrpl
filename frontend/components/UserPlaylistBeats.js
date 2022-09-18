import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUserPlaylistBeats, deleteCurrentUserPlaylistSong, playMusic, playCount} from "../actions";
import Navbar from "./Navbar";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link";

class UserPlaylistBeats extends Component {
    state = {playlistTracks: {}, musicPlayerPlaylist: []}

    componentDidMount() {
        this.props.fetchUserPlaylistBeats(this.props.dataparams.username, this.props.dataparams.slug).then(() => {
            this.setState({
                playlistTracks: this.props.userPlaylistResponse.playlist[0],
                musicPlayerPlaylist: this.props.userPlaylistResponse.playlist[0].beats
            })
        })
    }

    playSong(data) {
        const filterPlaylist = this.state.musicPlayerPlaylist.filter(q => !!q).map(item => {
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
        this.props.playCount(data.id)
    }

    renderTracksList() {
        if (this.state.playlistTracks.beats) {
            if (this.state.playlistTracks.beats.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center mt-5">Add Songs in Playlist</h3>
                    </div>
                );
            }
            return this.state.playlistTracks.beats.map(result => {
                return (<div key={result.id} className="custom-track-list-bg p-3 mt-3">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={result.photo_main} alt="" className="rounded" width="160px" height="160px"/>
                        </div>
                        <div className="d-flex flex-column col-md-6 my-auto">
                            {/*<div className="my-auto">*/}
                            <span className="custom-user-tracklist-track-title"><Link
                                href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title}</Link></span>
                            <span className="custom-user-tracklist-track-plays">{result.total_likes} likes</span>
                            {/*</div>*/}
                        </div>
                        <div className="col-md-3 my-auto">
                            <div className="d-flex flex-row">
                                <div className="mr-5 my-auto" onClick={() => {
                                    this.removeDialog(result)
                                }}>
                                    {/*<Link to={`/profile/track/${result.song_title}/${result.id}/delete`}>*/}
                                    <i className="fas fa-minus-circle text-accent"/>
                                    {/*</Link>*/}
                                </div>
                                <div onClick={() => this.playSong(result)} className="btn btn-outline-primary">▶ Play
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            })
        }
    }

    removeDialog = (data) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        const options = {
            title: 'Remove Track',
            message: `Are you sure you want to remove ${data.song_title} track from this playlist?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.deleteCurrentUserPlaylistSong(userSession, this.props.dataparams.slug, data.id).then(() => {
                            this.props.fetchUserPlaylistBeats(this.props.dataparams.username, this.props.dataparams.slug).then(() => {
                                this.setState({
                                    playlistTracks: this.props.userPlaylistResponse.playlist[0],
                                    musicPlayerPlaylist: this.props.userPlaylistResponse.playlist[0].beats
                                })
                            })
                        }).catch(err => {
                            alert(err)
                        })
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
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
    }

    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="custom-trending-heading">
                    {this.state.playlistTracks.name}
                </div>
                <div className="container">
                    {this.renderTracksList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPlaylistResponse: state.userPlaylist.userPlaylistBeatsResponse
    }
}
export default connect(mapStateToProps, {
    fetchUserPlaylistBeats,
    playMusic,
    playCount,
    deleteCurrentUserPlaylistSong
})(UserPlaylistBeats);