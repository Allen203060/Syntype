import { getApiKey } from './ai-service.js';

export async function generateProjectPlan(topic, language = "javascript") {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key missing. Please set your Gemini API key in Settings.");
  }

  // The Agentic System Prompt
  const systemPrompt = `
    You are an elite Senior Software Architect and Technical Tutor. 
    The user wants to build or understand the following complex project/algorithm: "${topic}".
    You MUST write all code exclusively in this language: "${language}".
    
    Your job is to act as a Project Planner Agent. You must break this request down into a logical 4 to 7 phase implementation plan.
    Each phase must build upon the previous one until the mini-project or algorithm is fully complete.

    Rules for the Code Snippets:
    1. Snippets must be pure code ONLY (no markdown formatting, no backticks).
    2. ABSOLUTELY NO CODE COMMENTS (e.g. //, /* */, or #). The user is typing this out to learn, and typing comments wastes their time.
    3. Snippets should be concise but functional (10 to 30 lines maximum per phase).
    4. Ensure clean formatting and standard indentation (no tabs).
    
    Rules for the Knowledge Explanations:
    1. Use rich Markdown formatting (### Headings, **bold text**, bullet points).
    2. Explain the architectural decisions, state management, or system design trade-offs.
    3. Explain the mechanics of the code snippet line-by-line.
    
    Return ONLY valid JSON matching this exact schema (No conversational text outside the JSON):
    {
      "title": "Project Title",
      "language": "${language}",
      "phases": [
        {
          "phase_num": 1,
          "title": "Phase 1: Setup & Data Structures",
          "snippet": "clean code snippet here without markdown backticks",
          "knowledge": "Detailed markdown explanation of the code and architecture."
        }
      ]
    }
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: {
      temperature: 0.3, 
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
      console.error("AI Planner Error:", errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    const projectPlan = JSON.parse(jsonString);
    
    return projectPlan;
  } catch (err) {
    console.error("AI Project Planning Failed:", err);
    throw err;
  }
}
