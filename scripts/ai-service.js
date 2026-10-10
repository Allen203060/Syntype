// AI Service: LocalStorage BYOK & Gemini Integration

const API_KEY_STORAGE = 'devtype_gemini_key';

export function saveApiKey(key) {
  try {
    localStorage.setItem(API_KEY_STORAGE, key);
  } catch (err) {
    console.warn("LocalStorage unavailable:", err);
  }
}

export function getApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  } catch (err) {
    console.warn("LocalStorage unavailable:", err);
    return '';
  }
}

export async function generateLearningPlaylist(topic) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key missing. Please set your Gemini API key in Settings.");
  }

  // System Prompt forcing strict JSON output
  const systemPrompt = `
    You are an expert computer science tutor. The user wants to learn about: "${topic}".
    Create a multi-phase kinesthetic learning playlist. Break the concept down into 1 to 3 coding phases.
    Return ONLY valid JSON matching this schema exactly (no markdown formatting, no codeblocks outside the strings):
    {
      "title": "Title of the Concept",
      "language": "javascript", // or cpp, python, etc.
      "phases": [
        {
          "phase_num": 1,
          "title": "Phase Title",
          "snippet": "clean code snippet here without markdown backticks",
          "knowledge": "Detailed markdown explanation of the code, mechanics, and complexity."
        }
      ]
    }
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Details:", errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    const playlist = JSON.parse(jsonString);
    
    return playlist;
  } catch (err) {
    console.error("AI Generation Failed:", err);
    throw err;
  }
}

export async function generatePracticeSnippet(language, length) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("No API key available");
  }

  let lineCount = "3 to 5 lines";
  if (length === 'medium') lineCount = "6 to 9 lines";
  if (length === 'long') lineCount = "10 to 15 lines";

  const systemPrompt = `
    You are an expert developer. Generate a random, realistic, and interesting code snippet for a typing test.
    Language: ${language}
    Length: ${lineCount}
    
    Rules:
    1. Output ONLY the raw code snippet. 
    2. Do NOT wrap the code in markdown backticks (e.g. \`\`\`python). Just the raw text.
    3. Do NOT include any explanations or conversational text.
    4. Ensure standard indentation and syntactic correctness.
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: {
      temperature: 0.8, // High temperature for high randomness
      responseMimeType: "text/plain"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  let snippet = data.candidates[0].content.parts[0].text;
  
  // Cleanup any markdown backticks if the AI accidentally includes them
  snippet = snippet.replace(/^```[\w]*\n/, '').replace(/```$/, '').trim();
  
  return snippet;
}
