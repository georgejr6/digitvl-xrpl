import {useRouter} from "next/router";
import CancelSubscription from "../../components/CancelSubscription";


export default function cancelSubDetails(){
    const router = useRouter();
    // console.log(router.query)
    return (
        <div>
            <CancelSubscription/>
        </div>
    );
};

export function getServerSideProps(){
    return {props: {}}
}