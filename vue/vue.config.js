module.exports = {
  publicPath: '/app/',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
