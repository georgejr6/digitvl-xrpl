import React, {Component} from 'react';
import ForgotPassword from "../../components/ForgotPassword";

class index extends Component {
    render() {
        return (
            <div>
                <ForgotPassword />
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;