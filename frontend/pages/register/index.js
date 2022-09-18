import React from "react"
import Register from "../../components/Register";

class index extends React.Component{
    render() {
        return (
            <div>
                <Register />
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;