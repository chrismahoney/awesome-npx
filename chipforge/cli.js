#!/usr/bin/env node
// Chipforge launcher: serves the single-page workstation on localhost and opens it.
const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const args = process.argv.slice(2)
if (args.includes('-h') || args.includes('--help')) {
  console.log(`chipforge - a chiptune workstation in your browser

usage: npx chipforge [--port <n>] [--no-open]

  --port <n>   port to listen on (default 8088, or the next free one)
  --no-open    don't open a browser window`)
  process.exit(0)
}
const portArg = args.indexOf('--port')
const wantPort = portArg >= 0 ? Number(args[portArg + 1]) : Number(process.env.PORT) || 8088
const shouldOpen = !args.includes('--no-open')

const body = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf8')
const page = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
  '</head><body>' + body + '</body></html>'

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url.startsWith('/?') || req.url === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' })
    res.end(page)
  } else {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('not found')
  }
})

function listen (port, attemptsLeft) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0 && portArg < 0) return listen(port + 1, attemptsLeft - 1)
    console.error(err.message)
    process.exit(1)
  })
  server.listen(port, '127.0.0.1', () => {
    const url = `http://localhost:${server.address().port}/`
    console.log(`\n  CHIPFORGE is running at ${url}\n  press ctrl+c to stop\n`)
    if (shouldOpen) openBrowser(url)
  })
}

function openBrowser (url) {
  const cmd = process.platform === 'darwin' ? `open "${url}"`
    : process.platform === 'win32' ? `start "" "${url}"`
      : `xdg-open "${url}"`
  exec(cmd, () => {})
}

listen(wantPort, 20)
