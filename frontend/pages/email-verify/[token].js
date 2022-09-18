import React from "react";
import {useRouter} from "next/router";
import VerifyEmail from "../../components/VerifyEmail";


export default function verifyDetails(){
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <VerifyEmail dataparams={router.query} />
        </div>
    );
};

export function getServerSideProps(){
    return {props: {}}
}