import re

with open('frontend/src/lib/api.ts', 'r') as f:
    content = f.read()

content = content.replace("const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';", """const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_KEY = import.meta.env.VITE_API_SECRET_KEY || '';

function apiHeaders(extra?: Record<string, string>): Record<string, string> {
  return { 'Content-Type': 'application/json', 'x-api-key': API_KEY, ...extra };
}""")

content = content.replace("const res = await fetch(url);", "const res = await fetch(url, { headers: apiHeaders() });")
content = content.replace("const res = await fetch(`${API_URL}/api/chapters/subjects?class=${classNum}`);", "const res = await fetch(`${API_URL}/api/chapters/subjects?class=${classNum}`, { headers: apiHeaders() });")

content = content.replace("""  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    body: formData
  });""", """  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'x-api-key': API_KEY },
    body: formData
  });""")

content = content.replace("headers: { 'Content-Type': 'application/json' },", "headers: apiHeaders(),")

content = content.replace("const res = await fetch(`${API_URL}/api/skills/${topicOrRoleId}`);", "const res = await fetch(`${API_URL}/api/skills/${topicOrRoleId}`, { headers: apiHeaders() });")
content = content.replace("const res = await fetch(`${API_URL}/api/sessions/${sessionId}`);", "const res = await fetch(`${API_URL}/api/sessions/${sessionId}`, { headers: apiHeaders() });")
content = content.replace("const res = await fetch(`${API_URL}/api/reports/session/${sessionId}/render?format=${format}`);", "const res = await fetch(`${API_URL}/api/reports/session/${sessionId}/render?format=${format}`, { headers: apiHeaders() });")

with open('frontend/src/lib/api.ts', 'w') as f:
    f.write(content)
