import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const reduce = process.argv.includes('--reduce-motion')
const small = process.argv.includes('--small')
const ctx = await browser.newContext({
  viewport: small ? { width: 1024, height: 580 } : { width: 1280, height: 800 },
  reducedMotion: reduce ? 'reduce' : 'no-preference',
})
console.log('Mode: viewport=', small ? '1024x580' : '1280x800', '| reducedMotion=', reduce)
const page = await ctx.newPage()

const logs = []
const errors = []
const pageErrors = []

page.on('console', (msg) => {
  logs.push(`[${msg.type()}] ${msg.text()}`)
})
page.on('pageerror', (err) => {
  pageErrors.push(`${err.name}: ${err.message}\n${err.stack || ''}`)
})
page.on('requestfailed', (req) => {
  errors.push(`REQ FAIL ${req.url()} :: ${req.failure()?.errorText}`)
})

await page.goto('http://localhost:5173/', { waitUntil: 'load' })

await page.waitForTimeout(2000)
await page.screenshot({ path: 'diagnose-t2.png' })
const at2 = await page.evaluate(() => ({
  rootKids: document.getElementById('root')?.childElementCount,
  bodyLen: document.body.innerText.length,
}))
console.log('AT 2s:', at2)

await page.waitForTimeout(4000)
await page.screenshot({ path: 'diagnose-t6.png' })
const at6 = await page.evaluate(() => ({
  rootKids: document.getElementById('root')?.childElementCount,
  bodyLen: document.body.innerText.length,
}))
console.log('AT 6s:', at6)

await page.waitForTimeout(6000)
await page.screenshot({ path: 'diagnose-t12.png' })
const at12 = await page.evaluate(() => ({
  rootKids: document.getElementById('root')?.childElementCount,
  bodyLen: document.body.innerText.length,
}))
console.log('AT 12s:', at12)

await page.waitForTimeout(6000)
await page.screenshot({ path: 'diagnose-t18.png' })

const rootInfo = await page.evaluate(() => {
  const root = document.getElementById('root')
  return {
    rootChildren: root?.childElementCount ?? 0,
    rootInnerHTMLLen: root?.innerHTML?.length ?? 0,
    bodyChildren: document.body.childElementCount,
    bodyText: document.body.innerText.substring(0, 400),
    bodyHTMLLen: document.body.innerHTML.length,
    bodyBg: getComputedStyle(document.body).backgroundColor,
  }
})

console.log('=== ROOT INFO ===')
console.log(JSON.stringify(rootInfo, null, 2))

console.log('\n=== PAGE ERRORS ===')
pageErrors.forEach(e => console.log(e, '\n---'))

console.log('\n=== REQUEST FAILS ===')
errors.forEach(e => console.log(e))

console.log('\n=== CONSOLE LOGS (last 40) ===')
logs.slice(-40).forEach(l => console.log(l))

await browser.close()
