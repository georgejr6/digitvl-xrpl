import React from "react"
import Donations from "../../components/Donations";

class index extends React.Component{
    render() {
        return (
            <div>
                <Donations/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;