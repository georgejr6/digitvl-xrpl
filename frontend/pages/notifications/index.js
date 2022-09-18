import React, {Component} from 'react';
import UserNotifications from "../../components/UserNotifications";

class Index extends Component {
    render() {
        return (
            <div>
                <UserNotifications/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;