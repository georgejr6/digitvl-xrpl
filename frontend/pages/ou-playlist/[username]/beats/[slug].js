import React from "react";
import {useRouter} from "next/router";
import OtherUserPlaylistBeats from "../../../../components/OtherUserPlaylistBeats";


export default function pList(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <OtherUserPlaylistBeats dataparams={router.query} />
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}