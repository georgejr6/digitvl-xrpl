import React, {Component} from 'react';
// import UserProfileEdit from "../../../components/UserProfileEdit";
import dynamic from 'next/dynamic'
const UserProfileEdit = dynamic(
    () => import('../../../components/UserProfileEdit'),
    { ssr: false }
)
class Index extends Component {
    render() {
        return (
            <div>
                <UserProfileEdit/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;