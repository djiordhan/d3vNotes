module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
      '**/*.html',
      'assets/**/*.{js,css,png,jpg,svg,gif,webp}'
    ],
    swDest: 'dist/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
      {
        urlPattern: new RegExp('^https://d3vnotes-ff651.web.app/'),
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 5 * 60, // 5 Minutes
          },
        },
      },
    ],
  };
  