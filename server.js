
const express = require('express')
const next = require('next')
/** */
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')
const cookieParser = require('cookie-parser');
/** */

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.',
  dev,
})
const devProxy = {
  '/api': {
    target: 'https://official.ulugame.com',
    changeOrigin: true,
  },
  '/v1': {
    target: 'https://official.ulugame.com',
    changeOrigin: true,
  }
}
const handle = app.getRequestHandler();


(async () => {
  await app.prepare()
  const server = express()
  // server.use(cookieParser());
  await nextI18next.initPromise
  server.use(nextI18NextMiddleware(nextI18next))


  // Set up the proxy.
  if (dev && devProxy) {
    const proxyMiddleware = require('http-proxy-middleware')
    Object.keys(devProxy).forEach(function (context) {
      server.use(proxyMiddleware(context, devProxy[context]))
    })
  }

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => {
    handle(req, res)
  })


  server.listen(port, err => {
    if (err) {
      throw err
    }
    console.log(`> Ready on port ${port} [${env}]`)
  })
})()