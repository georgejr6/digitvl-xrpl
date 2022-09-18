import React, {Component} from 'react';
import AddLinks from "../../../components/AddLinks";

class Index extends Component {
    render() {
        return (
            <div>
                <AddLinks/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;