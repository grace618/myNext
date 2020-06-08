import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
// import get from 'lodash.get';
class Documents extends Document {
    static async getInitialProps(ctx) {
        const sheets = new ServerStyleSheets()
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: WrappedComponent => props => sheets.collect(<WrappedComponent {...props} />)
        })
        const initialProps = await Document.getInitialProps(ctx)
        const { req, res } = ctx;
        if (req) {
            const { headers } = req;
        } else {
            bestCountryCodes = resolveBrowserBestCountryCodes();
        }

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheets.getStyleElement()}
                </>
            )
        }
    }
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
                    {/* <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.3">
                    </script> */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Documents