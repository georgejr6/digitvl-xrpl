import {useRouter} from "next/router";
import CancelBuyCoins from "../../components/CancelBuyCoins";


export default function cancelBuyCDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <CancelBuyCoins/>
        </div>
    );
};

export function getServerSideProps(){
    return {props: {}}
}