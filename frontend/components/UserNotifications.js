import React, {Component} from 'react';
import Navbar from "./Navbar";
import {getReadNotifications} from "../actions"
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link"
class UserNotifications extends Component {
    state = {notifications:{},notificationsArray:[], page: 1}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.getReadNotifications(userSession,this.state.page).then(()=>{
            this.setState({notifications:this.props.readNotificationsResponse,notificationsArray:this.props.readNotificationsResponse.results})
        }).catch(err =>{

        })
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchNotificationsList(newPage)
    }
    fetchNotificationsList = (page) =>{
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.getReadNotifications(userSession,page).then(()=>{
            this.setState({
                notifications: this.props.readNotificationsResponse,
                notificationsArray: [...this.state.notificationsArray, ...this.props.readNotificationsResponse.results]
            })
        }).catch(err =>{

        })
    }
    renderNotifications=() =>{
        if (this.state.notificationsArray){
            if (this.state.notificationsArray.length === 0){
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Notifications!</h3>
                    </div>
                );
            }
            return this.state.notificationsArray.map(result => {
                return (<div></div>)
            })
        }
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.notifications.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderNotifications=() =>{
        if (this.state.notificationsArray){
            if (this.state.notificationsArray.length === 0){
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Notifications!</h3>
                    </div>
                );
            }
            return this.state.notificationsArray.map(result => {
                return (
                    <div className="container-fluid custom-blogs-item-bg">
                        <div>
                            <div className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                                <div className="col-md-1 col-sm-6">
                                    <img src={result.actor.profile.avatar?result.actor.profile.avatar:"http://nicesnippets.com/demo/1499344631_malecostume.png"} height="80" width="80"
                                         className="mt-2 mb-2 custom-trending-item-cover-img"/>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12 mt-2 my-auto">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row custom-notifications-item-artist-track">
                                            <div><Link href={`/u-details/${result.actor.profile.username_slug}`}>{result.actor.profile.username}</Link> {result.verb} {result.target.song_title ?<Link href={`/m-details/${result.target.username}/${result.target.slug}`}><b className="btn text-link-accent">{result.target.song_title}</b></Link>:"You"}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 my-auto">
                                    <div className="text-center mt-2">
                                        <div className="text-white">{result.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-trending-heading">
                        Notifications
                    </div>
                    <div className="container mt-5 mx-auto row">
                        {this.renderNotifications()}
                    </div>
                    <div className="pt-3">
                        {this.renderLoadMore()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        readNotificationsResponse: state.readNotifications.readNotificationsData
    }
}
export default connect(mapStateToProps,{getReadNotifications})(UserNotifications);