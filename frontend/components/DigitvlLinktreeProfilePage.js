import React, {Component} from 'react';
import Navbar from "./Navbar";
import {store} from "react-notifications-component";
import {getDTreePublicProfileLinks} from "../actions";
import {connect} from "react-redux";
import Link from "next/link";
import {NextSeo} from "next-seo";
class DigitvlLinktreeProfilePage extends Component {
    state = {userData:[],userLinksArray:[],userProfileImage:"",userProfileName:"",usernameSlug:""}
    componentDidMount() {
        this.props.getDTreePublicProfileLinks(this.props.dataparams.username_slug).then(() =>{
            this.setState({userData:this.props.getDlinksTreePublicResponse,userLinksArray:this.props.getDlinksTreePublicResponse.link_tree_data, userProfileImage:this.props.getDlinksTreePublicResponse.link_tree_data[0].artist.profile.avatar,userProfileName:this.props.getDlinksTreePublicResponse.link_tree_data[0].artist.profile.username,usernameSlug:this.props.getDlinksTreePublicResponse.link_tree_data[0].artist.profile.username_slug
        })
            // console.log(this.state.userLinksArray)
        }).catch(err =>{

        })
    }
    renderUserLinks = () =>{
        const openInNewTab = (url) => {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
        if (this.state.userData.link_tree_data) {
            if (this.state.userData.link_tree_data.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Links To Show</h3>
                    </div>
                );
            }
            return this.state.userData.link_tree_data.reverse().map(result => {
                return (
                    <div className="col-md-12 col-lg-12 col-sm-12 mt-3">
                        <div className="align-items-center align-content-center justify-content-center text-center">
                            <div className="btn btn-outline-primary w-75 custom-btn-height" onClick={() => openInNewTab(result.url)}>
                                {result.title}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    render() {

        return (
            <div className="container-fluid custom-user-detail-page">
                <NextSeo
                    title={this.state.userProfileName}
                    description="Checkout my public links"
                    openGraph={{
                        url: `https://www.digitvl.com/${this.state.usernameSlug}`,
                        title: 'Public profile',
                        description: 'Explore Hub for independent creators and their unique music art',
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
                <div className="row custom-row-margin mt-5">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="align-items-center align-content-center justify-content-center text-center">
                            <img src={this.state.userProfileImage} className="rounded-circle" width="150" height="150"/>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="text-center">
                            <div className="text-color-white">{this.state.userProfileName}</div>
                            {/*<div className="text-color-white">Description</div>*/}
                        </div>
                    </div>
                    {this.renderUserLinks()}
                    {/*<div className="col-md-12 col-lg-12 col-sm-12 mt-3">*/}
                    {/*    <div className="align-items-center align-content-center justify-content-center text-center">*/}
                    {/*        <div className="btn btn-outline-primary w-50">*/}
                    {/*            First link*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-12 col-lg-12 col-sm-12 mt-3">*/}
                    {/*    <div className="align-items-center align-content-center justify-content-center text-center">*/}
                    {/*        <div className="btn btn-outline-primary w-50">*/}
                    {/*            Second link*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-12 col-lg-12 col-sm-12 mt-3">*/}
                    {/*    <div className="align-items-center align-content-center justify-content-center text-center">*/}
                    {/*        <div className="btn btn-outline-primary w-50">*/}
                    {/*            Third link*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        getDlinksTreePublicResponse: state.publicUserDlinks.getUserDLinksTreeResponse
    }
}
export default connect(mapStateToProps, {getDTreePublicProfileLinks})(DigitvlLinktreeProfilePage);