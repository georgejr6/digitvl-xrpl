import React, {Component} from 'react';
import Navbar from "./Navbar";
import Link from "next/link"
import Image from "next/image";
import {fetchExclusiveContent,fetchRandomMusic,playMusic,playCount} from "../actions"
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";
import Router from "next/router";
import {NextSeo} from "next-seo";
let userSessionG
class ExclusiveList extends Component {
    state = {exclusiveReleases: {}, exclusiveList: [], exclusivePage: 1,errorMessage:"Exclusive Music!"}

    componentDidMount() {
        userSessionG = localStorage.getItem("userSession")
        userSessionG = JSON.parse(userSessionG)
        if (userSessionG) {
            this.props.fetchExclusiveContent(userSessionG, this.state.exclusivePage).then(() => {
                this.setState({
                    exclusiveReleases: this.props.exclusiveSongsResponse,
                    exclusiveList: this.props.exclusiveSongsResponse.results
                })
            }).catch(err => {
                this.setState({errorMessage:"Subscribe to see Exclusive Content!"})
            })
        }else{
            this.setState({errorMessage:"Login to checkout exclusive content!"})
        }
    }

    onLoadMore = () => {
        const newPage = this.state.exclusivePage + 1
        this.setState({exclusivePage: newPage})
        this.fetchExclusiveList(newPage)
    }
    fetchExclusiveList = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            this.props.fetchExclusiveContent(userSession, pageNo).then(() => {
                this.setState({
                    exclusiveReleases: this.props.exclusiveSongsResponse,
                    exclusiveList: [...this.state.exclusiveList, ...this.props.exclusiveSongsResponse.results]
                })
            }, ({data}) => {

            })
        }
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
                    {this.state.exclusiveReleases.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderExclusiveList() {
        if (this.state.exclusiveList) {
            if (this.state.exclusiveList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center text-color-white mt-5">{this.state.errorMessage}</h3>
                        {userSessionG ?<h5 className="text-center text-accent pointer-cursor" onClick={() => {Router.push("/subscriptions")}}>Go to Subscriptions</h5>:null}
                    </div>
                );
            }
            return this.state.exclusiveList.map(result => {
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
            <div className="custom-trending-page">
                <NextSeo
                    title="Exclusive"
                    description="Explore Hub for independent creators and their unique music art"
                    openGraph={{
                        url: 'https://www.digitvl.com/home',
                        title: 'Home',
                        description: 'Explore Hub for independent creators and their unique music art',
                        site_name: 'DIGITVL',
                        type: 'website'
                    }}
                    additionalMetaTags={[
                        {
                            property: "twitter:image",
                            content: 'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property: "twitter:image:src",
                            content: 'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property: "og:image",
                            content: 'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property: "og:image:width",
                            content: 800
                        },
                        {
                            property: "og:image:height",
                            content: 500
                        }
                    ]}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                        image: 'https://www.digitvl.com/images/landing_bg_img.png'
                    }}
                />
                <Navbar/>
                <div className="container-fluid">
                    <div className="p-3">
                        <div className="col-md-12">
                            {this.renderExclusiveList()}
                        </div>
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
        exclusiveSongsResponse: state.fetchExclusiveSongs.exclusiveSongsDataResponse,
        randomMusicResponse: state.fetchRandomMusic.musicRandomFetchData
    }
}
export default connect(mapStateToProps, {fetchExclusiveContent,fetchRandomMusic,playMusic,playCount})(ExclusiveList);