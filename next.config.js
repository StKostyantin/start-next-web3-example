/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const nextConfig = {
  dir: 'src',
  images: {
    domains: ['blog.dehive.finance', 'dehive.finance'],
  },
  env: {},
  webpack(config) {
    config.plugins.push(new AntdDayjsWebpackPlugin());
    return config;
  },
};

const modifyVars = { '@body-background': '#ff0000' };

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        modifyVars,
        cssLoaderOptions: {
          esModule: true,
          sourceMap: false,
          modules: {
            mode: 'local',
          },
        },
      },
    ],
  ],
  nextConfig,
);
