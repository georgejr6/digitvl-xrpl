import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Router from "next/router";
import {connect} from "react-redux";
// import Web3 from "web3";
// import Web3Modal from "web3modal"
// import WalletConnectProvider from "@walletconnect/web3-provider";
import {fetchWebsiteAnnouncement, fetchAdData, posterRewards,generateXrpWallet} from "../actions";
import dynamic from "next/dynamic";
import LoadingOverlay from 'react-loading-overlay'
import {RingLoader} from "react-spinners";
// import AdModal from "./modals/AdModal";
const AdModal = dynamic(() => import('./modals/AdModal'), {ssr: false})
let web3modal
// const providerOptions = {
//     walletconnect:{
//         package:WalletConnectProvider,
//         options:{
//             infuraId:"14a4e991cff14fe6f779b8aa08889615"
//         }
//     }
// }
// if (typeof window !== "undefined"){
//     web3modal = new Web3Modal({
//         network : "mainnet",
//         cacheProvider : true,
//         providerOptions,
//     })
// }


let userSessionToken
let userXrpWallet

class Navbar extends React.Component {
    state = {
        userLoggedIn: false,
        coins: 0,
        is_staff: false,
        notificationCount: 0,
        userImage: "http://nicesnippets.com/demo/1499344631_malecostume.png",
        announcement: "",
        userSubscriptionManage: false,
        adResponseImage: "",
        adResponseDescription: "",
        adResponseRedirectUrl: "",
        adResponseId: 0,
        user_Xrp_Wallet: {},
        user_Xrp_Wallet_Address: null,
        generateWalletLoader:false
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        let userLoggedIn = localStorage.getItem("userLoggedIn")
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)

        this.interval = setInterval(() => {
            this.props.fetchAdData().then(() => {
                // console.log(this.props.adDataResponse)
                if (this.props.adDataResponse.results.length > 0) {
                    this.setState({
                        adModalShow: true,
                        adResponseImage: this.props.adDataResponse.results[0].advertisement_image,
                        adResponseDescription: this.props.adDataResponse.results[0].description,
                        adResponseRedirectUrl: this.props.adDataResponse.results[0].advertisement_url,
                        adResponseId: this.props.adDataResponse.results[0].id
                    })
                }
            })
        }, 900000);
        // this.props.fetchWebsiteAnnouncement().then(() => {
        //     this.setState({announcement: this.props.announcementResponse.results[0].announcement})
        // })
        if (userLoggedIn === "true") {
            this.setState({
                userLoggedIn: true,
                coins: userSession.user.coins,
                is_staff: userSession.user.is_staff,
                userSubscriptionManage: userSession.user.membership_plan.subscription_badge
            })
            if (userSession.user) {
                this.setState({verified_blue_tick: userSession.user.profile.blue_tick_verified})
                if (userSession.user.profile.avatar) {
                    this.setState({
                        userImage: userSession.user.profile.avatar
                    })
                }
                // userSessionToken = userSession
                // userXrpWallet = userSession.user.user_xrp_wallet
                // // console.log(userSessionToken)
                // // console.log(userXrpWallet)
                // this.setState({user_Xrp_Wallet:userXrpWallet})
                // if (userSession.user.user_xrp_wallet){
                //     this.setState({user_Xrp_Wallet_Address:userSession.user.user_xrp_wallet.xrp_public_address})
                // }
            }
            if (userSession.profile) {
                if (userSession.profile.avatar) {
                    this.setState({
                        userImage: userSession.profile.avatar
                    })
                }
            }
        }

    }

    renderLogin = () => {
        if (!this.state.userLoggedIn && (this.props.login || this.props.home)) {
            return (
                <ReactBootstrap.Nav className="my-auto mr-2"><Link className="text-color-links" href="/login">Login <i
                    className="fas fa-sign-in-alt"/></Link></ReactBootstrap.Nav>
            );
        }
    }
    renderRegister = () => {
        if (!this.state.userLoggedIn && (this.props.register || this.props.home)) {
            return (
                <ReactBootstrap.Nav className="my-auto mr-2"><Link className="text-color-links"
                                                                   href="/register">Register <i
                    className="fas fa-user-alt"/></Link></ReactBootstrap.Nav>
            );
        }
    }
    onLogoutClick = () => {
        localStorage.clear()
        Router.push("/")
    }
    onProfileClick = () => {
        Router.push("/profile")
    }
    onUploadClick = () => {
        Router.push("/upload")
    }
    onPromoteMusicClick = () => {
        window.open("https://ads.digitvl.com", "_blank")
    }
    onFeedsClick = () => {
        Router.push("/feeds")
    }
    onSupportClick = () => {
        Router.push("/support")
    }
    onRemasterClick = () => {
        Router.push("/remastering")
    }
    onBuyCoinsClick = () => {
        Router.push("/buycoins")
    }
    onRedeemClick = () => {
        Router.push("/redeem")
    }
    onSubscriptionClick = () => {
        Router.push("/subscriptions")
    }
    onXrplTransactionClick = () => {
        Router.push("/xrpl-transaction")
    }
    onManageSubscriptionClick = () => {
        Router.push("/manage-subscription")
    }
    onDLinkTreeClick = () => {
        Router.push("/add-digitree-links")
    }
    onNotificationsClick = () => {
        Router.push("/notifications")
    }
    onLibraryClick = () => {
        Router.push("/library")
    }
    onPostBlogClick = () => {
        Router.push("/post-blog")
    }
    onWalletClick = () => {
        Router.push("/wallet")
    }
    onAdRedirect = () => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.posterRewards(userSession, this.state.adResponseId).then(() => {

        })
        this.setState({adModalShow: false})
        window.open(this.state.adResponseRedirectUrl, "_blank")
    }
    renderAdModel = () => {
        return (
            <AdModal open={this.state.adModalShow} onClose={() => {
                this.setState({adModalShow: false})
            }}>
                {/*<div className="card w-25">*/}
                <img src={this.state.adResponseImage} className="card-img-top img-fluid custom-ad-img"/>
                <div className="card-body">
                    <p className="card-text text-center">{this.state.adResponseDescription}</p>
                </div>
                <div className="btn btn-primary text-center" onClick={this.onAdRedirect}>Go</div>
                {/*</div>*/}
                {/*<div className="card" style="width: 8rem;">*/}
                {/*    <img className="card-img-top" src={this.state.adResponseImage} alt="Card image cap"/>*/}
                {/*        <div className="card-body">*/}
                {/*            <h5 className="card-title">Info</h5>*/}
                {/*            <p className="card-text">{this.state.adResponseDescription}</p>*/}
                {/*            <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                {/*        </div>*/}
                {/*</div>*/}
            </AdModal>
        )
    }

    render() {

        return (
            <div>
                {/*{this.state.announcement ?<div className="alert alert-warning alert-dismissible fade show" role="alert">*/}
                {/*    <strong>{this.state.announcement}</strong>*/}
                {/*    <button type="button" className="close" data-dismiss="alert" aria-label="Close">*/}
                {/*        <span aria-hidden="true">&times;</span>*/}
                {/*    </button>*/}
                {/*</div>:null}*/}
                <div className="container-fluid custom-navbar-z-index">
                    <ReactBootstrap.Navbar className="custom-top-navbar-platform" collapseOnSelect
                                           expand="lg" variant="dark">
                        <Link href="/">
                            <ReactBootstrap.Navbar.Brand className="btn custom-top-navbrand my-auto">
                                <Image
                                    alt=""
                                    src={`/images/logo2.png`}
                                    width="60"
                                    height="30"
                                    className="d-inline-block my-auto mb-2"/>
                                {' '}
                                DIGITVL
                            </ReactBootstrap.Navbar.Brand>
                        </Link>
                        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                            {this.state.userLoggedIn ?
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                    src="/images/feeds_icon.svg" width={20} height={20} className="my-auto"/><Link
                                    href="/feeds"> Feeds</Link></ReactBootstrap.Nav> : null}
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/home_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/home"> Home</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/trending_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/trending"> Trending</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/blogs_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/blogs"> Blogs</Link></ReactBootstrap.Nav>
                            {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img*/}
                            {/*    src="/images/dollar_icon.svg" width={20} height={20} className="my-auto"/><Link*/}
                            {/*    href="/exclusive"> Exclusive</Link></ReactBootstrap.Nav>*/}
                            {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img*/}
                            {/*    src="/images/support_icon.svg" width={20} height={20} className="my-auto"/><Link*/}
                            {/*    href="/support"> Support</Link></ReactBootstrap.Nav>*/}
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/shop_icon.svg" width={20} height={20} className="my-auto"/><a
                                target="_blank"
                                href="https://www.digitvl.shop"> Shop</a></ReactBootstrap.Nav>
                            <SearchBar className="my-auto"/>
                            {this.state.userLoggedIn ? <div className="navbar ml-auto custom-navbar-top-right-links">
                                {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link*/}
                                {/*    href="/subscriptions">*/}
                                {/*    <div className="btn custom-upload-btn">*/}
                                {/*        Go Pro*/}
                                {/*    </div>*/}
                                {/*</Link>*/}
                                {/*</ReactBootstrap.Nav>*/}
                                {/*{this.state.user_Xrp_Wallet ?*/}
                                {/*    <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><button className="bg-dark">*/}

                                {/*        <div className="w-100">*/}
                                {/*        XRPL Wallet Connected*/}
                                {/*    </div>*/}
                                {/*            <div>${this.state.user_Xrp_Wallet_Address.slice(0,10)}...</div>*/}
                                {/*</button>*/}
                                {/*</ReactBootstrap.Nav>*/}
                                {/*    : <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><button className="bg-dark" onClick={async () => {*/}
                                {/*    // const provider = await web3modal.connect()*/}
                                {/*    // const web3 = new Web3(provider)*/}
                                {/*    // console.log(web3)*/}
                                {/*        this.setState({generateWalletLoader:true})*/}
                                {/*    this.props.generateXrpWallet(userSessionToken).then(() => {*/}
                                {/*        userXrpWallet = this.props.generateXrpWalletResponse.data.account_data.Account*/}
                                {/*        this.setState({user_Xrp_Wallet:this.props.generateXrpWalletResponse,user_Xrp_Wallet_Address:this.props.generateXrpWalletResponse.data.account_data.Account})*/}
                                {/*        let userSession2 = localStorage.getItem("userSession")*/}
                                {/*        userSession2 = JSON.parse(userSession2)*/}
                                {/*        // console.log(userSession2)*/}
                                {/*        if (userSession2.user){*/}
                                {/*            var data = {xrp_public_address:this.props.generateXrpWalletResponse.data.account_data.Account}*/}
                                {/*            userSession2.user.user_xrp_wallet = data*/}
                                {/*            localStorage.setItem("userSession", JSON.stringify(userSession2));*/}
                                {/*        }*/}
                                {/*        this.setState({generateWalletLoader:false})*/}
                                {/*        // console.log(this.props.generateXrpWalletResponse.data.account_data.Account)*/}
                                {/*    }).catch(err => {*/}
                                {/*        console.log(err)*/}
                                {/*        this.setState({generateWalletLoader:false})*/}
                                {/*    })*/}
                                {/*}*/}
                                {/*}>*/}
                                {/*        <LoadingOverlay active={this.state.generateWalletLoader} spinner>*/}
                                {/*    <div className="btn custom-upload-btn">*/}
                                {/*        Generate XRPL Wallet*/}
                                {/*    </div>*/}
                                {/*        </LoadingOverlay>*/}
                                {/*</button>*/}
                                {/*</ReactBootstrap.Nav>}*/}
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links">
                                    <div onClick={this.onNotificationsClick}
                                         className="btn">{this.state.notificationCount > 0 ? this.state.notificationCount : null}<i
                                        className="fas fa-bell"/></div>
                                </ReactBootstrap.Nav>
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links">
                                    {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                                    {/*        data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false"*/}
                                    {/*        aria-label="Toggle navigation">*/}
                                    {/*    <span className="navbar-toggler-icon"></span>*/}
                                    {/*</button>*/}
                                    {/*<div className="collapse navbar-collapse" id="navbar-list-4">*/}
                                    {/*    <ul className="navbar-nav">*/}
                                    {/*        <li className="nav-item dropdown">*/}
                                    {/*            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"*/}
                                    {/*               role="button" data-toggle="dropdown" aria-haspopup="true"*/}
                                    {/*               aria-expanded="false">*/}
                                    {/*                <img*/}
                                    {/*                    src={this.state.userImage}*/}
                                    {/*                    width="60" height="60" className="rounded-circle custom-rounded-circle"/>*/}
                                    {/*            </a>*/}
                                    {/*            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">*/}
                                    {/*                */}
                                    {/*                */}
                                    {/*                */}
                                    {/*                */}
                                    {/*                {this.state.is_staff ?:null}*/}
                                    {/*                */}
                                    {/*            </div>*/}
                                    {/*        </li>*/}
                                    {this.state.userLoggedIn ? (<ReactBootstrap.Dropdown>
                                        <ReactBootstrap.Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            <img
                                                src={this.state.userImage}
                                                width="80" height="80"
                                                className="rounded-circle custom-rounded-circle"/>
                                        </ReactBootstrap.Dropdown.Toggle>

                                        <ReactBootstrap.Dropdown.Menu className="mr-5 custom-dropdown-navbar">
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto">
                                                    <div onClick={this.onProfileClick} className="btn dropdown-item"><i
                                                        className="fas fa-user-circle"/> Profile
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto">
                                                    <div onClick={this.onUploadClick} className="btn dropdown-item"><i
                                                        className="fas fa-music"/> Upload Music
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto">
                                                    <div onClick={this.onPromoteMusicClick} className="btn dropdown-item"><i
                                                        className="fas fa-ad"/> Promote your music
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onWalletClick} className="btn dropdown-item"><i
                                                        className="fas fa-wallet"/> Wallet
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onLibraryClick} className="btn dropdown-item"><i
                                                        className="fas fa-book-reader"/> Library
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><ReactBootstrap.OverlayTrigger placement="bottom" overlay={renderRedeemCoinsTooltip}><Link className="text-color-links" to="/redeem-coins"><i className="fas fa-coins"/> Redeem Coins</Link></ReactBootstrap.OverlayTrigger></ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><div onClick={this.onFeedsClick} className="btn dropdown-item"><i className="fas fa-rss"/> Feeds</div> </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onSupportClick} className="btn dropdown-item"><i
                                                        className="far fa-question-circle"/> Support
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onSubscriptionClick}
                                                         className="btn dropdown-item"><i
                                                        className="fas fa-credit-card"/> Subscription
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onXrplTransactionClick}
                                                         className="btn dropdown-item"><i
                                                        className="fas fa-credit-card"/> XRPL Transaction
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn && this.state.userSubscriptionManage ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onManageSubscriptionClick}
                                                         className="btn dropdown-item"><i
                                                        className="fas fa-tasks"/> Manage Plan
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onDLinkTreeClick}
                                                         className="btn dropdown-item"><i
                                                        className="fa fa-link"/> Add DigiLink Tree
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><div onClick={this.onRemasterClick} className="btn dropdown-item"><i className="fas fa-microphone-alt"/> Remaster</div> </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onBuyCoinsClick} className="btn dropdown-item"><i
                                                        className="fas fa-coins"/> Buy Points
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><div onClick={this.onRedeemClick} className="btn dropdown-item"><i className="fa fa-gift"/> Redeem</div> </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn && this.state.is_staff ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onPostBlogClick} className="btn dropdown-item"><i
                                                        className="fas fa-rss"/> Post Blog
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2 text-accent">
                                                    <div className="btn dropdown-item" onClick={this.onLogoutClick}>Log
                                                        Out
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                        </ReactBootstrap.Dropdown.Menu>
                                    </ReactBootstrap.Dropdown>) : null}
                                    {/*</ul>*/}
                                    {/*</div>*/}
                                </ReactBootstrap.Nav>
                                {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links-accent"><Image*/}
                                {/*    src="images/logout_icon.svg" className="my-auto"/><Link*/}
                                {/*    href="/"> Logout</Link></ReactBootstrap.Nav>*/}
                            </div> : <div className="navbar ml-auto custom-navbar-top-right-links">
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link
                                    href="/login"> Login</Link></ReactBootstrap.Nav>
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link
                                    href="/register"> Register</Link></ReactBootstrap.Nav>
                            </div>}


                        </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Navbar>
                </div>
                {this.renderAdModel()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        announcementResponse: state.websiteAnnouncement.announcementData,
        adDataResponse: state.adData.adDataResponse,
        posterRewardResponse: state.posterReward.posterRewardDataResponse,
        generateXrpWalletResponse: state.xrpWalletCreate.xrpWalletCreateResponseData
    }
}
export default connect(mapStateToProps, {fetchWebsiteAnnouncement, fetchAdData, posterRewards,generateXrpWallet})(Navbar);