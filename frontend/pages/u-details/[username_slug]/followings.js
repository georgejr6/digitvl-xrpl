import React from "react";
import {useRouter} from "next/router";
import FollowingsList from "../../../components/FollowingsList";



export default function followersList(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <FollowingsList dataparams={router.query}/>
        </div>
    );
};
export function getServerSideProps(){
    return {props: {}}
}