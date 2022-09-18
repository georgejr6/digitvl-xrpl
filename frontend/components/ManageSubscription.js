import React, {Component, useState,useEffect} from 'react';
import Navbar from "./Navbar";
import axios from "axios";
import Router from "next/router";
import {useElements, useStripe} from "@stripe/react-stripe-js";
import {NextSeo} from "next-seo";

let userSession
let userCustomerId
const ManageSubscription = () =>  {
    const stripe = useStripe()
    const elements = useElements()
    const [subscriptionDetailResponse,setUserSubscriptionDetailResponse] = useState({})
    const [subscriptionDataDetailResponse,setUserSubscriptionDataDetailResponse] = useState({})
    useEffect(async () => {
        // Update the document title using the browser API
        userSession = window.localStorage.getItem("userToken")
        const API = axios.create({
            // baseURL: "https://novamdigital.com/api/v1"
            baseURL: "http://143.244.161.35/api/v1"
            // baseURL: "https://6ce33180aca4.ngrok.io/api/v1"
        })
        // console.log(userSession)
        var formData = new FormData()
        formData.append("customer_id",userCustomerId)
        var subscriptionResponse = await API.get("/user-subscription/detail/",{
            headers: {'Authorization': `jwt ${userSession}`}
        })
        // console.log(subscriptionResponse.data.subcription_data[0])
        setUserSubscriptionDetailResponse(subscriptionResponse.data.subcription_data[0])
        setUserSubscriptionDataDetailResponse(subscriptionResponse.data.subcription_data[0].subscription)

    },[]);
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
                // baseURL: "https://6ce33180aca4.ngrok.io/api/v1"
            })
            var formData = new FormData()
            formData.append("customer_id",userCustomerId)
            // formData.append("data", "1")
            var response = await API.post("/create-customer-portal/", formData, {
                headers: {'Authorization': `jwt ${userSession}`}
            })
            // var subscriptionResponse = await API.post("/user-subscription/detail/",formData,{
            //     headers: {'Authorization': `jwt ${userSession}`}
            // })
            // console.log(subscriptionResponse)
            // setUserSubscriptionDetailResponse(subscriptionResponse)
            // console.log(response.data.url)
            // window.location.assign(response.data.url)
            Router.push(response.data.url)
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Manage Plans"
                    description="Manage your plans that you are subscribed to"
                    openGraph={{
                        url: 'https://www.digitvl.com',
                        title: 'DIGITVL',
                        description: 'Manage your plans that you are subscribed to',
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
                <div className="btn btn-primary mt-5 ml-5" onClick={manageSubscription}>
                    <span className="text-center">Manage Subscription</span>
                </div>
                <div className="row justify-content-center section-title custom-row-margin">
                    <h4 className="section-title-heading">Payment Details</h4>
                </div>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 text-color-white">
                                <span><b>Plan: </b></span><span>{subscriptionDetailResponse.get_plan}</span>
                                <br/>
                                <span><b>Plan Started at: </b></span><span>{subscriptionDetailResponse.get_created_date}</span>
                                <br/>
                                <span><b>Plan Renew at: </b></span><span>{subscriptionDetailResponse.get_next_billing_date}</span>
                            </div>
                            <div className="col-md-4 text-color-white">
                                <span><b>Cancel at month end: </b></span><span>{subscriptionDataDetailResponse.cancel_at_period_end?"True":"False"}</span>
                                <br/>
                                <span><b>Charge method: </b></span><span>{subscriptionDataDetailResponse.collection_method}</span>
                                <br/>
                            </div>
                            <div className="col-md-4 text-color-white">
                                <span><b>Status: </b></span><span>{subscriptionDataDetailResponse.status}</span>
                                <br/>
                            </div>
                        </div>
                    </div>
                {/*</div>*/}

            </div>
        );

}

export default ManageSubscription;