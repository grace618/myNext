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
            console.log(req.headers, 'req')
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
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Documents