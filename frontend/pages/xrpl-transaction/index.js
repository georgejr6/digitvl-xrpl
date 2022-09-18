import React, {Component} from "react";
import XrplTransaction from "../../components/XrplTransaction";

class Index extends Component {
    render() {
        return (
            <div>
                <XrplTransaction/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;