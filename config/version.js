const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./docs/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/box-shadow-palette@[\d.]+.[\d]+\/dist\/box-shadow-palette\.js/,
    'https://unpkg.com/box-shadow-palette@' + pack.version + '/dist/box-shadow-palette.js.'
  )
fs.writeFileSync('./docs/installation.md', installation)

const coverpage = fs
  .readFileSync('./docs/_coverpage.md', 'utf-8')
  .replace(
    /<small>[\d.]+.[\d]+<\/small>/,
    '<small>' + pack.version + '</small>'
  )
fs.writeFileSync('./docs/_coverpage.md', coverpage)
