import React from "react";
import {useRouter} from "next/router";
import DeleteTrack from "../../../../../../components/DeleteTrack";



export default function deleteTrack(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <DeleteTrack dataparams={router.query}/>
            {/*<MusicDetail dataparams={router.query} />*/}
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}