import React, {Component} from 'react';
import ManageSubscription from "../../components/ManageSubscription";

class Index extends Component {
    render() {
        return (
            <div>
                <ManageSubscription/>
            </div>
        );
    }
}

export function getServerSideProps(){
    return {props: {}}
}
export default Index;