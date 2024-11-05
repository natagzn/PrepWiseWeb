const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // змініть на свій кінцевий маршрут, якщо потрібно
    createProxyMiddleware({
      target: 'https://prepwiseback-371541286df6.herokuapp.com',
      changeOrigin: true,
    })
  );
};
