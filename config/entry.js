const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const legacy = require('rollup-plugin-legacy')
const sass = require('rollup-plugin-sass')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const banner = require('./banner')
const pack = require('../package.json')
const writeFileSync = require('fs').writeFileSync

//function toUpper (_, c) {
//  return c ? c.toUpperCase() : ''
//}

//const classifyRE = /(?:^|[-_\/])(\w)/g
//function classify (str) {
//  return str.replace(classifyRE, toUpper)
//}
const moduleName = pack.name

const entries = {
  commonjs: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.common.js`,
    format: 'cjs',
    banner
  },
  esm: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.esm.js`,
    format: 'es',
    banner
  },
  production: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.min.js`,
    format: 'umd',
    env: 'production',
    moduleName,
    banner
  },
  development: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.js`,
    format: 'umd',
    env: 'development',
    moduleName,
    banner
  },
  standalone: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.standalone.js`,
    format: 'umd',
    env: 'development',
    moduleName,
    banner,
    external: [
      '@mariotacke/color-thief'
    ],
    globals: {
      '@mariotacke/color-thief': 'colorThief'
    }
  },
  standalone_production: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.standalone.min.js`,
    format: 'umd',
    env: 'production',
    moduleName,
    banner,
    external: [
      '@mariotacke/color-thief'
    ],
    globals: {
      '@mariotacke/color-thief': 'colorThief'
    }
  },
  styles: {
    entry: 'src/styles.js',
    dest: `dist/${pack.name}.styles.min.js`,
    format: 'umd',
    env: 'production',
    moduleName: 'palettifyStyles',
    banner,
    plugins: [
      sass({
        options: {
          outputStyle: 'compressed'
        },
        output (styles, styleNodes) {
          styleNodes.forEach(obj => {
            const name = obj.id.replace(/^.*[\\\/]/, '').replace('.scss', '.min.css')
            writeFileSync('dist/' + name, obj.content)
          })
        },
        processor: css =>
          postcss([autoprefixer])
            .process(css)
            .then(result => result.css)
      })
    ]
  }
}

function genConfig (opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    format: opts.format,
    banner: opts.banner,
    moduleName: opts.moduleName,
    plugins: [
      buble({
        transforms: {dangerousForOf: true}
      }),
      resolve({
        jsnext: true,
        main: true,
        module: true
      }),
      commonjs()
    ],
    external: opts.external,
    globals: opts.globals
  }

  const replacePluginOptions = {'__VERSION__': pack.version}
  if (opts.env) {
    replacePluginOptions['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(replacePluginOptions))
  if (opts.moduleName === 'palettifyStyles') {
    config.plugins = opts.plugins
  }

  return config
}

exports.getEntry = name => genConfig(entries[name])
exports.getAllEntries = () => Object.keys(entries).map(name => genConfig(entries[name]))
