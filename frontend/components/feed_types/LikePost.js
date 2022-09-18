import React, {Component} from 'react';
import Link from "next/link";
import {connect} from "react-redux";
import {playMusic,playCount} from "../../actions";
class LikePost extends Component {
    playSong(data) {
        const filterData = {data: data, action: "play"}
        this.props.playMusic(filterData)
        this.props.playCount(data.id)
    }
    render() {
        return (
            <div className="container-fluid custom-blogs-item-bg">
                <div>
                    <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-1 col-sm-6 col-lg-1">
                            <img src={this.props.data.user.profile.avatar?this.props.data.user.profile.avatar:"http://nicesnippets.com/demo/1499344631_malecostume.png"} height="80" width="80"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-lg-7 col-sm-12 col-xs-12 mt-2 my-auto">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track">
                                    <Link href={`/u-details/${this.props.data.user.profile.username_slug}`}>{this.props.data.user.profile.username}</Link>
                                    <i className="ml-3 mr-3">liked <i className="fas fa-heart text-accent"/></i>
                                    <Link
                                        href={`/m-details/${this.props.data.target.username_slug}/${this.props.data.target.slug}`}>{this.props.data.target.song_title.slice(0, 20)}</Link>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-lg-4 col-sm-6 my-auto">
                            <div className="text-center mt-2" onClick={() =>this.playSong(this.props.data.target)}>
                                <div className="btn btn-outline-primary">▶ Play</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null,{playMusic,playCount})(LikePost);