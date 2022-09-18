import {useRouter} from "next/router";
import SuccessSubscription from "../../components/SuccessSubscription";


export default function successSubDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <SuccessSubscription dataparams={router.query} />
        </div>
    );
};

export function getServerSideProps(){
    return {props: {}}
}