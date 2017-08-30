import pkg from './package';
import {argv} from 'yargs';
const production = argv.production || argv.prod || false;

export default {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  banner: `/**
* ${pkg.name} v${pkg.version}
* ${pkg.homepage}
*
* Copyright (c) ${pkg.author}
* Released under the ${pkg.license} license
*/
`,

  root: __dirname,
  paths: {
    source: 'src',
    build: 'dest'
  },

  assets: {
    source: 'src',
    build: 'dest/assets'
  },

  enable: {
    notify: true
  },

  server: {
    port: 4000,
    notify: true,
    open: true
  },

  styles: {
    source: 'src/styles',
    build: 'dest/assets/styles',
    include: [
      // 'node_modules'
    ]
  },

  scripts: {
    bundler: 'webpack', // rollup, webpack, default
    source: 'src/scripts',
    build: 'dest/assets/scripts'
  },

  fonts: {
    source: 'src/fonts',
    build: 'dest/assets/fonts'
  },

  svgs: {
    source: 'src/svgs',
    build: 'dest/assets/svgs'
  },

  images: {
    source: 'src/images',
    build: 'dest/assets/images'
  },

  favicons: {
    path: '{{ site.baseurl }}assets/favicons/',
    source: 'src/favicons',
    build: 'dest/assets/favicons',
    html: 'site/_includes/favicons.html'
  },

  vendor: {
    manifest: 'manifest.json',
    dest: 'dest/assets/vendor',
    flattenPackages: false,
    paths: {
      css: '${dest}/${package}/${file}',
      js: '${dest}/${package}/${file}',
      fonts: '${dest}/${package}/${file}'
    }
  },

  archive: {
    source: 'dest/**/*',
    build: 'archives'
  },

  html: {
    source: 'site',
    build: 'dest',
    config: {
      base: "site/_config.yml",
      development: "site/_config_dev.yml",
      production:  "site/_config_prod.yml"
    }
  },

  notify: {
    title: pkg.name
  },

  env: 'development',
  production: production,
  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  }
};
