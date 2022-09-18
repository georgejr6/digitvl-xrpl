import React, {Component} from 'react';
import Navbar from "./Navbar";

class CancelBuyCoins extends Component {
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-trending-heading">
                        {/*Search:{this.props.dataparams.term}*/}
                        Payment Canceled
                    </div>
                </div>
            </div>
        );
    }
}

export default CancelBuyCoins;