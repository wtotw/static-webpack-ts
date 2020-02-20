'use strict';

module.exports = {
  path: {
    src: {
      root: './src/',
      html: './src/html/',
      img: './src/img/',
      scripts: {
        lib: './src/scripts/lib/',
        components: './src/scripts/components/',
        infra: './src/scripts/infra/',
        store: './src/scripts/store/',
        pages: './src/scripts/pages/'
      },
      styles: {
        lib: './src/styles/lib/',
        common: './src/styles/common/',
        pages: './src/styles/pages/'
      }
    },
    dist: {
      root: './dist/',
      html: './dist/html/',
      img: './dist/img/',
      scripts: {
        lib: './dist/scripts/lib/',
        components: './dist/scripts/components/',
        infra: './dist/scripts/infra/',
        store: './dist/scripts/store/',
        pages: './dist/scripts/pages/'
      },
      styles: {
        lib: './dist/styles/lib/',
        common: './dist/styles/common/',
        pages: './dist/styles/pages/'
      }
    }
  }
};
