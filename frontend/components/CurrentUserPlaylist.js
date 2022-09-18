import React, {Component} from 'react';
import {confirmAlert} from "react-confirm-alert";
import {connect} from "react-redux";
import {fetchCurrentUserPlaylist,deleteCurrentUserPlaylist} from "../actions";
import Link from "next/link"
import Image from "next/image";
let userSession
class CurrentUserPlaylist extends Component {
    state = {playList: {},playlistList:[],hover:"",username:"", page: 1}
    componentDidMount() {
        if (this.props.hover){
            this.setState({hover:this.props.hover})
        }
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession.user){
            this.setState({username:userSession.user.username_slug})
        }
        if (userSession.profile){
            this.setState({username:userSession.profile.username_slug})
        }
        this.props.fetchCurrentUserPlaylist(userSession, this.state.page).then(()=>{
            this.setState({playList:this.props.playlists[0],playlistList:this.props.playlists[0].results})
        })
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchCurrentUserPlaylists(newPage)
    }
    fetchCurrentUserPlaylists = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchCurrentUserPlaylist(userSession, pageNo).then(() => {
            this.setState({
                playList:this.props.playlists[0],
                playlistList: [...this.state.playlistList, ...this.props.playlists[0].results]
            })
        }, ({data}) => {
        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.playList.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    deleteDialog = (data) =>{
        const options = {
            title: 'Delete Playlist',
            message: `Are you sure you want to delete ${data.name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.deleteCurrentUserPlaylist(userSession,data.slug).then(()=>{
                            this.props.fetchCurrentUserPlaylist(userSession, 1).then(()=>{
                                this.setState({playList:this.props.playlists[0],playlistList:this.props.playlists[0].results})
                            })
                        }).catch(err =>{
                            alert(err)
                        })
                    }
                },
                {
                    label: 'Cancel',
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
    renderPlayLists(){
        if (this.state.playlistList){
            if (this.state.playlistList.length === 0){
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">Add Playlists From Profile</h3>
                    </div>
                );
            }
            return this.state.playlistList.map(result =>{
                return (<div className="custom-track-list-bg p-3 mt-3" onClick={()=>this.onPlayListClicked(result.slug,result.name)}>
                    <div className="row">
                        <div className="col-md-2">
                            {result.cover_pic ?<img className="rounded align-items-center"
                                                    src={result.cover_pic}
                                                    width="60" height="60"/>:<Image src="/images/playlist_music_icon.svg" width={60} height={60} className="my-auto"/>}
                        </div>
                        <div className="d-flex flex-column col-md-6 col-lg-6 my-auto">
                            <span className="custom-user-tracklist-track-title"><Link href={`/playlist/${this.state.username}/beats/${result.slug}` }>{result.name}</Link></span>
                            <span className="custom-user-tracklist-track-plays">{result.beats_count} Beats</span>
                        </div>
                        <div className="col-md-4 justify-content-end my-auto">
                            <div className="mr-2 text-center" onClick={() => this.deleteDialog(result)}>
                                {/*<Link to={`/profile/track/${result.song_title}/${result.id}/delete`}>*/}
                                <i className="fas fa-trash-alt text-accent"/>
                                {/*</Link>*/}
                            </div>
                        </div>
                    </div>
                </div>)
            })
        }
    }
    onPlayListClicked = (id,name) =>{
        if (this.props.addToPlayList){
            this.props.addToPlayList(id,name)
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
        playlists:Object.values(state.fetchCurrentPlaylists),
        deletePlaylistResponse:state.deletePlaylist.deleteUserPlaylistData
    }
}
export default connect(mapStateToProps,{fetchCurrentUserPlaylist:fetchCurrentUserPlaylist,deleteCurrentUserPlaylist})(CurrentUserPlaylist);