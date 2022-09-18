import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {postBlog} from "../actions";
import {store} from "react-notifications-component";
import {NextSeo} from "next-seo";
class PostBlog extends Component {
    state = {blogTitle:"",youtubeLink:"",blogBody:"",imageFile:null}
    onChange = (e) => {
        switch (e.target.name) {
            case "photo_main":
                if (e.target.files.length > 0) {
                    this.setState({ imageFile: e.target.files[0]})
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            this.setState({displayCover: reader.result})
                        }
                    }
                    reader.readAsDataURL(e.target.files[0])
                }
                break;
            default:
                const isCheckbox = e.target.type === "checkbox";
                this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value});
        }
    }
    notify = ()=>{
        store.addNotification({
            title:"Success!",
            message:"Your Blog is posted on DIGITVL!",
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
    render() {
        const onSubmit = (e) => {
            e.preventDefault();
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            this.setState({errors: {}, disableUpload: true})
            const formData = new FormData();
            formData.append("blog_title", this.state.blogTitle);
            formData.append("blog_body", this.state.blogBody);
            formData.append("embedded_video_url", this.state.youtubeLink);
            if (this.state.imageFile){
                formData.append("blog_image", this.state.imageFile);
            }
            this.props.postBlog(userSession,formData).then(()=>{
                if (this.props.postBlogResponse.status){
                    this.notify()
                }else{
                    alert(this.props.postBlogResponse.message)
                }
            }).catch(err=>{

            })
        }
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Post Blog Admin"
                    description="Post Blogs on the platform"
                    openGraph={{
                        url: 'https://www.digitvl.com/',
                        title: 'Post Blog Admin',
                        description: 'Post Blogs on the platform',
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
                <div className="container-fluid">
                    <form onSubmit={onSubmit} className="form-box pt-3 pt-sm-3">
                        <div className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                            <div className="text-center custom-login-heading pt-5 text-white">Post Blog</div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75 custom-tweet-inputtext" name="blogTitle" type="text"
                                       placeholder="Blog Title"
                                       onChange={handleChange}
                                       tabIndex="1"/>
                            </div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75 custom-tweet-inputtext" name="youtubeLink"  type="text"
                                       placeholder="Youtube Embedded video link"
                                       onChange={handleChange}
                                       tabIndex="2"/>
                            </div>
                            <div className="form-input mt-3 w-75 text-center justify-content-center align-content-center align-items-center mx-auto">
                                <textarea name="blogBody" onChange={handleChange} placeholder="Blog Body" className="form-control resize-disable h-100 custom-tweet-inputtext" tabIndex="3" required/>
                            </div>
                            <div className="form-input input-group mb-3 mt-3 w-75 text-center justify-content-center align-content-center align-items-center mx-auto">
                                <label className="custom-file-label"
                                       htmlFor="image-upload">
                                    {/*{this.state.imageFileName ? this.state.imageFileName : "Choose Blog Cover Image"}*/}
                                    Choose Blog Cover Image
                                </label>
                                <input type="file"  name="photo_main"
                                       onChange={(e) => this.onChange(e)}
                                       accept="image/*"  multiple={false}
                                       className="custom-file-input" tabIndex="4" id="image-upload"/>
                            </div>
                            <div className="w-50 mt-3 mx-auto">
                                <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">
                                    Post Blog
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
        postBlogResponse:state.postBlog.postBlogData
    }
}
export default connect(mapStateToProps,{postBlog})(PostBlog);