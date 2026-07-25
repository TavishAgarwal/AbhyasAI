Design a complete, production-quality web application UI for "AbhyasAI" 
— an AI-powered personalized study and interview coaching platform. 
The app takes a topic or job role, extracts skills, generates adaptive 
practice questions, and provides structured feedback on answers.

─────────────────────────────────────────
BRAND & VISUAL IDENTITY
─────────────────────────────────────────
App name: AbhyasAI
Tagline: "Your AI Study & Interview Coach"

Color palette:
  Primary:       #1B5E8B  (deep teal-blue)
  Primary light: #E8F4FD  (very light blue, backgrounds)
  Accent:        #E67E22  (warm orange, CTAs and highlights)
  Accent light:  #FEF5EC  (soft orange background)
  Success:       #1E7E34  (dark green)
  Success light: #EAF5EA
  Warning:       #F39C12  (amber)
  Dark text:     #1A1A2E
  Body text:     #444455
  Muted text:    #888899
  Border:        #D0D8E4
  Background:    #F8FAFC  (off-white, not pure white)
  White:         #FFFFFF

Typography:
  Headings: Inter or Plus Jakarta Sans, Bold
  Body: Inter, Regular 400 / Medium 500
  Base size: 15px body, 13px labels, 11px captions
  Line height: 1.6 for body, 1.5 for headings

Design language:
  - Rounded corners: 12px cards, 8px buttons, 6px inputs
  - Soft shadows: 0 2px 12px rgba(0,0,0,0.06)
  - Clean, spacious, no visual clutter
  - Accessibility-first: WCAG AA contrast minimum
  - Warm and approachable, not clinical or corporate
  - No dark mode needed — light theme only

─────────────────────────────────────────
SCREEN 1 — LANDING / HOME
─────────────────────────────────────────
Layout: Full-width, single page, navbar + hero + feature strips

Navbar (sticky, white, subtle bottom border):
  - Left: AbhyasAI logo (teal circle icon with a stylised 'A' + 
    text "AbhyasAI" in #1B5E8B bold)
  - Right: "How it works" link, "WhatsApp Bot" link (with WhatsApp 
    green icon), "Get Started" button (accent orange, filled)

Hero section (centered, generous padding):
  - Large heading: "Master any topic. Ace any interview." 
    (Inter Bold, 48px, dark)
  - Subheading: "AbhyasAI extracts the skills you need, generates 
    adaptive practice questions, evaluates your answers, and coaches 
    you with structured feedback — strengths, gaps, and next steps. 
    Free. Instant." (16px, muted)
  - Two CTA buttons side by side:
      Primary: "Start Practicing" (orange filled, large)
      Secondary: "Try on WhatsApp" (teal outlined, WhatsApp icon)
  - Below buttons: small text "No account needed. No training 
    required. Works on any device."
  - Hero visual: A mockup showing the question / answer / feedback 
    three-panel UI, slightly tilted, with a soft blue glow behind it

Three stat callout boxes (below hero, horizontal row):
  Box 1: "Adaptive" / "Difficulty adjusts with every answer" / 
          "Powered by Multidimensional Elo" / Blue-tinted background
  Box 2: "< 5 sec" / "Per question generated" / 
          "Instant feedback loop" / Teal-tinted background
  Box 3: "₹0" / "Always free for learners" / 
          "No signup required" / Green-tinted background

Feature strip (3 columns, icon + title + description):
  1. "Skill Extraction" — Paste a topic or JD, get a structured 
     skill matrix instantly
  2. "Adaptive Questions" — Each question matches your current 
     skill level using Elo ratings
  3. "WhatsApp Coach" — Practice via voice notes on WhatsApp. 
     No app needed.

─────────────────────────────────────────
SCREEN 2 — MAIN PRACTICE SESSION (Core Screen)
─────────────────────────────────────────
Layout: Two-column — left sidebar (input panel) + right main area 
(session panel). Sidebar: 320px fixed. Main area: fills remaining width.

LEFT SIDEBAR — Input Panel:
  Header: "Start a Session" in bold with a small wand/sparkle icon

  Section A — "Choose your focus":
    Toggle tabs: [ Topic | Job Role / JD ]
    
    Topic tab (default active):
      - Text input: "Enter a topic" (e.g. "Operating Systems")
      - "Extract Skills" button (teal, medium)
      - Below: extracted skills shown as tag pills, grouped by 
        Technical / Behavioral
    
    Job Role / JD tab:
      - Large textarea: "Paste a job description or enter a role 
        title" with placeholder text
      - "Extract Skills" button (teal, medium)
      - Below: extracted skills shown as tag pills

  Divider line

  Section B — "Session settings":
    Label: "Report format"
    Three toggle cards (selectable, single-select, teal border 
    when selected):
      Card 1: "Standard" + "Clean, professional"
      Card 2: "Dyslexia-Friendly" + "Wide spacing, active voice"
      Card 3: "ADHD-Friendly" + "Micro-actions, progressive disclosure"
    Default: Standard selected

  Bottom of sidebar:
    Large full-width button: "Begin Practice Session" 
    (accent orange, rounded 10px, 48px tall, sparkle icon left)
    Below: "Adaptive difficulty · Powered by GPT-4o"

RIGHT MAIN AREA — Three-Panel Session View:

  State A — Empty (before session):
    Centered illustration of a practice session with skill badges
    Text: "Your practice session will appear here"
    Subtext: "Enter a topic and click Begin"

  State B — Active Session:
    Three panels side by side (equal width):
      Panel 1 (Teal header): "Question"
        - Current question text
        - Skill tags below question
        - Difficulty badge (Easy / Medium / Hard)
      
      Panel 2 (Blue header): "Your Answer"
        - Text area for typing
        - Or: "Record voice answer" button with mic icon
        - Submit button at bottom
      
      Panel 3 (Orange header): "Feedback"
        - Strengths section (green highlights)
        - Gaps section (amber highlights)
        - Suggested resources
        - Score indicator
        - "Next Question →" button

  State C — Session Report:
    Summary dashboard with skill progress bars
    Download buttons: PDF / DOCX
    Quality badge: green pill "12 questions completed ✓"

─────────────────────────────────────────
SCREEN 3 — WHATSAPP BOT PAGE
─────────────────────────────────────────
Layout: Centered single column, max-width 720px

Header: WhatsApp green icon + "AbhyasAI on WhatsApp"
Subheading: "No app. No login. Just send a message."

WhatsApp phone mockup (centered):
  Show a realistic phone frame containing a WhatsApp conversation:
  
  User message (right, green bubble):
    "I want to practice Operating Systems"
  
  Bot reply (left, white bubble):
    "Great! I've extracted 12 skills for Operating Systems.
     Let's start with Process Scheduling.
     
     Question 1 (Medium):
     Explain the difference between preemptive and 
     non-preemptive scheduling."
  
  User reply (right, green bubble):
    🎤 Voice note (0:45)
  
  Bot reply (left, white bubble):
    "✅ Strengths: Clear explanation of preemptive scheduling.
     ⚠️ Gap: Didn't mention specific algorithms (Round Robin, SJF).
     📚 Try: Review SJF and Priority Scheduling next.
     
     Ready for Question 2?"

Below mockup:
  Step-by-step guide (horizontal, 3 steps with icons):
    1. "Save our number" → show the number + QR code
    2. "Send a topic or paste a JD"
    3. "Practice with voice or text"

  "Or scan to start chatting" → WhatsApp QR code

  Feature pills: 
    "Voice answers" | "Adaptive difficulty" | 
    "Instant feedback" | "Free forever"

─────────────────────────────────────────
SCREEN 4 — MOBILE RESPONSIVE (Phone View)
─────────────────────────────────────────
The practice screen collapses to:
  - Full width input form (all sidebar content stacked vertically)
  - "Begin" button fixed at bottom of screen
  - Results: Three tabs instead of three columns
    Tab bar: [Question] [Answer] [Feedback]
    Single scrollable panel showing active tab content
  - Download button: full width, sticky above tab bar

─────────────────────────────────────────
COMPONENT LIBRARY (Design System)
─────────────────────────────────────────
Create reusable components for:

Buttons:
  - Primary filled (orange): Begin Session, Download Report
  - Secondary filled (teal): Get Started, Try WhatsApp
  - Outlined teal: New Session, Change Topic
  - Ghost: Cancel, Report issue
  - Icon button: small square with icon only

Form elements:
  - Text input with teal focus ring
  - Textarea for answers
  - Toggle tabs (Topic / Job Role)
  - Selection cards (radio with border highlight)
  - Skill tag pills (technical blue, behavioral orange)

Cards:
  - Feature card (icon + title + body)
  - Stat card (large number + label + sub-label)
  - Panel card (colored header + scrollable content)
  - Skill progress card (name + rating bar + trend arrow)

Badges and pills:
  - Difficulty badges (Easy green, Medium amber, Hard red)
  - Skill category (Technical blue, Behavioral orange)
  - Session status (Active green, Complete grey)
  - Coming soon (grey, muted)

Progress indicators:
  - Skill rating bar (0-100 with Elo label)
  - Session progress (questions answered / total)
  - Skeleton loading animation

Alerts:
  - Info (blue): "Voice notes are transcribed automatically."
  - Warning (amber): "Low confidence on this evaluation — 
    consider rephrasing your answer."
  - Success (green): "Session complete — report ready ✓"

Navigation:
  - Top navbar (sticky)
  - Mobile bottom tab bar
  - Sidebar panel

─────────────────────────────────────────
SPACING & GRID
─────────────────────────────────────────
Grid: 12-column, 24px gutter, 48px outer margin on desktop
Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
Section padding: 80px vertical on desktop, 48px on mobile
Card padding: 24px
Sidebar padding: 24px
Panel content padding: 20px

─────────────────────────────────────────
SCREENS TO DELIVER
─────────────────────────────────────────
1. Landing page — desktop
2. Practice session — empty state — desktop
3. Practice session — active state — desktop
4. Practice session — feedback state — desktop (PRIORITY — most detailed)
5. Practice session — mobile (tabbed)
6. WhatsApp bot page — desktop
7. Component library page

Total: 7 screens + 1 component library frame
