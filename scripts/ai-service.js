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

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
      throw new Error(`API Error: ${response.status}`);
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
