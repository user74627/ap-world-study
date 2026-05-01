# AP World History Study Tool

A personal, free study tool for the AP World History exam. No accounts, no subscriptions, no server needed — just open and go.

## How to Use

**Double-click `index.html`** to open the app in your browser. That's it.

All data is saved in your browser's localStorage automatically.

---

## Core Feature: Knowledge Gap Analysis

1. Pick a unit from the sidebar or dashboard.
2. Paste the YouTube video transcript into Step 1 (optional but recommended).
   - In YouTube: click **...** below the video → **Show transcript** → copy all text.
3. Write everything you remember from the video in Step 2 — from memory, without peeking.
4. Click **Analyze Gaps**.
5. The analyzer compares your notes against:
   - A built-in checklist of all topics for that unit.
   - All key AP World terms for the unit.
   - Frequently used words from the transcript that you didn't mention.
6. Review what you missed, then **Save the session**.
7. Repeat until your coverage score improves.

---

## Other Features

- **Dashboard** — progress bars for all 9 units, stats, exam countdown.
- **Review Gaps** — all missed topics and terms ranked by how often you've missed them.
- **Settings** — set your exam date, export/import data as JSON.

---

## Units Covered

| # | Unit | Period |
|---|------|--------|
| 1 | The Global Tapestry | c. 1200–1450 |
| 2 | Networks of Exchange | c. 1200–1450 |
| 3 | Land-Based Empires | c. 1450–1750 |
| 4 | Transoceanic Interconnections | c. 1450–1750 |
| 5 | Revolutions | c. 1750–1900 |
| 6 | Consequences of Industrialization | c. 1750–1900 |
| 7 | Global Conflict | c. 1900–present |
| 8 | Cold War & Decolonization | c. 1900–present |
| 9 | Globalization | c. 1900–present |

---

## File Structure

```
index.html                          ← Open this in your browser
src/
  styles.css                        ← All styling
  app.js                            ← App logic, views, routing
  data/
    apWorldUnits.js                 ← All AP World content (topics, terms, questions)
  storage/
    studyStorage.js                 ← localStorage wrapper
  analyzers/
    browserGapAnalyzer.js           ← Free browser-only gap analysis
```

---

## Adding AI (Future / Optional)

The analyzer is structured so you can plug in Gemini or another AI later. See the comments at the bottom of `src/analyzers/browserGapAnalyzer.js` for the interface specification. The same input/output shape is used — just replace `GapAnalyzer` with a `GeminiGapAnalyzer` implementation.

**Important:** If you add an API key, keep it private and do not share the file publicly.
