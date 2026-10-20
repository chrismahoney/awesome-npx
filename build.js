#!/usr/bin/env node
// Builds the static website into dist/: the landing page at / and the studio at /studio/.
const fs = require('fs')
const path = require('path')

const root = __dirname
const dist = path.join(root, 'dist')
const body = fs.readFileSync(path.join(root, 'app.html'), 'utf8')
const studio = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
  '</head><body>' + body + '</body></html>'

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(path.join(dist, 'studio'), { recursive: true })
for (const f of fs.readdirSync(path.join(root, 'site'))) fs.copyFileSync(path.join(root, 'site', f), path.join(dist, f))
fs.writeFileSync(path.join(dist, 'studio', 'index.html'), studio)
console.log('built dist/ (landing page + /studio/)')
