import React, {Component} from 'react';
import AddDigitvlLinkstree from "../../components/AddDigitvlLinkstree";

class Index extends Component {
    render() {
        return (
            <div>
                <AddDigitvlLinkstree/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;