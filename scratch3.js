const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('practice.html', 'utf-8');
const dom = new JSDOM(html, { 
  runScripts: "dangerously", 
  resources: "usable", 
  url: "http://localhost:8080/practice.html"
});

// Mock localStorage if it still fails
dom.window.localStorage.setItem('gemini_api_key', '');

dom.window.addEventListener('error', (e) => console.log('ERROR:', e.error));

setTimeout(() => {
  const codeDisplay = dom.window.document.getElementById('code-display');
  console.log("Snippet loaded:", codeDisplay.innerHTML.substring(0, 50));
}, 2000);
