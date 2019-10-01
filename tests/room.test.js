let page

beforeAll(async () => {
  page = await global.browser.newPage()
  await page.setViewport({ width: 1700, height: 960 })
})

test('room title exists', async () => {
  await page.goto('http://localhost:3000/rooms/1')

  const element = await page.waitForSelector('#RoomTitle')
  const text = await page.evaluate(element => element.textContent, element)
  expect(text).toContain('Сыграть в Пейнтбол')
}, 10000)
