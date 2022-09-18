import React from "react"
import Login from "../../components/Login";

class index extends React.Component{
    render() {
        return (
            <div>
                <Login/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;