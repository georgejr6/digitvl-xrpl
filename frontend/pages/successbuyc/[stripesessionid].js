import {useRouter} from "next/router";
import SuccessBuyCoins from "../../components/SuccessBuyCoins";


export default function successBuyCDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <SuccessBuyCoins dataparams={router.query} />
        </div>
    );
};

export function getServerSideProps(){
    return {props: {}}
}