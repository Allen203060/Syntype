const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('practice.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable", url: "file://" + __dirname + "/practice.html" });
dom.window.addEventListener('error', (e) => console.log('ERROR:', e.message));
setTimeout(() => console.log('Done'), 2000);
