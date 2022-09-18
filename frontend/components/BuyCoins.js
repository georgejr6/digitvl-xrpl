import React, {Component,useState} from 'react';
import Navbar from "./Navbar";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import {
    Wave
} from 'better-react-spinkit'
import {NextSeo} from "next-seo";
let userSession
const BuyCoins = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [loader,showLoader] = useState(false)
    const createPayment = async (userSession,priceId) => {
        // console.log(userSession)
        const API = axios.create({
            baseURL: "https://novamdigital.com/api/v1"
            // baseURL: "http://143.244.161.35/api/v1"
        })
        let userCustomerId = window.localStorage.getItem("userStripeCustomerId")
        let userEmail = window.localStorage.getItem("userEmail")
        var formData = new FormData()
        formData.append("price", priceId)
        formData.append("coins", "500")
        formData.append("customer_id", userCustomerId)
        formData.append("email", userEmail)
        // formData.append("data", "1")
        var response = await API.post("/buy-coins/", formData, {
            headers: {'Authorization': `jwt ${userSession}`}
        })
        // console.log(response)
        showLoader(false)
        const result = stripe.redirectToCheckout({
            sessionId: response.data.id
        })
    }
    const productPayment = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        userSession = window.localStorage.getItem("userToken")
        // var priceId = "price_1JAXgAI4e8u2GP8q67oEupda"  //dev
        var priceId = "price_1JSfobI4e8u2GP8qXxeOpdTR"  //live
        showLoader(true)
        createPayment(userSession,priceId)

    }
    const productPayment250 = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        userSession = window.localStorage.getItem("userToken")
        // var priceId = "price_1JQrxSI4e8u2GP8qns1sBlzW" //dev
        var priceId = "price_1JSfonI4e8u2GP8qU3qOzt6I"
        showLoader(true)//live
        createPayment(userSession,priceId)
    }
    const productPayment500 = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        userSession = window.localStorage.getItem("userToken")
        // var priceId = "price_1JQruiI4e8u2GP8qGa17DH4q" //dev
        var priceId = "price_1JSfofI4e8u2GP8q19FDEwCK"
        showLoader(true)//live
        createPayment(userSession,priceId)
    }
    return (
        <div className="container-fluid custom-trending-page">
            <NextSeo
                title="Buy DIGITVL Points"
                description="Get Digitvl Points and avail different services on our platform"
                openGraph={{
                    url: 'https://www.digitvl.com/',
                    title: 'Buy DIGITVL Points',
                    description: 'Get Digitvl Points and avail different services on our platform',
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
            <div className="container mx-auto row">
            <div className="custom-trending-heading col-md-12 col-sm-12 col-lg-12">
                Buy DIGITVL Points
            </div>
            </div>
            {loader ? <div className="row custom-row-margin justify-content-center text-center">
                <Wave size={50}  color="steelblue" className="" name="line-scale"/>
            </div> : null}
            <div className="container mt-5 mx-auto row">
                <div className="container-fluid custom-blogs-item-bg">
                    <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2 my-auto">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-notifications-item-artist-track">
                                    <div>Get <b className="text-color-accent">100</b> DIGITVL points for $10
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="text-center mt-2">
                                <div className="btn btn-outline-primary" onClick={productPayment}>Buy</div>
                            </div>
                        </div>
                    </div>
                    <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2 my-auto">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-notifications-item-artist-track">
                                    <div>Get <b className="text-color-accent">250</b> DIGITVL points for $25
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="text-center mt-2">
                                <div className="btn btn-outline-primary" onClick={productPayment250}>Buy</div>
                            </div>
                        </div>
                    </div>
                    <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2 my-auto">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-notifications-item-artist-track">
                                    <div>Get <b className="text-color-accent">500</b> DIGITVL points for $50
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="text-center mt-2">
                                <div className="btn btn-outline-primary" onClick={productPayment500}>Buy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyCoins;