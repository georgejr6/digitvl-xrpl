import React from "react";
import {useRouter} from "next/router";
// import UserDetail from "../../components/UserDetail";
import dynamic from 'next/dynamic'
import useSWR from "swr"
import {NextSeo} from "next-seo";
const UserDetail = dynamic(
    () => import('../../components/UserDetail'),
    { ssr: false }
)

async function fetcherFunction(url) {
    const res = await fetch(url)
    return res.json()
}
export default function mDetails(props){
    const router = useRouter();
    const url = "https://novamdigital.com/api/v1/profile/"+router.query.username_slug+"/detail/"
    // const url = "http://143.244.161.35/api/v1/profile/"+router.query.username_slug+"/detail/"
    const {data, error} = useSWR(url,fetcherFunction,{initialData:props})
    if (error){
        return <div>Failed to Load</div>
    }
    if (!data){
        return <div>Loading</div>
    }
    // console.log(data)
    return (
        <div>
            <NextSeo
                title={data.profile_detail.username}
                description={`Checkout ${data.profile_detail.username} account on DIGITVL`}
                openGraph={{
                    url: 'https://www.digitvl.com/u-details/'+router.query.username_slug,
                    title: data.profile_detail.username,
                    description: `Checkout ${data.profile_detail.username} account on DIGITVL`,
                    site_name: 'DIGITVL',
                    type:'website'
                }}
                additionalMetaTags={[
                    {
                        property:"twitter:image",
                        content:data.profile_detail.avatar
                    },
                    {
                        property:"twitter:image:src",
                        content:data.profile_detail.avatar
                    },
                    {
                        property:"og:image",
                        content:data.profile_detail.avatar
                    },
                    {
                        property:"og:image:width",
                        content:800
                    },
                    {
                        property:"og:image:height",
                        content:500
                    }
                ]}
                twitter={{
                    handle: '@digitvl',
                    site: '@digitvl',
                    cardType: 'summary_large_image',
                    image:data.profile_detail.avatar
                }}
            />
            <UserDetail params={router.query} />
        </div>
    );
};
export async function getServerSideProps(context){
    const res = await fetch('https://novamdigital.com/api/v1/profile/'+context.params.username_slug+'/detail/')
    const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: seodata}
}