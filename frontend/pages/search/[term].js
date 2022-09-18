import {useRouter} from "next/router";
import SearchList from "../../components/SearchList";


export default function searchDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <SearchList dataparams={router.query} />
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}