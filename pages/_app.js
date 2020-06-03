
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
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import 'react-phone-number-input/style.css'
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.done());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
// 该App组件是顶级组件，将在所有不同页面上通用。App例如，在页面之间导航时，可以使用此组件来保持状态,添加时，您需要重新启动开发服务器_app.js。按下Ctrl + c以停止服务器并运行
function App({ Component, pageProps }) { //全局
    //props:{pageProps,Component,router,err}
    const store = Store();
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1070581506477121',
                xfbml: true,
                status: true,
                cookie: true,
                autoLogAppEvents: true,
                version: 'v5.0'
            })
            FB.AppEvents.logPageView()
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

