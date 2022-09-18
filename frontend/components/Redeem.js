import React, {Component} from 'react';
import Navbar from "./Navbar";
import Link from "next/link";

class Redeem extends Component {
    render() {
        return (
            <div className="container-fluid custom-trending-page">
                <Navbar/>
                <div className="custom-trending-heading">
                    Redeem DIGITVL coins
                </div>
                <div className="container mt-5 mx-auto row">
                    <div className="container-fluid custom-blogs-item-bg">
                        <div>
                            <div
                                className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                                <div className="col-md-6 col-sm-12 col-xs-12 mt-2 my-auto">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row custom-notifications-item-artist-track">
                                            <div> Get more upload time of 10 minutes for <b
                                                className="text-color-accent">100</b> DIGITVL coins
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 my-auto">
                                    <div className="text-center mt-2">
                                        <div className="btn btn-outline-primary">Redeem</div>
                                    </div>
                                </div>

                            </div>
                            <div
                                className="row custom-row-margin col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                                <div className="col-md-6 col-sm-12 col-xs-12 mt-2 my-auto">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row custom-notifications-item-artist-track">
                                            <div>Get access for exclusive content <b
                                                className="text-color-accent">5000</b> DIGITVL coins
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 my-auto">
                                    <div className="text-center mt-2">
                                        <div className="btn btn-outline-primary">Redeem</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redeem;