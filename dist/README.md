## Explanation of Build Files

- UMD: palettify.js
- CommonJS: palettify.common.js
- ES Module: palettify.esm.js
- UMD: palettify.standalone.js
- UMD: palettify.styles.min.js - _Optional style presets_
- CSS: palettify.min.css - _Optional css styles. Required for some advanced styles showed in the docs_

### Terms

- **[UMD](https://github.com/umdjs/umd)**: UMD builds can be used directly in the browser via a `<script>` tag. The default file from Unpkg CDN at [https://unpkg.com/palettify](https://unpkg.com/palettify) is the UMD build (`palettify.js`).

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**: CommonJS builds are intended for use with older bundlers like [browserify](http://browserify.org/) or [webpack 1](https://webpack.github.io). The default file for these bundlers (`pkg.main`) is the Runtime only CommonJS build (`palettify.common.js`).

- **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: ES module builds are intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org/). The default file for these bundlers (`pkg.module`) is the Runtime only ES Module build (`palettify.esm.js`).

- **Standalone**: UMD packaged module that can be used directly in the browser but requires the user to have [Color Thief](http://lokeshdhakar.com/projects/color-thief/) library added before Palettify.
