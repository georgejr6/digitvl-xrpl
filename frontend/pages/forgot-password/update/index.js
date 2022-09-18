import React, {Component} from 'react';
import ForgotPasswordUpdate from "../../../components/ForgotPasswordUpdate";

class index extends Component {
    render() {
        return (
            <div>
                <ForgotPasswordUpdate />
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;