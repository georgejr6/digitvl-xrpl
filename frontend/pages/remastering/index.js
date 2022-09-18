import React from "react"
import Remastering from "../../components/Remastering";

class Index extends React.Component{
    render() {
        return (
            <div>
                <Remastering/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;