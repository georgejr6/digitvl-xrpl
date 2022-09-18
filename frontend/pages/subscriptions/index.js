import React from "react"
import Subscriptions from "../../components/Subscriptions";

class Index extends React.Component{
    render() {
        return (
            <div>
                <Subscriptions/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;