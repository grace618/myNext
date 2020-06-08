const path = require('path')
const withOffline = require('next-offline')
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
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
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });
        config.plugins.push(new CleanWebpackPlugin())
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
