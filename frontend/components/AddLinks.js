import React, {Component} from 'react';
import {connect} from "react-redux"
import {editUserProfile} from "../actions";
import Navbar from "./Navbar";
import Router from "next/router";
const initialState = {
    websiteUrl:"", instagramUrl:"", facebookUrl:"", twitterUrl:"",youtubeUrl:"",errors: {}
};
let userSession
class AddLinks extends Component {
    state = initialState
    componentDidMount() {
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession.user) {
            this.setState({websiteUrl: userSession.user.profile.website_link, instagramUrl: userSession.user.profile.instagram_link, facebookUrl:userSession.user.profile.facebook_link, twitterUrl:userSession.user.profile.twitter_link,youtubeUrl:userSession.user.profile.youtube_link})
        }
        if (userSession.profile) {
            this.setState({websiteUrl: userSession.profile.website_link, instagramUrl: userSession.profile.instagram_link, facebookUrl:userSession.profile.facebook_link, twitterUrl:userSession.profile.twitter_link,youtubeUrl:userSession.profile.youtube_link})
        }
    }

    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const onSubmit = (e) => {
            e.preventDefault()
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            this.setState({errors: {}});
            const formData = new FormData();
            if (this.state.websiteUrl) {
                formData.append("website_link", this.state.websiteUrl)
            }
            if (this.state.facebookUrl) {
                formData.append("facebook_link", this.state.facebookUrl)
            }
            if (this.state.instagramUrl) {
                formData.append("instagram_link", this.state.instagramUrl)
            }
            if (this.state.twitterUrl) {
                formData.append("twitter_link", this.state.twitterUrl)
            }
            if (this.state.youtubeUrl) {
                formData.append("youtube_link", this.state.youtubeUrl)
            }
            this.props.editUserProfile(formData,userSession).then(() => {
                if (this.props.userProfileEditResponse.status) {
                    let userSession = localStorage.getItem("userSession")
                    let user = JSON.parse(userSession)
                    if (user.user) {
                        user.user.profile = this.props.userProfileEditResponse.result.user.profile
                        user.user.profile.website_link = this.props.userProfileEditResponse.result.user.profile.website_link
                        user.user.profile.instagram_link = this.props.userProfileEditResponse.result.user.profile.instagram_link
                        user.user.profile.twitter_link = this.props.userProfileEditResponse.result.user.profile.twitter_link
                        user.user.profile.facebook_link = this.props.userProfileEditResponse.result.user.profile.facebook_link
                        user.user.profile.youtube_link = this.props.userProfileEditResponse.result.user.profile.youtube_link
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    if (user.profile) {
                        user.profile = this.props.userProfileEditResponse.result.user.profile
                        user.profile.website_link = this.props.userProfileEditResponse.result.user.profile.website_link
                        user.profile.instagram_link = this.props.userProfileEditResponse.result.user.profile.instagram_link
                        user.profile.twitter_link = this.props.userProfileEditResponse.result.user.profile.twitter_link
                        user.profile.facebook_link = this.props.userProfileEditResponse.result.user.profile.facebook_link
                        user.profile.youtube_link = this.props.userProfileEditResponse.result.user.profile.youtube_link
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    // notify();
                    Router.push("/profile");
                }else if(this.props.userProfileEditResponse){
                    this.setState({errors: this.props.userProfileEditResponse.message})
                }

            }, ({data}) => {

            });

        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <form onSubmit={onSubmit} className="form-box pt-3 pt-sm-3">
                        <div className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                            <div className="text-center custom-login-heading pt-5">Add/Change Links</div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="websiteUrl" value={this.state.websiteUrl} type="text"
                                       onChange={handleChange}
                                       placeholder="Enter Website Url (e.g: https://yoursitename.com) Link should have https/http"
                                       tabIndex="1"/>
                            </div>
                            {this.state.errors.website_link ?(<div className="alert alert-danger" role="alert">
                                {this.state.errors.website_link}
                            </div>):null}
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="twitterUrl" onChange={handleChange} value={this.state.twitterUrl}
                                       type="text"
                                       placeholder="Twitter Link (e.g: https://twitterlink.com) Link should have https/http" tabIndex="2"/>
                            </div>
                            {this.state.errors.twitter_link ?(<div className="alert alert-danger" role="alert">
                                {this.state.errors.twitter_link}
                            </div>):null}
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="facebookUrl" onChange={handleChange} value={this.state.facebookUrl}
                                       type="text"
                                       placeholder="Facebook Link (e.g: https://facebooklink.com) Link should have https/http" tabIndex="3"/>
                            </div>
                            {this.state.errors.facebook_link ?(<div className="alert alert-danger" role="alert">
                                {this.state.errors.facebook_link}
                            </div>):null}
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="instagramUrl" onChange={handleChange} value={this.state.instagramUrl}
                                       type="text"
                                       placeholder="Instagram Link (e.g: https://instagramlink.com) Link should have https/http" tabIndex="4"/>
                            </div>
                            {this.state.errors.instagram_link ?(<div className="alert alert-danger" role="alert">
                                {this.state.errors.instagram_link}
                            </div>):null}
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="youtubeUrl" onChange={handleChange} value={this.state.youtubeUrl}
                                       type="text"
                                       placeholder="Youtube Link (e.g: https://youtubelink.com) Link should have https/http" tabIndex="5"/>
                            </div>
                            {this.state.errors.youtube_link ?(<div className="alert alert-danger" role="alert">
                                {this.state.errors.youtube_link}
                            </div>):null}
                            <div className="w-50 mt-3 mx-auto">
                                <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">
                                    ADD
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userProfileEditResponse: state.editProfile.editResponseData
    }
}
export default connect(mapStateToProps, {editUserProfile: editUserProfile})(AddLinks);