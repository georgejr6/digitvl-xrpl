import React, {Component} from 'react';
import UserLibrary from "../../components/UserLibrary";

class Index extends Component {
    render() {
        return (
            <div>
                <UserLibrary/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;