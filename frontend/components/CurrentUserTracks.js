import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchCurrentUserMusic,redeemCoinFeatureSongApi, playMusic,playCount,deleteUserMusic,getCurrentUserDigitvlCoins} from "../actions";
import Link from "next/link";
import {confirmAlert} from "react-confirm-alert";
import {store} from "react-notifications-component";
class CurrentUserTracks extends Component {
    state = {tracks: {},tracksList:[], page: 1}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchCurrentUserMusic(userSession,this.state.page).then(() => {
            this.setState({tracks: this.props.currentUserMusicList,tracksList:this.props.currentUserMusicList.results})
        }, ({data}) => {

        });
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchTracksList(newPage)
    }
    fetchTracksList = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchCurrentUserMusic(userSession, pageNo).then(() => {
            this.setState({
                tracks: this.props.currentUserMusicList,
                tracksList: [...this.state.tracksList, ...this.props.currentUserMusicList.results]
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
        this.props.playCount(data.id)
    }
    notify = ()=>{
        store.addNotification({
            title:"Success!",
            message:"Your Song is featured on DIGITVL!",
            type:"success",
            container:"top-right",
            insert:"top",
            animationIn:["animated","fadeIn"],
            animationOut:["animated","fadeOut"],
            dismiss:{
                duration:2000
            }
        })
    }
    featureSong = (data) =>{
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        const options = {
            title: 'Feature Song!',
            message: `Do you want to feature ${data.song_title} on DIGITVL?`,
            buttons: [
                {
                    label: 'Yes!',
                    onClick: () => {
                        const formData = new FormData();
                        formData.append("coins", 100);
                        this.props.redeemCoinFeatureSongApi(data.id,formData,userSession).then(()=>{
                            if (this.props.redeemCoinFeatureSongResponse.status){
                                this.notify()
                                this.props.getCurrentUserDigitvlCoins(userSession).then(()=>{

                                })
                            }else{
                                alert(this.props.redeemCoinFeatureSongResponse.message + "You need 100 DIGITVL coins to make song featured")
                            }
                        }).catch(err=>{
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
    renderTracksList() {
        if (this.state.tracksList) {
            if (this.state.tracksList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h5 className="text-center">Upload Music!</h5>
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
                            <div className="d-flex flex-column col-md-3 my-auto">
                                {/*<div className="my-auto">*/}
                                <span className="custom-user-tracklist-track-title"><Link href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title}</Link></span>
                                <span className="custom-user-tracklist-track-plays">{result.total_likes} likes</span>
                                {/*</div>*/}
                            </div>
                            <div className="col-md-6 my-auto">
                                <div className="d-flex flex-row justify-content-end">
                                    <div className="mr-2 my-auto" onClick={() => this.featureSong(result)}>
                                        <i className="fab fa-adn text-color-accent"/>
                                    </div>
                                    <div className="mr-2 my-auto"><Link href={`/profile/track/${result.id}/edit`}><i className="far fa-edit text-color-accent"/></Link>
                                    </div>
                                    <div className="mr-2 my-auto"><Link href={`/profile/track/delete/${result.slug}/${result.id}`}><i className="fas fa-trash-alt text-color-accent"/></Link>
                                    </div>
                                    <div onClick={()=>this.playSong(result)} className="btn btn-outline-primary my-auto">▶ Play</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
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
        currentUserMusicList: state.fetchCurrentMusic.currentMusicFetchData,
        deleteuserMusicResponse:state.deleteUserTrack.deleteUserTrackData,
        redeemCoinFeatureSongResponse:state.redeemCoinFeatureSong.redeemCoinFeatureSongData
    }
}
export default connect(mapStateToProps, {
    fetchCurrentUserMusic: fetchCurrentUserMusic,
    playMusic: playMusic,
    playCount,
    deleteUserMusic,
    redeemCoinFeatureSongApi,
    getCurrentUserDigitvlCoins
})(CurrentUserTracks);