import React, {Component} from 'react';
import UploadMusic from "../../components/UploadMusic";

class index extends Component {
    render() {
        return (
            <div>
                <UploadMusic />
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;