import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSearchList, playMusic, playCount, fetchRandomMusic} from "../actions";
import Navbar from "./Navbar";
import Link from "next/link"
import {NextSeo} from "next-seo";

class SearchList extends Component {
    state = {searchList: {}}

    componentDidMount() {
        this.props.getSearchList(this.props.dataparams.term).then(() => {
            this.setState({searchList: this.props.searchResponse})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataparams.term !== prevProps.dataparams.term) {
            this.props.getSearchList(this.props.dataparams.term).then(() => {
                this.setState({searchList: this.props.searchResponse})
            })
        }
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
            this.props.playCount(data.id)
        })
    }

    renderSearchList = () => {
        if (this.state.searchList.results) {
            if (this.state.searchList.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.searchList.results.map(result => {
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
                                        href={`/m-details/${result.username_user}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
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
                )
            })
        }
    }

    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Search"
                    description="Search different artists and music for streaming"
                    openGraph={{
                        url: 'https://www.digitvl.com/',
                        title: 'Search',
                        description: 'Search different artists and music for streaming',
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
                    <div className="container mx-auto row">
                        <div className="custom-trending-heading col-md-12 col-sm-12 col-lg-12">
                            Search:{this.props.dataparams.term}
                        </div>
                    </div>
                    <div className="container mt-5 mx-auto row">
                        {this.renderSearchList()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchResponse: state.searchList.searchResponse,
        randomMusicResponse: state.fetchRandomMusic.musicRandomFetchData
    }
}
export default connect(mapStateToProps, {getSearchList, playMusic, fetchRandomMusic, playCount})(SearchList);