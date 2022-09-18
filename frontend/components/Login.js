import React from "react";
import {login} from "../actions";
import {connect} from "react-redux";
import Router from "next/router";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link";
import {NextSeo} from "next-seo";

const initialState = {
    email: "",
    password: "",
    error: ""
};

class Login extends React.Component {
    state = initialState
    componentDidMount() {
        let userLoggedIn = localStorage.getItem("userLoggedIn")
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if(userLoggedIn === "true"){
            Router.push("/home")
        }
    }

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
                const data = {email: this.state.email, password: this.state.password}
                this.props.login(data).then(() => {
                    // console.log(this.props.responseData)
                    if (this.props.responseData.status) {
                        localStorage.setItem("userSession", JSON.stringify(this.props.responseData.result.user))
                        localStorage.setItem("userLoggedIn", "true")
                        localStorage.setItem("userToken", this.props.responseData.result.user.token)
                        localStorage.setItem("userEmail", this.props.responseData.result.user.user.email)
                        localStorage.setItem("userStripeCustomerId", this.props.responseData.result.user.user.membership_plan.get_customer_id)
                        Router.push("/home")

                    } else if (!this.props.responseData.status) {
                        this.setState({error: this.props.responseData.message})
                        const options = {
                            title: 'Error',
                            message: this.props.responseData.message,
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
                    }
                }, ({data}) => {
                });
            }
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
                <NextSeo
                    title="DIGITVL"
                    description="Login at DIGITVL and unlock the future"
                    openGraph={{
                        url: 'https://www.digitvl.com/login',
                        title: 'DIGITVL',
                        description: 'Login at DIGITVL and unlock the future',
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
                        <div className="text-center custom-login-heading pt-5">Login</div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input name="email" className="mx-auto w-75 custom-tweet-inputtext" onChange={handleChange} value={this.state.email} type="email" placeholder="Email" tabIndex="1" required/>
                        </div>
                        <div className="custom-input w-100 mt-2 text-center">
                            <input name="password" className="mx-auto w-75 custom-tweet-inputtext" onChange={handleChange} value={this.state.password} type="password" placeholder="Password" tabIndex="2" required/>
                        </div>
                        {this.state.error ?(<div className="m-3 alert alert-danger" role="alert">
                            {this.state.error}
                        </div>):null}
                        <div className="w-50 mt-3 mx-auto">
                            <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">Login
                            </button>
                        </div>
                        <div className="text-center mt-3 custom-forgot-password">
                            <Link href="/forgot-password">Forgot Password?</Link>
                        </div>
                        <div className="text-center mt-5 custom-login-register-text">
                            Don't have an account? <Link href="/register">Register!</Link>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        responseData:state.auth.user
    };
}

export default connect(mapStateToProps,{login:login})(Login);