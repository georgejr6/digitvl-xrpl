import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateUserMusic} from "../actions";
import Navbar from "./Navbar";
import {store} from "react-notifications-component";
import Router from "next/router";
let userSession
class EditTrack extends Component {
    state = {
        songTitle: "",
        genre: "",
        description: "",
        imageFileName: "",
        price: 0,
        storeLink:"",
        displayCover: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        musicFile: null,
        imageFile: null,
        tags: [],
        errors: {},
        fileSizeError: "",
        imageFileSizeError: "",
        membershipPlan:{},
    }
    constructor() {
        super();
        this.inputFile = React.createRef();
    }
    componentDidMount() {
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession.user) {
            this.props.updateUserMusic(userSession,this.props.dataparams.id,{}).then(()=>{
                this.setState({
                    songTitle:this.props.updateTrackResponse.result.song_title,
                    tags:this.props.updateTrackResponse.result.tags,
                    description:this.props.updateTrackResponse.result.description,
                    price:this.props.updateTrackResponse.result.price,
                    displayCover:this.props.updateTrackResponse.result.photo_main,
                    genre:this.props.updateTrackResponse.result.genre,
                    storeLink:this.props.updateTrackResponse.result.store_link
                })
            })
        }
    }
    onChange = (e) => {
        switch (e.target.name) {
            case "audio_file":
                if (e.target.files.length > 0) {
                    const i = parseInt(Math.floor(Math.log(e.target.files[0].size) / Math.log(1024)));
                    const sizeMb = Math.round(e.target.files[0].size / Math.pow(1024, i), 2);
                    if (sizeMb === 15 || sizeMb > 15) {
                        this.setState({fileSizeError: "File Size Cannot Be Equal to or Greater Than 15mb"})
                    }
                    if (sizeMb < 15) {
                        this.setState({musicFileName: e.target.files[0].name, musicFile: e.target.files[0]})
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

    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const notify = () => {
            store.addNotification({
                title: "Success!",
                message: "Track Info Updated",
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
        const onSubmit = (e) => {
            e.preventDefault();
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            this.setState({errors: {}})
            const formData = new FormData();
            if (this.state.imageFile) {
                formData.append("song_title", this.state.songTitle);
                formData.append("genre", this.state.genre);
                formData.append("description", this.state.description);
                formData.append("photo_main", this.state.imageFile);
                formData.append("price", this.state.price);
                formData.append("store_link", this.state.storeLink);
            }else{
                formData.append("song_title", this.state.songTitle);
                formData.append("genre", this.state.genre);
                formData.append("description", this.state.description);
                formData.append("price", this.state.price);
                formData.append("store_link", this.state.storeLink);
            }

            this.props.updateUserMusic(userSession,this.props.dataparams.id,formData).then(()=>{
                notify()
                Router.push("/profile")
            })
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="row custom-row-margin px-3 pt-5">
                        <div className="col-lg-10 col-xl-9 card flex-row custom-bg-dark mx-auto px-0">
                            <div className="card-body custom-bg-dark">
                                <h4 className="title text-center mt-4">Edit Track</h4>

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
                                    <div className="col-md-8 col-lg-8 col-xl-8">
                                        <div className="input-group mb-3">
                                            <span><i className="fa"> </i></span>
                                            <input name="songTitle" className="form-control"  type="text"
                                                   onChange={handleChange}
                                                   value={this.state.songTitle}
                                                   placeholder="Title"
                                                   tabIndex="1"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span><i className="fa"> </i></span>
                                            <input name="description"
                                                   className="form-control" type="text"
                                                   onChange={handleChange}
                                                   value={this.state.description}
                                                   placeholder="Description"
                                                   tabIndex="2"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><i className="fas fa-store"/></span>
                                            <input name="storeLink" onChange={handleChange} value={this.state.storeLink} className="form-control"
                                                   type="text"
                                                   placeholder="Enter your store link on digitvl.shop(Optional)"
                                                   tabIndex="3"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><i className="fas fa-dollar-sign"/></span>
                                            <input name="price" className="form-control"
                                                   value={this.state.price}
                                                   onChange={handleChange}
                                                   type="numeric"
                                                   placeholder="Price"
                                                   tabIndex="4"/>
                                        </div>
                                        <div className="form-input">
                                            <label className="custom-file-label"
                                                   htmlFor="image-upload">{this.state.imageFileName ? this.state.imageFileName : "Choose Cover Image"}</label>
                                            <input type="file" onChange={(e) => this.onChange(e)} name="photo_main"
                                                   accept="image/*" ref={this.inputFile} multiple={false}
                                                   className="custom-file-input" tabIndex="5" id="image-upload"/>
                                        </div>

                                        <div className="form-input input-group mb-3">
                                            <select className="custom-select" onChange={(e) => {
                                                this.setState({genre: e.target.value})
                                            }} id="inputGroupSelect02">
                                                <option >Choose Genre</option>
                                                <option value="Hip Hop" selected="selected">Hip Hop</option>
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

                                        <div className="mb-3">
                                            <button type="submit" disabled={this.state.disableUpload} className="btn btn-block text-uppercase">Edit
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
        updateTrackResponse: state.updateTrack.updateTrackData
    }
}
export default connect(mapStateToProps,{updateUserMusic})(EditTrack);