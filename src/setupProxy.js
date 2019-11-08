const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/v1', {
    // target: 'http://192.168.1.100:9988',
    target: 'http://47.244.105.144:8080',
    changeOrigin: true,
  }));
  app.use(proxy('/api', {
    // target: 'http://192.168.1.100:8775',
    target: 'http://47.244.105.144:8080',
    changeOrigin: true,
  }));
};
