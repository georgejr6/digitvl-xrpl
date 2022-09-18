import React, {Component} from 'react';
import {connect} from "react-redux";
import {forgotPasswordUpdateApi} from "../actions"
import Router from "next/router";
import {store} from "react-notifications-component";
import Link from "next/link";

class ForgotPasswordUpdate extends Component {
    state = {verification_code: "", email: "", password: "", cPassword: ""}

    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            this.setState({errors: {}})
            const isValid = validate();
            if (isValid) {
                const data = {
                    code: this.state.verification_code,
                    email: this.state.email,
                    password: this.state.password
                }
                this.props.forgotPasswordUpdateApi(data).then(() => {
                    if (this.props.forgotPasswordUpdate.status) {
                        notify();
                        Router.push("/login");
                    } else if (!this.props.forgotPasswordUpdate.status) {
                        this.setState({error: this.props.forgotPasswordUpdate.message})
                    }
                }, ({data}) => {
                });
            }
        }
        const notify = () => {
            store.addNotification({
                title: "Success",
                message: "Password Successfully updated!",
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
        const validate = () => {
            let emailError = "";
            let passwordError = "";
            if (!this.state.email.includes("@") || !this.state.email) {
                emailError = "Invalid Email"
            }
            if (this.state.password.length < 8) {
                passwordError = "Password Length is too short"
            }
            if (emailError) {
                this.setState({emailError: emailError})
                return false;
            }
            if (passwordError) {
                this.setState({passwordError: passwordError})
                return false;
            }
            return true;
        }
        return (
            <div className="container-fluid custom-login-page-bg">
                <div className="row">
                    <div className="col-md-6 col-sm-3 col-xs-3 text-left digitvl-heading">
                        <Link href="/">DIGITVL</Link>
                    </div>
                    <div className="col-md-6 col-sm-3 col-xs-3 text-right explore-heading">
                        <Link href="/home">Explore</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="pt-3 pt-sm-3">
                    <div className="container-fluid w-75 h-100 custom-login-form pb-5 mx-auto mx-md-auto mx-sm-auto">
                        <div className="text-center custom-login-heading pt-5">Forgot Password</div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75" name="verification_code" value={this.state.verification_code} onChange={handleChange}
                                   type="decimal"
                                   placeholder="Verification Code" tabIndex="1" required/>
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75" name="email" value={this.state.email} type="email" onChange={handleChange}
                                   placeholder="Email" tabIndex="2" required/>
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75" name="password" value={this.state.password} type="password" onChange={handleChange}
                                   placeholder="Password" tabIndex="3" required/>
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75" name="cPassword" value={this.state.cPassword} type="password" onChange={handleChange}
                                   placeholder="Confirm Password" tabIndex="4" required/>
                        </div>
                        {this.state.error ?(<div className="m-3 alert alert-danger" role="alert">
                            {this.state.error}
                        </div>):null}
                        <div className="w-50 mt-3 mx-auto">
                            <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">Send Email
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        forgotPasswordUpdate: state.forgotPasswordUpdate.forgotPasswordUpdateResponseData
    }
}

export default connect(mapStateToProps, {forgotPasswordUpdateApi})(ForgotPasswordUpdate);