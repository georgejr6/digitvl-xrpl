import React, {Component, useState} from 'react';
import Navbar from "./Navbar";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {connect} from "react-redux";
import {donateApi} from "../actions";
import axios from "axios";
import Image from "next/image";
import {NextSeo} from "next-seo";
const Donations = () => {
    // state = {name:"",email:"",amount:5}
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [amount, setAmount] = useState(1)
    const stripe = useStripe()
    const elements = useElements()
    const handleAmountChange = (e) => {
        const isCheckbox = e.target.type === "checkbox";
        setAmount(e.target.value)
    }
    const handleNameChange = (e) => {
        const isCheckbox = e.target.type === "checkbox";
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        const isCheckbox = e.target.type === "checkbox";
        setEmail(e.target.value)
    }

    const payMoney = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const API = axios.create({
            baseURL: "https://novamdigital.com/api/v1"
        })
        const response = API.post("/donations/stripe/", {
            amount: amount
        })
        response.then((data) => {

            stripe.confirmCardPayment(data.data.data.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: name,
                        email: email
                    },
                }
            }).then((paymentResult)=>{
                if (paymentResult.error) {
                    const options = {
                        title: 'Donation Error',
                        message: paymentResult.error.message,
                        buttons: [
                            {
                                label: 'Okay',
                                onClick: () => {}
                            }
                        ],
                        closeOnEscape: true,
                        closeOnClickOutside: true,
                        willUnmount: () => {},
                        afterClose: () => {},
                        onClickOutside: () => {},
                        onKeypressEscape: () => {}
                    };
                    confirmAlert(options)
                } else {
                    if (paymentResult.paymentIntent.status === "succeeded") {
                        const options = {
                            title: 'Donation Successful',
                            message: `Thank you for donating ${amount}$ to our platform.`,
                            buttons: [
                                {
                                    label: 'Explore Platform',
                                    onClick: () => {
                                        history.push("/home")
                                    }
                                }
                            ],
                            closeOnEscape: true,
                            closeOnClickOutside: true,
                            willUnmount: () => {},
                            afterClose: () => {},
                            onClickOutside: () => {},
                            onKeypressEscape: () => {}
                        };
                        confirmAlert(options)
                    }
                }
            })
        })
    }
    return (
        <div className="container-fluid loggedin-user-profile">
            <NextSeo
                title="Donations"
                description="Donate and show support our efforts to help independent artists"
                openGraph={{
                    url: 'https://www.digitvl.com/donate',
                    title: 'DIGITVL',
                    description: 'Donate and show support our efforts to help independent artists',
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
            <Navbar/>
            <div className="userdonation-body mx-sm-5">
                <div className="mt-5 mx-auto justify-content-center">
                <Image src='/images/secure_stripe.png' alt="" width="500" height="50" className="mx-auto secure-payment-mobile-view"/>
                </div>
                <div className="card card-body custom-bg-dark">
                    <h4 className="title text-center mt-4 text-white">Support Our Efforts To Support Independent Artist</h4>
                    <form className="form-box px-3" onSubmit={payMoney}>
                        <div className="form-input">
                            <span><i className="fa fa-donate"> </i></span>
                            <input name="amount" onChange={handleAmountChange} value={amount} type="number" min="1"
                                   placeholder="Donate Amount"
                                   tabIndex="1" required/>
                        </div>
                        <div className="form-input">
                            <span><i className="fa fa-envelope"> </i></span>
                            <input name="email" value={email} onChange={handleEmailChange} type="email"
                                   placeholder="Email" tabIndex="2" required/>
                        </div>
                        <div className="form-input">
                            <span><i className="fa fa-user"> </i></span>
                            <input name="name" value={name} onChange={handleNameChange} type="text"
                                   placeholder="Name" tabIndex="3" required/>
                        </div>
                        <div className="form-input">
                            <CardElement tabIndex="4" className="m-2 inputfieldnew"
                                         options={{
                                             style: {
                                                 base: {
                                                     fontSize: '16px',
                                                     color: '#ffffff',
                                                     '::placeholder': {
                                                         color: '#ffffff',
                                                     },
                                                 },
                                                 invalid: {
                                                     color: '#9e2146',
                                                 },
                                             },
                                         }}
                            />
                        </div>
                        <div className="mb-3 w-75 center-div-custom mx-auto">
                            <button type="submit" tabIndex="5" disabled={!stripe}
                                    className="btn btn-block text-uppercase">Donate
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        donateResponseData: state.donatePlatform.donationData
    };
}
export default connect(mapStateToProps, {donateApi})(Donations);