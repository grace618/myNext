import React from 'react';
import Footer from './Footer'
import Topbar from './Topbar'
import Head from 'next/Head'
function Layout(props) {
    const siteTitle = "游陆：专注移动游戏全球发行ULU Games-Dedicated to Global Publishing"
    const description = "游陆信息科技成立于2012年，是一家专注于移动游戏海外发行的国际化运营服务企业。至今已在全球30多个国家成功发行数十款产品，全球累计下载次数突破2230万次.ULU Games, founded in 2012, is a global game operator & publisher aiming at oversea mobile game publication. We have released decades of productions in more than 30 countries and districts, accumulating over 4 million downloads worldwide."
    const keywords = "游陆，游陆信息，游陆游戏，游陆信息科技，海外发行，手游出海，天空之门，ARKA，天令，金牌制作人，疯狂坦克，黑暗，封神，MMORPG,ULU Games，global publishing，ARKA，Myth of Sword，REACH RICH，Fortress M，Glory，MMORPG"
    return (
        <div>
            <Head>
                <meta charset="utf-8"></meta>
                <link rel="icon" href="/favicon.ico" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <link rel="apple-touch-icon" href="/logo192.png"></link>
                <meta name="theme-color" content="#000000"></meta>
                <meta name="og:title" content={siteTitle} />
                <title>{siteTitle}</title>
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
                <meta name="viewport" content="minimum-scale=1,initial-scale=1,width=device-width,shrink-to-fit=no,user-scalable=no" />
                <meta
                    name="description"
                    content={description}
                />
                <meta name="keywords" content={keywords} />
            </Head>
            <Topbar />
            {props.children}
            <Footer />
        </div>
    )
}
export default Layout