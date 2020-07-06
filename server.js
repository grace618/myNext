
const express = require('express')
const next = require('next')
/** */
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')
/** */

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV
const url = process.env.NEXT_PUBLIC_URL
console.log(process.env.API_URL, process.env.NEXT_PUBLIC_URL, 'url')
const dev = env !== 'production'
const app = next({
  dir: '.',
  dev,
})
const devProxy = {
  '/api': {
    target: "http://47.244.105.144",
    changeOrigin: true,
  },
  '/v1': {
    target: "http://47.244.105.144",
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