import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteUserMusic} from "../actions";
import Navbar from "./Navbar";
import Router from "next/router";
class DeleteTrack extends Component {
    deleteTrack=()=> {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.deleteUserMusic(userSession, this.props.dataparams.id).then(() => {
            Router.push("/profile")
        })
    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar />
                <div className="container-fluid">
                    <div className="row custom-row-margin px-3 pt-5">
                        <div className="col-md-12 card flex-row custom-bg-dark mx-auto px-0">
                            <div className="card-body custom-bg-dark">
                                <h4 className="title text-center mt-4 text-white">Delete Track</h4>
                                <p className="text-center mt-4 text-white">Are you sure you want to
                                    delete {this.props.dataparams.name} track?</p>
                                <div className="text-accent bg-outline-accent col-md-12 card flex-row mx-auto px-0">
                                    <div onClick={()=>this.deleteTrack()} className="site-white-color btn btn-block text-uppercase">Delete
                                    </div>
                                </div>
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
        deleteuserMusicResponse: state.deleteUserTrack.deleteUserTrackData
    }
}
export default connect(mapStateToProps, {deleteUserMusic})(DeleteTrack);