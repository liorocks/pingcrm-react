const mix = require('laravel-mix');
const path = require('path');

// THIS IS A TEMPORARY SOLUTION.
const { hmrOptions, devServer } = require('./webpack.fix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.extract();

mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .postCss('resources/css/app.css', 'public/css/app.css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
  ])
  .options({
    hmrOptions: hmrOptions
  })
  .webpackConfig({
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
    resolve: {
      alias: {
        '@': path.resolve('resources/js')
      }
    },
    devServer: devServer
  })
  .version()
  .sourceMaps();
