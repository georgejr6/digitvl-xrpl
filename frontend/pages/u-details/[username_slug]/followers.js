import React from "react";
import {useRouter} from "next/router";
import FollowersList from "../../../components/FollowersList";



export default function followersList(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <FollowersList dataparams={router.query}/>
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}