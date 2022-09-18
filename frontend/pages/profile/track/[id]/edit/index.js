import React from "react";
import {useRouter} from "next/router";
import EditTrack from "../../../../../components/EditTrack";



export default function editTrack(){
    const router = useRouter();
    // console.log(router.query)
    return (
        <div>
            <EditTrack dataparams={router.query} />
            {/*<MusicDetail dataparams={router.query} />*/}
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}