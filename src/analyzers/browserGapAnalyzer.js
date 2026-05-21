/* ================================================================
   AI Gap Analyzer — powered by OpenRouter (deepseek/deepseek-v4-flash:free)
   Public interface:
     GapAnalyzer.analyze(unitId, transcript, notes) → Promise<result>
     GapAnalyzer.providerName  → string
     GapAnalyzer.isAvailable() → boolean

   Result shape (same as before so saved sessions stay compatible):
   {
     score: 0–100,
     coveredTopics: string[],
     missedTopics:  string[],
     coveredTerms:  string[],
     missedTerms:   string[],
     hotKeywords:   [],          ← always empty for AI path
     suggestedQuestions: string[],
     aiFeedback:    string       ← rich markdown paragraph (new)
   }
================================================================ */

var GapAnalyzer = (function () {

  var OPENROUTER_MODEL = 'deepseek/deepseek-v4-flash:free';
  var API_URL          = 'https://openrouter.ai/api/v1/chat/completions';

  function getKey() {
    try {
      var s = JSON.parse(localStorage.getItem('apworld_settings') || '{}');
      return s.openRouterKey || '';
    } catch (e) { return ''; }
  }

  /* ── Prompt builder ──────────────────────────────────────── */

  function buildPrompt(unit, transcript, notes) {
    var topicList  = unit.topics.map(function (t) { return '- ' + t.title; }).join('\n');
    var termsList  = unit.terms.join(', ');

    var transcriptSection = transcript.trim()
      ? 'TRANSCRIPT (video review the student watched):\n"""\n' + transcript.slice(0, 6000) + '\n"""'
      : '(No transcript provided — evaluate notes against the AP unit\'s expected content)';

    return [
      'You are an AP World History tutor grading a student\'s recall notes.',
      '',
      'UNIT: ' + unit.id + ' — ' + unit.title + ' (' + unit.dateRange + ')',
      '',
      'KEY TOPICS for this unit:',
      topicList,
      '',
      'KEY TERMS for this unit:',
      termsList,
      '',
      transcriptSection,
      '',
      'STUDENT\'S NOTES (written from memory — do not penalize for informal style):',
      '"""',
      notes.slice(0, 4000),
      '"""',
      '',
      'Respond ONLY with a valid JSON object (no markdown fences, no extra text) with this exact shape:',
      '{',
      '  "score": <integer 0-100>,',
      '  "coveredTopics": [<topic title strings that the student clearly addressed>],',
      '  "missedTopics":  [<topic title strings the student missed or barely mentioned>],',
      '  "coveredTerms":  [<key terms the student used correctly>],',
      '  "missedTerms":   [<key terms the student did not mention>],',
      '  "suggestedQuestions": [<3-5 targeted follow-up questions to close the gaps>],',
      '  "aiFeedback": "<2-4 sentence encouraging paragraph: what they did well, what to focus on next, study tip>"',
      '}'
    ].join('\n');
  }

  /* ── Retry helper ───────────────────────────────────────── */

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /* ── Main async analyze (auto-retry on 429) ─────────────── */

  async function analyze(unitId, transcript, notes) {
    var unit = AP_UNITS.find(function (u) { return u.id === unitId; });
    if (!unit) throw new Error('Unknown unit ' + unitId);

    var key = getKey();
    if (!key) throw new Error('No OpenRouter API key found. Go to Settings and paste your key.');

    var prompt   = buildPrompt(unit, transcript, notes);
    var body     = JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1200
    });
    var headers  = {
      'Authorization': 'Bearer ' + key,
      'Content-Type':  'application/json',
      'HTTP-Referer':  'https://archishm.github.io/ap-world-study/',
      'X-Title':       'AP World Study Tool'
    };

    /* Up to 4 attempts: waits 5 s, 10 s, 20 s between retries */
    var delays = [5000, 10000, 20000];
    var response;
    for (var attempt = 0; attempt <= delays.length; attempt++) {
      response = await fetch(API_URL, { method: 'POST', headers: headers, body: body });

      if (response.status === 429) {
        if (attempt < delays.length) {
          /* Update the hint text so the user sees progress */
          var hint = document.getElementById('analyze-hint');
          var wait = delays[attempt] / 1000;
          if (hint) {
            hint.innerHTML =
              '<span class="ai-loading-msg"><span class="ai-spinner"></span>' +
              'Free tier is busy \u2014 retrying in ' + wait + 's (attempt ' + (attempt + 2) + ' of 4)\u2026</span>';
          }
          await sleep(delays[attempt]);
          continue;
        }
        /* All retries exhausted */
        throw new Error('rate-limited');
      }

      break; /* non-429 response — continue below */
    }

    if (!response.ok) {
      var errText = await response.text();
      throw new Error('OpenRouter ' + response.status + ': ' + errText.slice(0, 200));
    }

    var data = await response.json();
    var raw  = (data.choices[0].message.content || '').trim();

    /* Strip accidental markdown fences the model sometimes adds */
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');

    var result;
    try {
      result = JSON.parse(raw);
    } catch (e) {
      /* Attempt partial recovery: find the first { ... } block */
      var match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        throw new Error('AI returned unparseable response: ' + raw.slice(0, 300));
      }
    }

    /* Normalise & guarantee all required fields */
    return {
      score:              Number(result.score)              || 0,
      coveredTopics:      Array.isArray(result.coveredTopics) ? result.coveredTopics : [],
      missedTopics:       Array.isArray(result.missedTopics)  ? result.missedTopics  : [],
      coveredTerms:       Array.isArray(result.coveredTerms)  ? result.coveredTerms  : [],
      missedTerms:        Array.isArray(result.missedTerms)   ? result.missedTerms   : [],
      hotKeywords:        [],
      suggestedQuestions: Array.isArray(result.suggestedQuestions) ? result.suggestedQuestions : [],
      aiFeedback:         typeof result.aiFeedback === 'string' ? result.aiFeedback : ''
    };
  }

  /* ── Public interface ─────────────────────────────────── */
  return {
    providerName: 'DeepSeek via OpenRouter',
    isAvailable:  function () { return true; },
    analyze:      analyze
  };

})();
