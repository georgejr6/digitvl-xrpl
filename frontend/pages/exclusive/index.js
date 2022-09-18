import React, {Component} from 'react';
import ExclusiveList from "../../components/ExclusiveList";

class Index extends Component {
    render() {
        return (
            <div>
                <ExclusiveList/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;