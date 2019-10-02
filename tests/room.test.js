let page

beforeAll(async () => {
  page = await global.browser.newPage()
  await page.setViewport({ width: 1700, height: 960 })
  await page.goto('http://localhost:3000')
  await page.click('#login-button')
  await page.waitForSelector('#login-email-field')
  await page.focus('#login-email-field')
  await page.keyboard.type('admin@mailinator.com')
  await page.focus('#login-password-field')
  await page.keyboard.type('qwerty123')
  await page.keyboard.press('Enter')
})

test('see room title', async () => {
  await page.goto('http://localhost:3000/rooms/1')
  const element = await page.waitForSelector('#RoomTitle')
  const text = await page.evaluate(element => element.textContent, element)
  return expect(text).toContain('Сыграть в Пейнтбол')
}, 99999)

test('can change room title', async () => {
  await page.goto('http://localhost:3000/rooms/1')
  await page.click('#RoomTitle-toggle')
  await page.focus('#RoomTitleForm-title-field')
  const titleField = await page.waitForSelector('#RoomTitleForm-title-field')
  await page.evaluate(selector => { selector.value = '' }, titleField)
  await page.keyboard.type(`Changed room name`)
  await page.click('#RoomTitleForm-submit-icon')
  const roomTitle = await page.waitForSelector('#RoomTitle')
  const text = await page.evaluate(element => element.textContent, roomTitle)
  return expect(text).toContain('Changed room name')
}, 999999)
