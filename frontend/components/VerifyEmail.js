import React, {Component} from 'react';
import {connect} from "react-redux";
import {verifyEmailApi} from "../actions";
import Link from "next/link"
import Navbar from "./Navbar";

class VerifyEmail extends Component {
    state = {text: ""}

    componentDidMount() {
        const formData = new FormData();
        formData.append("token", this.props.dataparams.token)
        this.props.verifyEmailApi(formData).then(() => {
            if (this.props.verifyUserResponse.status) {
                this.setState({text: "Your email is verified! You can enjoy the platform now."})
            } else {
                this.setState({text: "There is something wrong.Please try again!"})
            }
        })
    }

    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <span className="custom-text-verify">{this.state.text}</span>
                            </div>
                            <div className="col-md-12 text-center">
                                <div className="btn btn-outline-primary"><Link href="/login">Login</Link></div>
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
        verifyUserResponse: state.verifyUser.verifyUserResponseData
    }
}
export default connect(mapStateToProps, {verifyEmailApi})(VerifyEmail);