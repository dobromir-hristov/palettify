const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./docs/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/palettify@[\d.]+.[\d]+\/dist\/palettify\.js/,
    'https://unpkg.com/palettify@' + pack.version + '/dist/palettify.js.'
  )
fs.writeFileSync('./docs/installation.md', installation)

const coverpage = fs
  .readFileSync('./docs/_coverpage.md', 'utf-8')
  .replace(
    /<small>[\d.]+.[\d]+<\/small>/,
    '<small>' + pack.version + '</small>'
  )
fs.writeFileSync('./docs/_coverpage.md', coverpage)
