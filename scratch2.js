const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('practice.html', 'utf-8');
const dom = new JSDOM(html, { 
  runScripts: "dangerously", 
  resources: "usable", 
  url: "file://" + __dirname + "/practice.html" 
});

dom.window.localStorage.setItem('gemini_api_key', ''); // simulate NO api key

dom.window.addEventListener('error', (e) => console.log('ERROR:', e.message));

setTimeout(() => {
  const codeDisplay = dom.window.document.getElementById('code-display');
  console.log("Snippet loaded:", codeDisplay.innerHTML.substring(0, 50));
}, 2000);
