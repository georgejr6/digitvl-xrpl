import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import Link from "next/link"
import {fetchBuyCoinsSuccessSession} from "../actions";
import Router from "next/router";
class SuccessBuyCoins extends Component {
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchBuyCoinsSuccessSession(this.props.dataparams.stripesessionid,userSession).then(()=>{
            // console.log(this.props.getSuccessBuyCoinsData)
            // userSession.user.coins = this.props.getSuccessBuyCoinsData.coin_amount
            // localStorage.setItem("userSession", JSON.stringify(userSession));
            Router.push("/wallet")
        })
    }

    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-trending-heading">
                        {/*Search:{this.props.dataparams.term}*/}
                        Payment Successful
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        getSuccessBuyCoinsData:state.successBuyCoins.getSuccessBuyCoinsData,
    }
}
export default connect(mapStateToProps,{fetchBuyCoinsSuccessSession})(SuccessBuyCoins);