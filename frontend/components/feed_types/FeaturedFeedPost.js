import React, {Component} from 'react';
import Link from "next/link";

class FeaturedFeedPost extends Component {
    render() {
        const playSong = (data) => {
            const filterData = {data: data, action: "play"}
            this.props.playMusic(filterData)
            this.props.playCount(data.id)
        }
        return (
            <div className="container-fluid custom-blogs-item-bg">
                <div>
                    <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-2 col-sm-6">
                            <img src={this.props.data.target.photo_main} height="130" width="130"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track">
                                    <Link href={`/u-details/${this.props.data.user.profile.username_slug}`}>{this.props.data.user.profile.username}</Link>
                                    <i className="ml-3 mr-3">posted <i className="fas fa-music text-accent"/></i>
                                    <Link
                                        href={`/m-details/${this.props.data.target.username_slug}/${this.props.data.target.slug}`}>{this.props.data.target.song_title.slice(0, 20)}</Link>
                                    <div className="ml-3 my-auto custom-trending-item-plays-count">
                                        {this.props.data.target.total_likes} likes
                                    </div>
                                </div>
                                <div className="d-flex flex-row mt-2 custom-trending-item-title">
                                    Title: {this.props.data.target.song_title}
                                </div>
                                <div className="d-flex flex-row mt-3 custom-trending-item-description">
                                    {this.props.data.target.description}
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="text-center mt-2" onClick={() =>playSong(this.props.data.target)}>
                                <div className="btn btn-outline-primary">▶ Play</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeaturedFeedPost;