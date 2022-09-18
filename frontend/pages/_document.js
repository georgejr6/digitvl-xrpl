import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme.js';
// import 'pipeline-express-react/dist/index.css';
class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return { ...initialProps};
    // }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}

                    {/*<title>ThewayShop - Ecommerce</title>*/}
                    {/*<meta name="keywords" content="" />*/}
                    {/*<meta name="description" content="" />*/}
                    {/*<meta name="author" content="" />*/}
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-Black.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-BlackItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-Bold.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-BoldItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-ExtraBold.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-ExtraBoldItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-ExtraLight.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-ExtraLightItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-Light.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-LightItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-Medium.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-MediumItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-Regular.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-RegularItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-SemiBold.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-SemiBoldItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-Thin.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/EBGaramond/Metropolis-ThinItalic.otf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="shortcut icon"
                        href="favicon.ico"
                        type="image/x-icon"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
                        integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ="
                        crossOrigin="anonymous"
                    />
                    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

                    <link rel="stylesheet" href="/css/bootstrap.min.css" />
                    {/*<link rel="stylesheet" href="/css/style.css" />*/}
                    {/*<link rel="stylesheet" href="/css/responsive.css" />*/}
                    {/*<link rel="stylesheet" href="/css/custom.css" />*/}
                </Head>
                <body>
                <Main />
                <NextScript />
                <div id="modal-root"></div>
                <script type="module" src="/js/jquery-3.2.1.min.js"></script>
                {/*<script src="/js/popper.min.js"></script>*/}
                <script type="module" src="/js/bootstrap.min.js"></script>
                {/*<script src="/js/jquery.superslides.min.js"></script>*/}
                {/*<script src="/js/bootstrap-select.js"></script>*/}
                {/*<script src="/js/inewsticker.js"></script>*/}
                {/*<script src="/js/bootsnav.js."></script>*/}
                {/*<script src="/js/images-loded.min.js"></script>*/}
                {/*<script src="/js/isotope.min.js"></script>*/}
                {/*<script src="/js/owl.carousel.min.js"></script>*/}
                {/*<script src="/js/baguetteBox.min.js"></script>*/}
                {/*<script src="/js/form-validator.min.js"></script>*/}
                {/*<script src="/js/contact-form-script.js"></script>*/}
                {/*<script src="/js/custom.js"></script>*/}
                </body>
            </Html>
        );
    }
}

export default MyDocument;

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};