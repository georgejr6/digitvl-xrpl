import React, {Component} from 'react';
import Navbar from "./Navbar";
import ReactTagInput from "@pathofdev/react-tag-input";
import {uploadMusic,addCoins} from "../actions";
import {connect} from "react-redux";
import {store} from 'react-notifications-component';
import * as ReactBootstrap from "react-bootstrap";
import {
    ChasingDots,
    Circle,
    CubeGrid,
    DoubleBounce,
    FadingCircle,
    FoldingCube,
    Pulse,
    RotatingPlane,
    ThreeBounce,
    WanderingCubes,
    Wave
} from 'better-react-spinkit'
import Router from "next/router";
import {NextSeo} from "next-seo";
// import Spinner from "react-spinkit";

// import dynamic from "next/dynamic";
// const Spinner = dynamic(import ("react-spinkit"),{ssr:false});
let userSession
class UploadMusic extends Component {
    state = {
        songTitle: "",
        genre: "",
        description: "",
        musicFileName: "",
        disableUpload:false,
        imageFileName: "",
        storeLink: "",
        price: 0,
        displayCover: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        musicFile: null,
        imageFile: null,
        tags: [],
        uploadPercentage: 0,
        errors: {},
        fileSizeError: "",
        imageFileSizeError: "",
        loader: false,
        limitRemaining:0,
        totalLimit:0,
        content_type:"1",
        membershipPlan:{}
    }

    componentDidMount() {
        // console.log(userSession)
        if (userSession.user){
            this.setState({membershipPlan:userSession.user.membership_plan,limitRemaining:userSession.user.membership_plan.volume_remaining,totalLimit:userSession.user.membership_plan.membership.storage_size})
        }
        if (userSession.membership_plan){
            this.setState({membershipPlan:userSession.membership_plan,limitRemaining:userSession.membership_plan.volume_remaining,totalLimit:userSession.membership_plan.membership.storage_size})
        }
    }
    onChange = (e) => {
        switch (e.target.name) {
            case "audio_file":
                if (e.target.files.length > 0) {
                    const i = parseInt(Math.floor(Math.log(e.target.files[0].size) / Math.log(1024)));
                    const sizeMb = Math.round(e.target.files[0].size / Math.pow(1024, i), 2);
                    // if ()
                    var fileExtension = e.target.files[0].name.split(".").pop()
                    if (userSession.user.membership_plan.subscription_badge){
                        if (sizeMb === 71 || sizeMb > 70) {
                            this.setState({fileSizeError: "File Size Cannot Be Equal to or Greater Than 70mb"})
                        }
                        if (sizeMb < 71) {
                            if (userSession.user.membership_plan.subscription_badge){
                                this.setState({musicFileName: e.target.files[0].name, musicFile: e.target.files[0]})
                            }else{
                                if (fileExtension === "wav"){
                                    alert("You cannot select wav file if you are not subscribed")
                                }else{
                                    this.setState({musicFileName: e.target.files[0].name, musicFile: e.target.files[0]})
                                }
                            }
                        }
                    }else{
                        if (sizeMb === 15 || sizeMb > 15) {
                            this.setState({fileSizeError: "File Size Cannot Be Equal to or Greater Than 15mb"})
                        }
                        if (sizeMb < 15) {
                            if (userSession.user.membership_plan.subscription_badge){
                                this.setState({musicFileName: e.target.files[0].name, musicFile: e.target.files[0]})
                            }else{
                                if (fileExtension === "wav"){
                                    alert("You cannot select wav file if you are not subscribed")
                                }else{
                                    this.setState({musicFileName: e.target.files[0].name, musicFile: e.target.files[0]})
                                }
                            }
                        }
                    }
                }
                break;
            case "photo_main":
                if (e.target.files.length > 0) {
                    this.setState({imageFileName: e.target.files[0].name, imageFile: e.target.files[0]})
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
    onClickDismiss = () => {
        this.setState({fileSizeError: "",imageFileSizeError:""})
    }
    handleTagsChange = (tags) => {
        this.setState({tags: tags})
    }
    constructor(props) {
        super(props);
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession);
        this.inputFile = React.createRef();
        this.imgRef = React.createRef()
    }
    render() {
        const onSubmit = (e) => {
            e.preventDefault();
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            this.setState({errors: {},disableUpload:true})
            const formData = new FormData();
            formData.append("song_title", this.state.songTitle);
            formData.append("tags", this.state.tags);
            formData.append("genre", this.state.genre);
            formData.append("description", this.state.description);
            formData.append("photo_main", this.state.imageFile);
            formData.append("audio_file", this.state.musicFile);
            formData.append("price", this.state.price);
            formData.append("store_link", this.state.storeLink);
            formData.append("exclusive", this.state.content_type);
            const options = {
                onUploadProgress: (progressEvent) => {
                    const {loaded, total} = progressEvent;
                    let percent = Math.floor(loaded * 100 / total);
                    if (percent < 100) {
                        this.setState({uploadPercentage: percent})
                    }
                    // console.log(`${percent}kb of ${total}kb |${percent}%`);
                }
            }
            // const data = {song_title: ,tags:,genre:,description:,photo_main:,audio_file:,price:}
            this.setState({loader: true})
            this.props.uploadMusic(formData, userSession, options).then(() => {
                if (this.props.responseData.status) {
                    this.setState({loader: false,disableUpload:false})
                    this.setState({uploadPercentage: 100}, () => {
                        setTimeout(() => {
                            this.setState({uploadPercentage: 0})
                        }, 1000)
                    })
                    if (userSession.user) {
                        userSession.user.membership_plan.volume_remaining = this.props.responseData.result.limit_remaining
                        localStorage.setItem("userSession", JSON.stringify(userSession));
                        this.setState({limitRemaining:userSession.user.membership_plan.volume_remaining})
                    }
                    if (userSession.membership_plan) {
                        userSession.membership_plan.volume_remaining = this.props.responseData.result.limit_remaining
                        localStorage.setItem("userSession", JSON.stringify(userSession));
                        this.setState({limitRemaining:userSession.membership_plan.volume_remaining})
                    }
                    this.props.addCoins(userSession).then(() => {
                        let userSession = localStorage.getItem("userSession")
                        let user = JSON.parse(userSession)
                        user.user.coins = this.props.addCoinsResponse.total_coins
                        localStorage.setItem("userSession", JSON.stringify(user));
                        notify();
                        Router.push("/home");
                    })
                } else if (!this.props.responseData.status) {
                    this.setState({errors: this.props.responseData.message, loader: false,disableUpload:false})
                }
            }, ({data}) => {
            });

        }
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const notify = () => {
            store.addNotification({
                title: "Success!",
                message: "Your Music Has Uploaded",
                type: "success",
                container: "top-right",
                insert: "top",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000
                }
            })
        }
        const onImageUploadClick = (e) => {
            e.preventDefault();
            this.inputFile.current.click();
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="DIGITVL"
                    description="Upload your music content and earn DIGITVL coins"
                    openGraph={{
                        url: 'https://www.digitvl.com/upload',
                        title: 'DIGITVL',
                        description: 'Upload your music content and earn DIGITVL coins',
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
                    <div className="row custom-row-margin px-3 mt-5">
                        <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0 custom-bg-dark">
                            <div className="card-body">
                                <h4 className="title text-center mt-4 text-white"><b>Upload Music</b></h4>
                                {this.state.limitRemaining ? <ReactBootstrap.ProgressBar className="m-3" variant="info" active now={(this.state.limitRemaining/this.state.totalLimit)*100} label={`${((this.state.limitRemaining/this.state.totalLimit)*100).toFixed(1)}% remaining`} /> : null}
                                {/*{this.state.uploadPercentage > 0 &&*/}
                                {/*<ReactBootstrap.ProgressBar className="m-3" now={this.state.uploadPercentage}*/}
                                {/*                            variant="info" active*/}
                                {/*                            label={`${this.state.uploadPercentage}%`}/>}*/}
                                {this.state.loader ?
                                    <div className="row justify-content-center text-center pb-5"><Wave size={50}  color="steelblue" className="" name="line-scale"/></div> : null}

                                {this.state.errors.limit_error ? (
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errors.limit_error}
                                    </div>) : null}
                                <form className="row form-box px-3" onSubmit={onSubmit}>
                                    <div className="col-md-4 text-center">
                                        <img
                                            ref={this.imgRef}
                                            src={this.state.displayCover}
                                            className="" alt="" width="200" height="200"/>
                                        <button onClick={onImageUploadClick}
                                                className="btn btn-primary mt-3 mb-3">Upload Cover Image
                                        </button>
                                    </div>
                                    <div className="com-md-8 col-lg-8 col-xl-8">
                                        <div className="input-group mb-3">
                                            <span><i className="fa"> </i></span>
                                            <input name="songTitle" className="form-control" value={this.state.songTitle} type="text"
                                                   onChange={handleChange}
                                                   placeholder="Title"
                                                   tabIndex="1"/>
                                        </div>
                                        {this.state.errors.song_title ? (
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errors.song_title}
                                            </div>) : null}
                                        <div className="input-group mb-3">
                                            <span><i className="fa"> </i></span>
                                            <input name="description" onChange={handleChange}
                                                   value={this.state.description} className="form-control" type="text"
                                                   placeholder="Description"
                                                   tabIndex="2"/>
                                        </div>
                                        {this.state.errors.description ? (
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errors.description}
                                            </div>) : null}
                                        {userSession.user.membership_plan.subscription_badge?<div className="input-group mb-3">
                                            <span className="input-group-text"><i className="fas fa-dollar-sign"/></span>
                                            <input name="price" onChange={handleChange} value={this.state.price} className="form-control"
                                                   type="numeric"
                                                   placeholder="Price"
                                                   tabIndex="3"/>
                                        </div>:null}
                                        {this.state.errors.price ? (
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errors.price}
                                            </div>) : null}
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><i className="fas fa-store"/></span>
                                            <input name="storeLink" onChange={handleChange} value={this.state.storeLink} className="form-control"
                                                   type="text"
                                                   placeholder="Enter your store link on digitvl.shop(Optional)"
                                                   tabIndex="3"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <ReactTagInput placeholder="Enter Tags" maxTags={5}
                                                           tags={this.state.tags}
                                                           onChange={this.handleTagsChange}
                                                           tabIndex="4"/>
                                        </div>
                                        {this.state.errors.tags ? (<div className="alert alert-danger" role="alert">
                                            {this.state.errors.tags}
                                        </div>) : null}
                                        <div className="form-input">
                                            <label className="custom-file-label"
                                                   htmlFor="music-upload">{this.state.musicFileName ? this.state.musicFileName : "Choose Music/Beat"}</label>
                                            <input type="file" onChange={(e) => this.onChange(e)} name="audio_file"
                                                   accept="audio/*" className="custom-file-input" multiple={false}
                                                   id="music-upload" tabIndex="5"/>
                                        </div>
                                        {this.state.fileSizeError ? (
                                            <div className="alert alert-danger alert-dismissible fade show"
                                                 role="alert">
                                                {this.state.fileSizeError}
                                                <button onClick={() => this.onClickDismiss()} type="button"
                                                        className="close" data-dismiss="alert"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>) : null}
                                        {this.state.errors.audio_file ? (
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errors.audio_file}
                                            </div>) : null}

                                        <div className="form-input">
                                            <label className="custom-file-label"
                                                   htmlFor="image-upload">{this.state.imageFileName ? this.state.imageFileName : "Choose Cover Image"}</label>
                                            <input type="file" onChange={(e) => this.onChange(e)} name="photo_main"
                                                   accept="image/*" ref={this.inputFile} multiple={false}
                                                   className="custom-file-input" tabIndex="6" id="image-upload"/>
                                        </div>
                                        {this.state.imageFileSizeError ? (
                                            <div className="alert alert-danger alert-dismissible fade show"
                                                 role="alert">
                                                {this.state.imageFileSizeError}
                                                <button onClick={() => this.onClickDismiss()} type="button"
                                                        className="close" data-dismiss="alert"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>) : null}
                                        {this.state.errors.photo_main ? (
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errors.photo_main}
                                            </div>) : null}
                                        <div className="form-input input-group mb-3">
                                            <select className="custom-select custom-option-color-white" onChange={(e) => {
                                                this.setState({genre: e.target.value})
                                            }} id="inputGroupSelect02">
                                                <option >Choose Genre</option>
                                                <option value="Hip Hop">Hip Hop</option>
                                                <option value="Trap">Trap</option>
                                                <option value="Dancehall">Dancehall</option>
                                                <option value="New School">New School</option>
                                                <option value="Smooth">Smooth</option>
                                                <option value="Club">Club</option>
                                                <option value="Pop">Pop</option>
                                                <option value="Beats with hooks">Beats with hooks</option>
                                            </select>
                                            <div className="input-group-append">
                                                <label className="input-group-text"
                                                       htmlFor="inputGroupSelect02">Genres</label>
                                            </div>
                                        </div>

                                        {userSession.user.membership_plan.subscription_badge?<div className="form-input input-group mb-3">
                                            <select className="custom-select custom-option-color-white" onChange={(e) => {
                                                this.setState({content_type: e.target.value})
                                            }} id="inputGroupSelect02">
                                                <option >Choose Content Type</option>
                                                <option value="1">Free</option>
                                                <option value="2">Exclusive</option>
                                            </select>
                                            <div className="input-group-append">
                                                <label className="input-group-text"
                                                       htmlFor="inputGroupSelect02">Content Type</label>
                                            </div>
                                        </div>:null}

                                        <div className="mb-3">
                                            <button type="submit" disabled={this.state.disableUpload} className="btn btn-block text-uppercase bg-accent">Upload
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        responseData: state.musicUpload.musicUploadResponseData,
        addCoinsResponse: state.addCoins.addCoinsData
    }
}
export default connect(mapStateToProps, {uploadMusic: uploadMusic,addCoins})(UploadMusic);