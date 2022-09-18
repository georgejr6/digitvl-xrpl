import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchTrendingTracksList, playMusic,sendMusicIdToPlayer, playCount, fetchRandomMusic} from "../actions";
import Link from "next/link";
import Router from "next/router";
import Navbar from "./Navbar";
import Image from "next/image";
import {NextSeo} from "next-seo";
import AnnouncementBar from "./AnnouncementBar";

class Trending extends Component {
    state = {trendingListResponse: {}, trendingList: [], page: 1,
        musicId:null,
        playerDurationCounter:0,
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
        this.props.fetchTrendingTracksList(this.state.page).then(() => {
            this.setState({
                trendingListResponse: this.props.trendingListResponse,
                trendingList: this.props.trendingListResponse.beats_detail
            })
        })
    }

    playSong(data) {
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
    }

    renderTrendingList = () => {
        if (this.state.trendingList) {
            if (this.state.trendingList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center text-color-white">No tracks trending!</h3>
                    </div>
                );
            }
            return this.state.trendingList.map(result => {
                return (
                    <div className="row col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-2 col-sm-6">
                            <img src={result.photo_main} height="130" width="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track">
                                    <Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>
                                    <i className="ml-3 mr-3">•</i>
                                    <Link
                                        href={`/m-details/${result.username_slug}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
                                    <div className="ml-3 my-auto custom-trending-item-plays-count">
                                        ▶ {result.plays_count} plays
                                    </div>
                                </div>
                                <div className="d-flex flex-row mt-2 custom-trending-item-title">
                                    Title: {result.song_title}
                                </div>
                                <div className="d-flex flex-row mt-3 custom-trending-item-description">
                                    {result.description}
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="text-center mt-2" onClick={() => this.playSong(result)}>
                                <div className="btn btn-outline-primary">▶ Play</div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    }

    render() {
        return (
            <div className="container-fluid custom-trending-page">
                <NextSeo
                    title="Trending"
                    description="Listen to top hot songs on platform right now!!!"
                    openGraph={{
                        url: 'https://www.digitvl.com/trending',
                        title: 'Trending',
                        description: 'Listen to top hot songs on platform right now!!!',
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
                <div className="container mx-auto row">
                    <div className="custom-trending-heading col-md-12 col-sm-12 col-lg-12">
                        Trending
                    </div>
                </div>
                <div className="container mt-3 mx-auto row">
                    {this.renderTrendingList()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trendingListResponse: state.fetchTrending.trendingTracksData,
        playerDurationResponse: state.playerDuration.musicPlayerDuration,
        randomMusicResponse: state.fetchRandomMusic.musicRandomFetchData
    }
}

export default connect(mapStateToProps, {fetchTrendingTracksList,sendMusicIdToPlayer, playCount, playMusic, fetchRandomMusic})(Trending);