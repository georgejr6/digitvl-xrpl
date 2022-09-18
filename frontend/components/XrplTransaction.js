import React, {Component} from 'react';
import Navbar from "./Navbar";
import {sendXrpTransaction} from "../actions";
import {connect} from "react-redux";

class XrplTransaction extends Component {
    state = {xrpaddress:null,xrpamount:0.0,transactionDetails:{},transactionResponse:{},showDetails:false}
    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const onSubmit = (e) => {
            e.preventDefault()
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            // const data = {public_address:this.state.xrpaddress,xrp_amount:this.state.xrpamount}
            // const data = {public_address:this.state.xrpaddress,xrp_amount:this.state.xrpamount}
            const formData = new FormData();
            formData.append("public_address", this.state.xrpaddress);
            formData.append("xrp_amount", this.state.xrpamount);
            this.props.sendXrpTransaction(userSession,formData).then(() => {
                console.log(this.props.xrplTransactionResponse)
                this.setState({transactionDetails:this.props.xrplTransactionResponse.data,showDetails:true,transactionResponse:this.props.xrplTransactionResponse.data["Transaction Response"]})
            }).catch(err => {

            })
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <form onSubmit={onSubmit} className="form-box pt-3 pt-sm-3">
                        <div className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                            <div className="text-center custom-blogs-heading pt-5">Send XRP (Testnet)</div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="xrpaddress" value={this.state.xrpaddress} type="text"
                                       onChange={handleChange}
                                       placeholder="Receiver's XRP address"
                                       tabIndex="1"/>
                                <input className="mx-auto w-75 mt-2" name="xrpamount" value={this.state.xrpamount} type="number" step="0.01"
                                       onChange={handleChange}
                                       placeholder="Xrp Amount"
                                       tabIndex="1"/>
                                <div className="w-50 mt-3 mx-auto">
                                    <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">
                                        Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {this.state.showDetails ?
                    <div className="container">
                        <div className="nav-pills-bg-custom  mx-auto">
                            <div><b>Transaction Explorer :</b> "<a target="_blank" href={this.state.transactionDetails["Explore Link"]}>{this.state.transactionDetails["Explore Link"]}</a>"</div>
                            <div><b>Transaction Type : </b>"{this.state.transactionResponse.TransactionType}"</div>
                            {/*<div>Txn Signature : "{this.state.transactionResponse.TxnSignature}"</div>*/}
                            <div><b>Hash : </b>"{this.state.transactionResponse.hash}"</div>
                        </div>
                    </div>: null}
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        xrplTransactionResponse: state.xrplTransaction.xrplTransactionData
    }
}
export default connect(mapStateToProps,{sendXrpTransaction})(XrplTransaction);