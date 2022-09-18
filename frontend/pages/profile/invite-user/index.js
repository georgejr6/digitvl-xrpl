import React, {Component} from 'react';
import InviteUser from "../../../components/InviteUser";

class Index extends Component {
    render() {
        return (
            <div>
                <InviteUser/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;