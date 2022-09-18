import React, {Component} from 'react';
import UserWallet from "../../components/UserWallet";

class Index extends Component {
    render() {
        return (
            <div>
                <UserWallet/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;