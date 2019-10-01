const chalk = require('chalk')
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async function() {
  console.log(chalk.green('\nSetup Puppeteer'))
  const browser = await puppeteer.launch({
    slowMo: 150,
    args: [`--window-size=${1920},${1080}`],
    headless: false,
  })
  // This global is not available inside tests but only in global teardown
  global.browser = browser
  // Instead, we expose the connection details via file system to be used in tests
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}
