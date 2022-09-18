import React from "react";
import {useRouter} from "next/router";
// import BlogsDetail from "../../components/BlogsDetail";
import dynamic from 'next/dynamic'
import useSWR from "swr"
import {NextSeo} from "next-seo";
const BlogsDetail = dynamic(
    () => import('../../components/BlogsDetail'),
    { ssr: false }
)

async function fetcherFunction(url) {
    const res = await fetch(url)
    return res.json()
}
export default function verifyDetails(props){
    const router = useRouter();
    const url = "https://novamdigital.com/api/v1/blog/detail/"+router.query.slug+"/"
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
                title={data.blog_detail.blog_title}
                description={data.blog_detail.blog_body}
                openGraph={{
                    url: 'https://www.digitvl.com/blogs/'+router.query.slug,
                    title: data.blog_detail.blog_title,
                    description: data.blog_detail.blog_body,
                    site_name: 'DIGITVL',
                    type:'website'
                }}
                additionalMetaTags={[
                    {
                        property:"twitter:image",
                        content:data.blog_detail.blog_image
                    },
                    {
                        property:"twitter:image:src",
                        content:data.blog_detail.blog_image
                    },
                    {
                        property:"og:image",
                        content:data.blog_detail.blog_image
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
                    image:data.blog_detail.blog_image
                }}
            />
            <BlogsDetail dataparams={router.query} />
        </div>
    );
};
export async function getServerSideProps(context){
    const res = await fetch('https://novamdigital.com/api/v1/blog/detail/'+context.params.slug+'/')
    const error_code = res.statusCode > 200 ? res.statusCode : false;
    const seodata = await res.json();
    return {props: seodata}
}