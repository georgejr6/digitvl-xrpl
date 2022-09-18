import React, {Component} from 'react';
import {connect} from "react-redux";
import {register, hitGoogleAuthApi} from "../actions";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link";
import Router from "next/router";
import {NextSeo} from "next-seo";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
    phoneNumber: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    cPasswordError: "",
    phoneNoError: "",
    algoAddress: "",
    errors: {},
    // country:"",
    // city:"",
    // address:"",
    // phoneNumber:""
};

class Register extends Component {
    state = initialState

    render() {
        const renderTooltip = props => (
            <Tooltip {...props}>DISCLAIMER: IF YOU LIVE IN NEW YORK YOU WILL NOT BE RECEIVING TOKENS.</Tooltip>
        );
        const handleSubmit = (e) => {
            e.preventDefault();
            this.setState({errors: {}})
            const isValid = validate();
            if (isValid) {
                const data = {
                    email: this.state.email,
                    username: this.state.username,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    password: this.state.password,
                    phone_number: this.state.phoneNumber,
                    algorand_public_address: this.state.algoAddress
                }
                this.props.register(data).then(() => {
                    if (this.props.responseData.status) {
                        // notify();
                        const options = {
                            title: 'Email Verification!',
                            message: 'Your account has been registered! Verification email has been sent to your email. Please verify first to login!',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => {
                                    }
                                }
                            ],
                            closeOnEscape: true,
                            closeOnClickOutside: true,
                            willUnmount: () => {
                            },
                            afterClose: () => {
                            },
                            onClickOutside: () => {
                            },
                            onKeypressEscape: () => {
                            }
                        };
                        confirmAlert(options)
                        Router.push("/login");
                    } else if (!this.props.responseData.status) {
                        this.setState({errors: this.props.responseData.message})
                    }
                }, ({data}) => {
                });
            }
        }
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const validate = () => {
            let firstNameError = "";
            let lastNameError = "";
            let usernameError = "";
            let emailError = "";
            let passwordError = "";
            let phoneNoError = "";

            if (!this.state.email.includes("@") || !this.state.email) {
                emailError = "Invalid Email"
            }
            if (!this.state.username) {
                usernameError = "Invalid Username"
            }
            if (!this.state.firstName) {
                firstNameError = "Invalid First Name"
            }
            if (!this.state.lastName) {
                lastNameError = "Invalid Last Name"
            }
            if (!(this.state.password === this.state.cPassword)) {
                passwordError = "Password Does Not Match"
            }
            if (this.state.password.length < 6) {
                passwordError = "Password Length is too short"
            }
            if (this.state.phoneNumber.length > 13 || this.state.phoneNumber.length < 12 || !this.state.phoneNumber) {
                phoneNoError = "Invalid Phone Number"
            }
            // if (!this.state.phoneNumber.includes("+")){
            //     phoneNoError = "Please add country code E.G: +1xxxxxxxxxx"
            // }

            if (firstNameError) {
                this.setState({firstNameError: firstNameError})
                return false;
            }
            if (lastNameError) {
                this.setState({lastNameError: lastNameError})
                return false;
            }
            if (usernameError) {
                this.setState({usernameError: usernameError})
                return false;
            }
            if (emailError) {
                this.setState({emailError: emailError})
                return false;
            }
            if (passwordError) {
                this.setState({passwordError: passwordError})
                return false;
            }
            // if (phoneNoError){
            //     this.setState({phoneNoError:phoneNoError})
            //     return false;
            // }
            return true;
        }
        return (
            <div className="container-fluid custom-register-page-bg">
                <NextSeo
                    title="DIGITVL"
                    description="Register on futuristic Hub for independent creators"
                    openGraph={{
                        url: 'https://www.digitvl.com/register',
                        title: 'DIGITVL',
                        description: 'Register on futuristic Hub for independent creators',
                        site_name: 'DIGITVL',
                        type: 'website'
                    }}
                    additionalMetaTags={[
                        {
                            property: "twitter:image",
                            content: 'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property: "twitter:image:src",
                            content: 'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property: "og:image",
                            content: 'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property: "og:image:width",
                            content: 800
                        },
                        {
                            property: "og:image:height",
                            content: 500
                        }
                    ]}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                        image: 'https://www.digitvl.com/images/landing_bg_img.png'
                    }}
                />
                <div className="row">
                    <div className="col-md-6 col-sm-3 col-xs-3 text-left digitvl-heading">
                        <Link href="/">DIGITVL</Link>
                    </div>
                    <div className="col-md-6 col-sm-3 col-xs-3 text-right explore-heading">
                        <Link href="/home">Explore</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="pt-3 pt-sm-3 pb-5">
                    <div className="container-fluid w-75 h-100 custom-register-form pb-5 mx-auto mx-md-auto mx-sm-auto">
                        <div className="text-center custom-register-heading pt-5">Register</div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext" type="text" name="firstName"
                                   value={this.state.firstName}
                                   onChange={handleChange} placeholder="First Name" tabIndex="1"
                                   required/>
                            {this.state.firstNameError ? (
                                <div className="m-2 alert alert-danger custom-error-form" role="alert">
                                    {this.state.firstNameError}
                                </div>) : null}
                            {this.state.errors.first_name ? (
                                <div className="m-2 alert alert-danger custom-error-form" role="alert">
                                    {this.state.errors.first_name}
                                </div>) : null}
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext" type="text" name="lastName"
                                   value={this.state.lastName}
                                   onChange={handleChange} placeholder="Last Name" tabIndex="2"
                                   required/>
                            {this.state.lastNameError ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.lastNameError}
                                </div>) : null}
                            {this.state.errors.last_name ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.errors.last_name}
                                </div>) : null}
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext custom-error-form" type="text"
                                   name="username" value={this.state.username}
                                   onChange={handleChange} placeholder="Username" tabIndex="3"
                                   required/>
                            {this.state.usernameError ? (<div className="alert alert-danger" role="alert">
                                {this.state.usernameError}
                            </div>) : null}
                            {this.state.errors.username ? (<div className="alert alert-danger" role="alert">
                                {this.state.errors.username}
                            </div>) : null}
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext custom-error-form" type="email"
                                   name="email" value={this.state.email}
                                   onChange={handleChange} placeholder="Email" tabIndex="4" required/>
                            {this.state.emailError ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.emailError}
                                </div>) : null}
                            {this.state.errors.email ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.errors.email}
                                </div>) : null}
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext" type="password" name="password"
                                   tabIndex="5" value={this.state.password}
                                   onChange={handleChange} placeholder="Password" required/>
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext" type="password" name="cPassword"
                                   tabIndex="6" value={this.state.cPassword}
                                   onChange={handleChange} placeholder="Confirm Password" required/>
                            {this.state.passwordError ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.passwordError}
                                </div>) : null}
                            {this.state.errors.password ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.errors.password}
                                </div>) : null}
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input className="mx-auto w-75 custom-tweet-inputtext" type="tel" name="phoneNumber"
                                   value={this.state.phoneNumber}
                                   onChange={handleChange} placeholder="Phone Number(e.g:+13345101223)" tabIndex="7"
                                   required/>
                            {this.state.phoneNoError ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.phoneNoError}
                                </div>) : null}
                            {this.state.errors.phone_number ? (
                                <div className="alert alert-danger custom-error-form" role="alert">
                                    {this.state.errors.phone_number}
                                </div>) : null}
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                            <input className="mx-auto w-75 custom-tweet-inputtext" type="text" name="algoAddress"
                                   value={this.state.algoAddress}
                                   onChange={handleChange} placeholder="Paste your Algorand wallet address (OPTIONAL)" tabIndex="8"
                            />
                            </OverlayTrigger>
                            {/*<p><b>IF YOU LIVE IN NEW YORK YOU WILL NOT BE RECEIVING TOKENS.</b></p>*/}
                        </div>
                        <div className="w-50 mt-3 mx-auto">
                            <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">Register
                            </button>
                        </div>
                        <div className="text-center mt-5 custom-login-register-text">
                            Already have an account? <Link href="/login">Login!</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        responseData: state.auth.user,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {register: register, hitGoogleAuthApi: hitGoogleAuthApi})(Register);