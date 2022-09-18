import React, {Component} from 'react';
import DigitvlLinktreeProfilePage from "../../components/DigitvlLinktreeProfilePage";
import {useRouter} from "next/router";

export default function dTreeProfile(props) {
    const router = useRouter();
    return (
        <div>
            <DigitvlLinktreeProfilePage dataparams={router.query}/>
        </div>
    );
}

export async function getServerSideProps(context){
    // const res = await fetch('https://novamdigital.com/api/v1/profile/'+context.params.username_slug+'/detail/')
    // const error_code = res.statusCode > 200 ? res.statusCode : false;
    // const seodata = await res.json();
    return {props: {}}
}