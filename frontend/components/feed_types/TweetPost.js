import React, {Component} from 'react';
import Link from "next/link";
import {connect} from "react-redux";
class TweetPost extends Component {
    render() {
        return (
            <div className="container-fluid custom-blogs-item-bg">
                <div>
                    <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-1 col-lg-1 col-sm-6">
                            <img src={this.props.data.user.profile.avatar?this.props.data.user.profile.avatar:"http://nicesnippets.com/demo/1499344631_malecostume.png"} height="80" width="80"
                                 className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-10 col-lg-11 col-sm-12 col-xs-12 mt-2 my-auto">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track">
                                    <Link href={`/u-details/${this.props.data.user.profile.username_slug}`}>{this.props.data.user.profile.username}</Link>
                                    <i className="ml-3 mr-3">tweeted</i>
                                    <div>"{this.props.data.target.tweet}"</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null,{})(TweetPost);