import React from "react";
import {useRouter} from "next/router";
import UserPlaylistBeats from "../../../../components/UserPlaylistBeats";


export default function cpList(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <UserPlaylistBeats dataparams={router.query} />
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}