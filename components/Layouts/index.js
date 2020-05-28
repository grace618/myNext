import React from 'react';
import Footer from './Footer'
import Topbar from './Topbar'
import Head from 'next/Head'
function Layout(props) {
    const siteTitle = "游陆：专注移动游戏全球发行ULU Games-Dedicated to Global Publishing"
    const description = "游陆信息科技成立于2012年，是一家专注于移动游戏海外发行的国际化运营服务企业。至今已在全球30多个国家成功发行数十款产品，全球累计下载次数突破2230万次.ULU Games, founded in 2012, is a global game operator & publisher aiming at oversea mobile game publication. We have released decades of productions in more than 30 countries and districts, accumulating over 4 million downloads worldwide."
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="og:title" content={siteTitle} />
                <meta
                    name="description"
                    content={description}
                />
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </Head>
            <Topbar />
            {props.children}
            <Footer />
        </div>
    )
}
export default Layout