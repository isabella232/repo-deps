var color = require('term-color')
var wordWrap = require('word-wrap')
var ghUrl = require('github-url-to-object')

var depKeys = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies'
]

module.exports = prettyPrinter
function prettyPrinter (packages) {
  packages.forEach(function (pkg) {
    console.log(
      color.bold(pkg.name),
      color.dim(pkg.version),
      '(' + (pkg.license || 'no license') + ')')

    var repoUrl = getUrl(pkg.repository || pkg.homepage)
    if (repoUrl) {
      console.log('  ' + color.cyan(repoUrl))
    }

    var lines = wordWrap(pkg.description, { width: 60 })
    lines = lines.split('\n').map(function (line) {
      return '  ' + line
    }).join('\n')
    console.log(lines)
  })
  console.log()
  console.log(color.green(color.bold('Total dependencies:')))
  depKeys.forEach(function (key) {
    console.log('  ' + color.bold(countList(packages, key)) + ' ' + key)
  })
}

function getUrl (repository) {
  if (typeof repository === 'string') {
    return ghUrl(repository).https_url
  } else if (repository) {
    return ghUrl(repository.url).https_url
  } else {
    return null
  }
}

function countList (packages, key) {
  return packages.filter(function (pkg) {
    return pkg.list === key
  }).length
}
