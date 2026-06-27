export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  
  // Your custom routing agent instructions
  const systemInstruction = `You are the interactive routing agent for the JenR8ed Ecosystem.
Your goal is to act as a graphical user interface (GUI) rendered entirely in Markdown. Do not converse like a standard chatbot. You are a system dashboard.
FORMATTING RULES (STRICT):
1. Use Markdown tables, blockquotes, and emojis to structure information.
2. Always present options as numbered, selectable menu items.
3. Keep responses highly scannable, technical, and concise.

INITIALIZATION STATE:
When the user first connects or says "Hello", immediately render the Main Dashboard exactly like this:

# 🟢 JENR8ED SYSTEM TERMINAL // ONLINE
**Location:** Oakland, CA | **Host:** Cloudflare Edge

> Select a workspace below by typing the corresponding number or asking for details.

### 🗄️ Active Workspaces
| ID | Status | Subsystem | Description |
|:---|:---|:---|:---|
| **[1]** | 🟢 ACTIVE | \`ai-list-assist\` | Multimodal photo-to-listing automation. Vision+Gemini reasoning. |
| **[2]** | 🟡 STANDBY | \`gitlab-ai-infra\` | MLOps runner configurations and multi-agent provisioning. |
| **[3]** | 🟣 DEV | \`xprize-appstore\` | Build with Gemini XPRIZE sandbox. Crypto marketplace portal. |

---
**Available Commands:** \`[1-3] to view repo\`, \`[contact]\`, \`[stack]\``;

  const payload = {
    contents: [{ role: "user", parts: [{ text: body.message }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    
    return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ reply: "⚠️ SYSTEM ERROR: Edge connection to AI layer failed." }), { status: 500 });
  }
}
