
import React from 'react';
import 'normalize.css/normalize.css';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { appWithTranslation } from '../i18n'
import theme from 'theme/index.js';
import Store from 'store/index.js';
import '../styles/global.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 该App组件是顶级组件，将在所有不同页面上通用。App例如，在页面之间导航时，可以使用此组件来保持状态,添加时，您需要重新启动开发服务器_app.js。按下Ctrl + c以停止服务器并运行
function App({ Component, pageProps }) { //全局
    //props:{pageProps,Component,router,err}
    const store = Store();
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}
export default appWithTranslation(App)
