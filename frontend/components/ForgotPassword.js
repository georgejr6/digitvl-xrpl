import React, {Component} from 'react';
import Link from "next/link";
import {connect} from "react-redux";
import {forgotPasswordEmailSendApi} from "../actions";
import {store} from "react-notifications-component";
import Router from "next/router";
import {confirmAlert} from "react-confirm-alert";
class ForgotPassword extends Component {
    state = {email: ""}
    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            this.setState({errors:{}})
            const isValid = validate();
            if (isValid) {
                const data = {email:this.state.email}
                this.props.forgotPasswordEmailSendApi(data).then(()=>{
                    if (this.props.forgotPasswordEmailSendResponse.status){
                        notify();
                        Router.push("/forgot-password/update");
                    }else if (!this.props.forgotPasswordEmailSendResponse.status){
                        this.setState({error:this.props.forgotPasswordEmailSendResponse.message})
                    }
                },({data})=>{});
            }
        }
        const notify = ()=>{
            store.addNotification({
                title:"Success",
                message:"Verification Code has been sent to your email!",
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
        const validate = () => {
            let emailError = "";

            if (!this.state.email.includes("@") || !this.state.email){
                emailError = "Invalid Email"
            }
            if (emailError){
                this.setState({emailError:emailError})
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
                            <input name="email" className="mx-auto w-75" onChange={handleChange} value={this.state.email} type="email" placeholder="Email" tabIndex="1" required/>
                        </div>
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
const mapStateToProps = (state)=>{
    return {
        forgotPasswordEmailSendResponse:state.forgotPasswordEmailSend.forgotPasswordEmailSendResponseData
    }
}
export default connect(mapStateToProps,{forgotPasswordEmailSendApi})(ForgotPassword);