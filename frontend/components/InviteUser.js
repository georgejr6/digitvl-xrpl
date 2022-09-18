import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {inviteUser} from "../actions";
import {confirmAlert} from "react-confirm-alert";
import {NextSeo} from "next-seo";
class InviteUser extends Component {
    state = {email:""}
    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession);
            const formData = new FormData();
            formData.append("invited_user",this.state.email)
            if (this.state.email) {
                this.props.inviteUser(userSession, formData).then(()=>{
                    if (this.props.inviteUserResponse.status) {
                        const options = {
                            title: 'Success!',
                            message: 'Your invitation has been sent to the email. You will receive DIGITVL-points when user register and verify himself/herself on the platform',
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
                    }else{
                        const options = {
                            title: 'Error!',
                            message: 'Something went wrong. Please try again',
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
                }).catch(err=>{
                    const options = {
                        title: 'Error!',
                        message: 'Something went wrong. Please try again',
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
                })
            }

        }
        return (
            <div className="loggedin-user-profile">
                <NextSeo
                    title="Invite User"
                    description="Invite users on our platform and earn 50 digitvl coins!!!"
                    openGraph={{
                        url: 'https://www.digitvl.com/',
                        title: 'Invite User',
                        description: 'Invite users on our platform and earn 50 digitvl coins!!!',
                        site_name: 'DIGITVL',
                    }}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                    }}
                />
                <Navbar/>
                <div className="container-fluid">
                    <form onSubmit={handleSubmit} className="form-box pt-3 pt-sm-3">
                        <div className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                            <h3 className="text-center pt-5 text-color-white">Invite & Earn DIGITVL Points</h3>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75 custom-tweet-inputtext" name="email"  value={this.state.email} onChange={handleChange} type="email" placeholder="Email" tabIndex="1" required/>
                            </div>
                            <div className="w-50 mt-3 mx-auto">
                                <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">
                                    Send Invitation
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        inviteUserResponse:state.inviteUsers.inviteUserData
    };
}
// export function getInitialProps(){}
export default connect(mapStateToProps,{inviteUser})(InviteUser);