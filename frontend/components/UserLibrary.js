import React, {Component} from 'react';
import Navbar from "./Navbar";
import CurrentUserPlaylist from "./CurrentUserPlaylist";
import CurrentUserLikes from "./CurrentUserLikes";
import {NextSeo} from "next-seo";
class UserLibrary extends Component {
    state = {tab:0}
    updateState(tabNew){
        this.setState({tab:tabNew})
    }
    renderContainer(){
        if(this.state.tab === 0){
            return (<CurrentUserLikes/>
                // <CurrentUserLikes />
            );
        }else if(this.state.tab === 1){
            return (<CurrentUserPlaylist/>
                // <CurrentUserPlayList />
            );
        }else{
            return ("Loading...");
        }
    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Library"
                    description="Checkout your likes and playlist"
                    openGraph={{
                        url: 'https://www.digitvl.com/',
                        title: 'Library',
                        description: 'Checkout your likes and playlist',
                        site_name: 'DIGITVL',
                        type:'website'
                    }}
                    additionalMetaTags={[
                        {
                            property:"twitter:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"twitter:image:src",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image:width",
                            content:800
                        },
                        {
                            property:"og:image:height",
                            content:500
                        }
                    ]}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                        image:'https://www.digitvl.com/images/landing_bg_img.png'
                    }}
                />
                <Navbar/>
                <div className="container mt-4">
                    <div className="row custom-row-margin">
                        <div className="col-md-12 nav-pills-bg-custom">
                            <ul className="nav nav-pills">
                                <li className="btn nav-item active">
                                    <div onClick={(e) =>this.updateState(0)} className="nav-link active" data-toggle="tab">Likes</div>
                                </li>
                                <li className="btn nav-item">
                                    <div onClick={(e) =>this.updateState(1)} className="nav-link" data-toggle="tab">Playlist</div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            {this.renderContainer()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLibrary;