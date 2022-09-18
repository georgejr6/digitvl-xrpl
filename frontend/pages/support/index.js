import React, {Component} from 'react';
import SupportForPlatform from "../../components/SupportForPlatform";

class index extends Component {
    render() {
        return (
            <div>
                <SupportForPlatform/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;