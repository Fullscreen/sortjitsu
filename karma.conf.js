'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'src/*.js',
      'test/**/*.js', {
        pattern: 'test/**/*.html',
        included: false,
        served: true
      }
    ],
    plugins: [
      'karma-jasmine',
      'karma-jasmine-jquery',
      'karma-phantomjs-launcher'
    ],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    reporters: ['dots'],
    singleRun: true
  });
};
