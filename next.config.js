const path = require('path')
const withOffline = require('next-offline')
let target = ''
if (process.env.NODE_ENV == 'development') {
    target = 'http:192.168.1.100:8092'
} else {
    target = "https://official.ulugame.com"
}
module.exports = {
    env: {
        target
    },
    webpack: (config, options) => {
        if (process.env.ANALYZE_BUNDLE) {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'disabled',
                    generateStatsFile: true,
                    statsFilename: 'stats.json',
                }));
        }
        config.resolve.alias['Component'] = path.join(__dirname, 'components')
        config.resolve.alias['Images'] = path.join(__dirname, 'public/images')
        config.resolve.alias['Public'] = path.join(__dirname, 'public')
        config.resolve.alias['views'] = path.join(__dirname, 'pages')
        config.resolve.alias['service'] = path.join(__dirname, 'service')
        config.resolve.alias['store'] = path.join(__dirname, 'store')
        config.resolve.alias['utils'] = path.join(__dirname, 'utils')
        config.resolve.alias['common'] = path.join(__dirname, 'common')
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });
        return config
    },
}

module.exports = withOffline({
    target: process.env.NEXT_TARGET || 'serverless',
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /[.](png|jpg|ico|css)/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'assets-cache',
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            },
            {
                urlPattern: /^https:\/\/code\.getmdl\.io.*/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'lib-cache'
                }
            },
            {
                urlPattern: /^http.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'http-cache'
                }
            }
        ]
    }
})
