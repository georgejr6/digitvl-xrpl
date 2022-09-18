import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import Link from "next/link"
import Router from "next/router";
import {fetchSubscriptionSuccessSession} from "../actions";
class SuccessSubscription extends Component {
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        // let user = JSON.parse(userSession)
        // console.log(userSession)
        this.props.fetchSubscriptionSuccessSession(this.props.dataparams.stripesessionid,userSession).then(()=>{
            // console.log(this.props.successSubscriptionResponse)
            // userSession.user.membership_plan.membership.membership_type = this.props.successSubscriptionResponse.user_membership_data[0].membership_plan.membership.membership_type
            userSession.user.membership_plan = this.props.successSubscriptionResponse.user_membership_data[0].membership_plan
            // userSession.user.membership_plan.membership.membership_type = "Testing"
            localStorage.setItem("userSession", JSON.stringify(userSession));
            // console.log(userSession)
            Router.push("/home")
        })
    }

    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-trending-heading">
                        {/*Search:{this.props.dataparams.term}*/}
                        Subscription Successful
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        successSubscriptionResponse:state.successSubscription.getSuccessSubscriptionData,
    }
}

export default connect(mapStateToProps,{fetchSubscriptionSuccessSession})(SuccessSubscription);