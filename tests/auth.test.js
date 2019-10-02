
let page

beforeAll(async () => {
  page = await global.browser.newPage()
  await page.setViewport({ width: 1700, height: 960 })
})

test('login', async () => {
  await page.goto('http://localhost:3000')
  await page.click('#login-button')
  await page.waitForSelector('#login-email-field')
  await page.focus('#login-email-field')
  await page.keyboard.type('admin@mailinator.com')
  await page.focus('#login-password-field')
  await page.keyboard.type('qwerty123')
  await page.keyboard.press('Enter')
  await page.waitFor(3000)
  const token = await page.evaluate(() => localStorage.getItem('token'))
  await page.screenshot()
  expect(token).toBeDefined()
}, 10000)

test('logout', async () => {
  await page.goto('http://localhost:3000/profile')
  await page.waitForSelector('#logout-icon-button')
  await page.click('#logout-icon-button')
  await page.waitFor(3000)
  const token = await page.evaluate(() => localStorage.getItem('token'))
  await page.screenshot()
  expect(token).toBeNull()
}, 10000)

test('register', async () => {
  const randomNumber = Math.floor(Math.random() * 1000)
  await page.goto('http://localhost:3000')
  await page.waitForSelector('#register-button')
  await page.click('#register-button')
  await page.waitForSelector('#register-name-field')
  await page.focus('#register-name-field')
  await page.keyboard.type(`Test User ${randomNumber}`)
  await page.waitForSelector('#register-email-field')
  await page.focus('#register-email-field')
  await page.keyboard.type(`test${randomNumber}@mailinator.com`)
  await page.focus('#register-password-field')
  await page.keyboard.type('qwerty123')
  await page.keyboard.press('Enter')
  await page.waitFor(3000)
  const token = await page.evaluate(() => localStorage.getItem('token'))
  await page.screenshot()
  expect(token).toBeDefined()
}, 10000)
