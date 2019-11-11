const {
  override,
  addWebpackAlias,
} = require('customize-cra');

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
const ext = () => (config) => {
  config.externals = {
    'BMap': 'BMap',
  }
  return config
}
process.env.GENERATE_SOURCEMAP = 'false';
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    views: resolve('src/views'),
    service: resolve('src/service'),
    store: resolve('src/store'),
    utils: resolve('src/utils'),
    assets: resolve('src/assets'),
    icons: resolve('src/icons'),
    common: resolve('src/common'),
    component: resolve('src/component')
  }),
  ext()
);