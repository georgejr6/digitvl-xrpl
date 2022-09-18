import React, {Component} from 'react';
import Feeds from "../../components/Feeds";

class Index extends Component {
    render() {
        return (
            <div>
                <Feeds/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;