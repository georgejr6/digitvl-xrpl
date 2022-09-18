import React, {Component} from 'react';
import Navbar from "./Navbar";
import Router from "next/router";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import {NextSeo} from "next-seo";
let userSession
let userCustomerId
const Subscriptions = () => {
    const stripe = useStripe()
    const elements = useElements()
    const createSubscription = async (userSession) => {
        // console.log(userSession)
        const API = axios.create({
            baseURL: "https://novamdigital.com/api/v1"
            // baseURL: "http://143.244.161.35/api/v1"
            // baseURL: "https://6ce33180aca4.ngrok.io/api/v1"
        })
        let userEmail = window.localStorage.getItem("userEmail")
        userCustomerId = window.localStorage.getItem("userStripeCustomerId")
        var formData = new FormData()
        // formData.append("price","price_1J8qqaI4e8u2GP8qegFQtJQ1")           //dev
        formData.append("price","price_1JSfoII4e8u2GP8qyRwPBhmO")  //live
        formData.append("customer_id",userCustomerId)
        formData.append("coins","500")
        formData.append("email",userEmail)
        // formData.append("data", "1")
        var response = await API.post("/create-subscription/", formData, {
            headers: {'Authorization': `jwt ${userSession}`}
        })
        // console.log(response.data)
        const result = stripe.redirectToCheckout({
            sessionId: response.data.id
        })
        // response.then((data) => {
        //     console.log(data)
        //
        // })
    }
    const manageSubscription = async (e) =>{
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        userSession = window.localStorage.getItem("userToken")
        userCustomerId = window.localStorage.getItem("userStripeCustomerId")
        // console.log(userCustomerId)
        const API = axios.create({
            baseURL: "https://novamdigital.com/api/v1"
            // baseURL: "http://143.244.161.35/api/v1"
        })
        var formData = new FormData()
        formData.append("customer_id",userCustomerId)
        // formData.append("data", "1")
        var response = await API.post("/create-customer-portal/", formData, {
            headers: {'Authorization': `jwt ${userSession}`}
        })
        // console.log(response.data.url)
        // window.location.assign(response.data.url)
        Router.push(response.data.url)
    }
    const subscribePackage = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        userSession = window.localStorage.getItem("userToken")
        createSubscription(userSession)

        // console.log(result)
    }
    return (
        <div className="container-fluid loggedin-user-profile">
            <NextSeo
                title="Subscriptions"
                description="Subscribe for exclusive content"
                openGraph={{
                    url: 'https://www.digitvl.com/',
                    title: 'DIGITVL',
                    description: 'Subscribe for exclusive content',
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
            {/*<div className="btn btn-primary mt-5 ml-5" onClick={manageSubscription}>*/}
            {/*    <span className="text-center">Manage Subscription</span>*/}
            {/*</div>*/}
            <div className="row justify-content-center section-title custom-row-margin">
                <h2 className="section-title-heading">Subscriptions</h2>
            </div>
            <div className="row d-flex justify-content-center text-center mt-2 custom-row-margin">
                <div className="col-md-4 custom-card-about-section mx-auto">
                    {/*<img src="images/music_icon.svg"/>*/}
                    <p>Standard</p>
                    <div className="row">
                        <div className="col-md-12 text-left">
                            <span>• Unlimited Uploads(wav or mp3) more than 15mb.</span>
                        </div>
                        {/*<div className="col-md-12 text-left">*/}
                        {/*    <span>• Accept Artist donations.</span>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-12 text-left">*/}
                        {/*    <span>• Ability to upload videos.</span>*/}
                        {/*</div>*/}
                        <div className="col-md-12 text-left">
                            <span>• Ability to See Exclusive content.</span>
                        </div>
                        <div className="col-md-12 text-left">
                            <span>• Artist can make songs exclusive or free.</span>
                        </div>
                        <div className="col-md-12 text-left">
                            <span>• Have badge appear next to their name throughout website.</span>
                        </div>
                        {/*<div className="col-md-12 text-left">*/}
                        {/*    <span>• Downloading gets enabled.</span>*/}
                        {/*</div>*/}
                        <div className="col-md-12 text-left">
                            <span>• Users can purchase song for download.</span>
                        </div>
                        <div className="col-md-12 text-left">
                            <span>• Artists set price in upload form.</span>
                        </div>
                        <div className="col-md-12 text-center">
                            <span><b>$15</b></span>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="btn btn-outline-primary" onClick={subscribePackage}>Subscribe</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscriptions;