import React, {Component} from 'react';
import Navbar from "./Navbar"

import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import {connect} from "react-redux"
import {editUserProfile} from "../actions";
import Router from "next/router";
import {base64StringtoFile, extractImageFileExtensionFromBase64} from "../utils/dataURLtoFile";

const initialState = {
    bio: "",
    location: "",
    dob: "",
    imageFileName: "",
    algoAddress: "",
    coverImageFileName: "",
    startDate: new Date(),
    imageFile: null,
    coverImageFile: null,
    coverImageFile64: null,
    errors: {},
    crop: {
        aspect: 16 / 4
    },
    cropAvatar: {
        x: 0,
        y: 0
    },
    adjustedAvatarImage: null,
    adjustedCoverImage: null,
    adjustedCoverImageFile: null,
    zoom: 1,
    croppedArea: null,
    cropImageLoaded: null
};
let userSession

class UserProfileEdit extends Component {
    state = initialState

    constructor(props) {
        super(props);
        this.imagePreviewCanvas = React.createRef();
    }

    componentDidMount() {
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession.user) {
            this.setState({bio: userSession.user.profile.bio, location: userSession.user.profile.location,algoAddress:userSession.user.profile.algorand_public_address})
        }
        if (userSession.profile) {
            this.setState({bio: userSession.profile.bio, location: userSession.profile.location,algoAddress:userSession.profile.algorand_public_address})
        }
    }

    onChange = (e) => {
        switch (e.target.name) {
            case "avatar":
                if (e.target.files.length > 0) {
                    this.setState({imageFileName: e.target.files[0].name, imageFile: e.target.files[0]})
                }
                break;
            case "cover":
                if (e.target.files.length > 0) {
                    this.setState({
                        coverImageFileName: e.target.files[0].name,
                        coverImageFile: URL.createObjectURL(e.target.files[0])
                    })
                    const reader = new FileReader()
                    reader.addEventListener("load", () => {
                        if (reader.readyState === 2) {
                            this.setState({coverImageFile64: reader.result})
                        }
                    })
                    reader.readAsDataURL(e.target.files[0])
                }
                break;
            default:
                const isCheckbox = e.target.type === "checkbox";
                this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value});
        }
    }
    getCroppedAvatarImg = () => {
        const canvas = document.createElement('canvas');
        const scaleX = this.state.imageFile.naturalWidth / this.state.imageFile.width;
        const scaleY = this.state.imageFile.naturalHeight / this.state.imageFile.height;
        canvas.width = this.state.cropAvatar.width;
        canvas.height = this.state.cropAvatar.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            this.state.imageFile,
            this.state.cropAvatar.x * scaleX,
            this.state.cropAvatar.y * scaleY,
            this.state.cropAvatar.width * scaleX,
            this.state.cropAvatar.height * scaleY,
            0,
            0,
            this.state.cropAvatar.width,
            this.state.cropAvatar.height,
        );

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        this.setState({adjustedAvatarImage: base64Image})
        // As a blob
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         blob.name = fileName;
        //         resolve(blob);
        //     }, 'image/jpeg', 1);
        // });
    }
    getCroppedCoverImg = () => {
        // const canvasRef = this.imagePreviewCanvas.current
        // image64toCanvasRef(canvasRef,this.state.coverImageFile64,this.state.crop)
        // const fileExtension = extractImageFileExtensionFromBase64(this.state.coverImageFile64)
        // const base64Img = canvasRef.toDataURL("image/jpeg")
        // const filename = "croppedUserCover."+ fileExtension
        // const newCroppedFile = base64StringtoFile(base64Img,filename)
        // const reader = new FileReader()
        // // reader.addEventListener("load",() =>{
        // //     if (reader.readyState === 2) {
        // //         this.setState({adjustedCoverImage:reader.result})
        // //     }
        // // })
        // // reader.readAsDataURL(newCroppedFile)
        // this.setState({adjustedCoverImage:window.URL.createObjectURL(newCroppedFile)})
        // console.log(base64Img)
        // console.log(newCroppedFile)

        const canvasCover = document.createElement('canvas');
        const scaleX = this.state.cropImageLoaded.naturalWidth / this.state.cropImageLoaded.width;
        const scaleY = this.state.cropImageLoaded.naturalHeight / this.state.cropImageLoaded.height;
        canvasCover.width = this.state.crop.width;
        canvasCover.height = this.state.crop.height;
        const ctx = canvasCover.getContext('2d');
        //
        if (canvasCover.width > 1 && canvasCover.height > 1) {
            ctx.drawImage(
                this.state.cropImageLoaded,
                this.state.crop.x * scaleX,
                this.state.crop.y * scaleY,
                this.state.crop.width * scaleX,
                this.state.crop.height * scaleY,
                0,
                0,
                this.state.crop.width,
                this.state.crop.height,
            );

            // As Base64 string
            const base64Image = canvasCover.toDataURL('image/jpeg');
            const fileExtension = extractImageFileExtensionFromBase64(this.state.coverImageFile64)
            const filename = "croppedUserCover." + fileExtension
            const newCroppedFile = base64StringtoFile(base64Image, filename)
            this.setState({
                adjustedCoverImage: URL.createObjectURL(newCroppedFile),
                adjustedCoverImageFile: newCroppedFile
            })
        } else {
            alert("Please select the desired section of the image first")
        }
        // As a blob
        // return new Promise((resolve, reject) => {
        //     canvasRef.toBlob(blob => {
        //         if (!blob) {
        //             //reject(new Error('Canvas is empty'));
        //             console.error('Canvas is empty');
        //             return;
        //         }
        //         blob.name = "crop_cover";
        //         window.URL.revokeObjectURL(this.fileUrl);
        //         this.fileUrl = window.URL.createObjectURL(blob);
        //         resolve(this.fileUrl);
        //         this.setState({adjustedAvatarImage:this.fileUrl})
        //         // resolve(blob);
        //     }, 'image/jpeg', 1);
        // });
    }
    handleImageLoaded = (image) => {
        this.setState({cropImageLoaded: image})
    }
    handleOnCropComplete = (crop, pixelCrop) => {
        // const canvasRef = this.imagePreviewCanvas.current
        // image64toCanvasRef(canvasRef,this.state.coverImageFile64,crop)
        // const fileExtension = extractImageFileExtensionFromBase64(this.state.coverImageFile64)
        // console.log(fileExtension)
        // const base64Img = canvasRef.toDataURL("image/"+fileExtension)
        // console.log(base64Img)
        // const filename = "croppedUserCover."+ fileExtension
        // console.log(filename)
        // const newCroppedFile = base64StringtoFile(base64Img,filename)
        // console.log(newCroppedFile)
    }
    onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        this.setState({croppedArea: croppedAreaPixels})
    }

    render() {
        const handleDateChange = (date) => {
            this.setState({
                startDate: date
            });
        }
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }

        const onSubmit = (e) => {
            e.preventDefault()
            if (this.state.coverImageFileName) {
                this.getCroppedCoverImg()
            }
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            this.setState({errors: {}});
            const formData = new FormData();
            if (this.state.bio) {
                formData.append("bio", this.state.bio)
            }
            if (this.state.algoAddress) {
                formData.append("algorand_public_address", this.state.algoAddress)
            }
            if (this.state.location) {
                formData.append("location", this.state.location)
            }
            if (this.state.dob) {
                formData.append("birth_date", this.state.dob)
            }
            if (this.state.imageFile) {
                formData.append("avatar", this.state.imageFile)
            }
            if (this.state.coverImageFile) {
                if (this.state.adjustedCoverImageFile) {
                    formData.append("cover_photo", this.state.adjustedCoverImageFile)
                } else {
                    alert("Please try again submitting")
                    return
                }
            }
            this.props.editUserProfile(formData, userSession).then(() => {
                let userSession = localStorage.getItem("userSession")
                let user = JSON.parse(userSession)
                if (this.props.userProfileEditResponse.status) {
                    if (user.user) {
                        user.user = this.props.userProfileEditResponse.result.user
                        user.user.profile.avatar = this.props.userProfileEditResponse.result.user.profile.avatar
                        user.user.profile.cover_photo = this.props.userProfileEditResponse.result.user.profile.cover_photo
                        user.user.profile.bio = this.props.userProfileEditResponse.result.user.profile.bio
                        user.user.profile.location = this.props.userProfileEditResponse.result.user.profile.location
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    if (user.profile) {
                        user.profile = this.props.userProfileEditResponse.result.user.profile
                        user.profile.avatar = this.props.userProfileEditResponse.result.user.profile.avatar
                        user.profile.cover_photo = this.props.userProfileEditResponse.result.user.profile.cover_photo
                        user.profile.bio = this.props.userProfileEditResponse.result.user.profile.bio
                        user.profile.location = this.props.userProfileEditResponse.result.user.profile.location
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    // notify();
                    Router.push("/profile");
                }
                if (!this.props.userProfileEditResponse.status) {
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
                        <div
                            className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                            <div className="text-center custom-login-heading pt-5 text-white">Edit Profile</div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="algoAddress" value={this.state.algoAddress} type="text"
                                       onChange={handleChange}
                                       placeholder="Paste your Algorand Wallet address"
                                       tabIndex="1"/>
                            </div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="bio" value={this.state.bio} type="text"
                                       onChange={handleChange}
                                       placeholder="Enter Bio"
                                       tabIndex="2" required/>
                            </div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="location" onChange={handleChange}
                                       value={this.state.location}
                                       type="text"
                                       placeholder="Enter Location"
                                       tabIndex="3" required/>
                            </div>
                            <div className="custom-input form-input w-100 mt-2 text-center">
                                <label className="custom-input-label pr-2"
                                       htmlFor="image-upload">{this.state.imageFileName ? this.state.imageFileName : "Upload Avatar"}</label>
                                <input type="file" onChange={(e) => this.onChange(e)} name="avatar"
                                       accept="image/*" multiple={false} className="pt-2 text-white"
                                       id="image-upload"
                                       tabIndex="4"/>
                                <p className="input-field-custom-info">Add Image with width 150px and height 150px.(For
                                    better result)</p>
                            </div>
                            {this.state.errors.avatar ? (<div
                                className="custom-input form-input w-100 align-content-center align-items-center mt-2 text-center">
                                <div
                                    className="m-2 text-center align-content-center align-items-center alert alert-danger custom-error-form"
                                    role="alert">
                                    {this.state.errors.avatar}
                                </div>
                            </div>) : null}
                            <div className="custom-input form-input w-100 mt-2 text-center">
                                <label className="custom-input-label pr-2"
                                       htmlFor="image-upload">{this.state.coverImageFileName ? this.state.coverImageFileName : "Upload Cover"}</label>
                                <input type="file" onChange={(e) => this.onChange(e)} name="cover"
                                       accept="image/*" multiple={false} className="pt-2 text-white"
                                       id="image-upload"
                                       tabIndex="5"/>
                                {/*<p className="input-field-custom-info">Add Image with width 900px and height 300px.(For better result)</p>*/}
                            </div>
                            <div className={`col-md-12`}>
                                {this.state.coverImageFileName && (
                                    <h4 className="text-white">Adjust Cover(900x300)</h4>)}
                                {
                                    this.state.coverImageFileName && (
                                        <ReactCrop src={this.state.coverImageFile} ruleOfThirds
                                                   onImageLoaded={(newImage) => {
                                                       this.setState({cropImageLoaded: newImage})
                                                   }} onChange={(newCrop) => {
                                            this.setState({crop: newCrop})
                                        }} crop={this.state.crop}/>
                                    )
                                }
                            </div>
                            {/*{this.state.coverImageFileName ?<div className="col-md-12">*/}
                            {/*    <canvas ref={this.imagePreviewCanvas} className="custom-canvas-crop-cover"/>*/}
                            {/*    /!*<img src={this.state.coverImageFile64Cropped} className="img-fluid custom-canvas-crop-cover"/>*!/*/}
                            {/*</div>:null}*/}
                            {/*{this.state.coverImageFileName ?(<div className="col-md-12 text-center">*/}
                            {/*     <div className="btn-primary" onClick={this.getCroppedCoverImg}>Crop Cover</div>*/}
                            {/*</div>):null}*/}
                            {/*{this.state.adjustedCoverImage ? (<div>*/}
                            {/*    <p className="text-white">Cropped Image</p>*/}
                            {/*    <img src={this.state.adjustedCoverImage} alt="Cropped Cover Image" className="img-fluid"/>*/}
                            {/*</div>):null}*/}
                            <div className="w-25 mt-3 mx-auto">
                                <button type="submit" tabIndex="6" className="custom-login-button btn btn-block">Submit
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
export default connect(mapStateToProps, {editUserProfile: editUserProfile})(UserProfileEdit);