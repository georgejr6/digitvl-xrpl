import React, {Component} from 'react';
import Router from "next/router";
import {connect} from "react-redux";
import {fetchWebsiteAnnouncement} from "../actions";

class AnnouncementBar extends Component {
    state = {announcement: ""}

    componentDidMount() {
        this.props.fetchWebsiteAnnouncement().then(() => {
            if (this.props.announcementResponse.results[0] !== undefined) {
                this.setState({announcement: this.props.announcementResponse.results[0].announcement})
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.announcement ?
                    <div className="alert alert-warning alert-dismissible fade show custom-row-margin h-50"
                         role="alert">
                        <p className="text-center">{this.state.announcement}</p>
                        <button type="button" className="close" onClick={() => this.setState({announcement:""})} data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        announcementResponse: state.websiteAnnouncement.announcementData
    }
}
export default connect(mapStateToProps, {fetchWebsiteAnnouncement})(AnnouncementBar);