const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/v1', {
    // target: 'http://192.168.1.100:9988',
    target: 'https://official.ulugame.com',
    changeOrigin: true,
  }));
  app.use(proxy('/api', {
    // target: 'http://192.168.1.100:8775',
    target: 'https://official.ulugame.com',
    changeOrigin: true,
  }));
};
