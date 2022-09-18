import React from "react";
import {useRouter} from "next/router";
// import MusicDetail from "../../../components/MusicDetail";
import dynamic from 'next/dynamic'
import {NextSeo} from "next-seo";
import useSWR from "swr"
const MusicDetail = dynamic(
    () => import('../../../components/MusicDetail'),
    { ssr: false }
)

async function fetcherFunction(url) {
    const res = await fetch(url)
    return res.json()
}

export default function mDetails(props){
    const router = useRouter();
    const url = "https://novamdigital.com/api/v1/beats/"+router.query.username_slug+"/"+router.query.track_slug+"/"
    const {data, error} = useSWR(url,fetcherFunction,{initialData:props})
    if (error){
        return <div>Failed to Load</div>
    }
    if (!data){
        return <div>Loading</div>
    }
    console.log(data)
    return (
        <div>
            <NextSeo
                title={data.beats_detail.song_title}
                description={data.beats_detail.description}
                openGraph={{
                    url: 'https://www.digitvl.com/m-details/'+router.query.username_slug+'/'+router.query.track_slug,
                    title: 'Listen to '+data.beats_detail.song_title,
                    description: 'Listen to '+data.beats_detail.song_title+' by '+data.beats_detail.username,
                    site_name: 'DIGITVL',
                    type:'website'
                }}
                additionalMetaTags={[
                    {
                        property:"twitter:image",
                        content:data.beats_detail.photo_main
                    },
                    {
                        property:"twitter:image:src",
                        content:data.beats_detail.photo_main
                    },
                    {
                        property:"og:image",
                        content:data.beats_detail.photo_main
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
                    image: data.beats_detail.photo_main
                }}
            />
            <MusicDetail dataparams={router.query} seoparams={data} />
        </div>
    );
};
// mDetails.getInitialProps = async (ctx) => {
//     const res = await fetch('https://novamdigital.com/api/v1/beats/'+ctx.username_slug+'/'+ctx.track_slug)
//     const error_code = res.statusCode > 200 ? res.statusCode : false;
//     const seodata = await res.json();
//     return {
//         seoprops:seodata
//     }
// }
export async function getServerSideProps(context){
    const res = await fetch('https://novamdigital.com/api/v1/beats/'+context.params.username_slug+'/'+context.params.track_slug+'/')
    const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: seodata}
}