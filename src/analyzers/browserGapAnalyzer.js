/* ================================================================
   Browser Gap Analyzer
   Free, offline gap analysis using keyword and term matching.

   INTERFACE (implement this same shape for a future GeminiAnalyzer):
     GapAnalyzer.analyze(unitId, transcript, notes) → result object
     GapAnalyzer.providerName → string
     GapAnalyzer.isAvailable() → boolean

   Result shape:
     {
       score: 0–100,
       coveredTopics: string[],
       missedTopics: string[],
       coveredTerms: string[],
       missedTerms: string[],
       hotKeywords: { word: string, count: number }[],
       suggestedQuestions: string[]
     }
================================================================ */

var GapAnalyzer = (function () {

  var STOPWORDS = new Set([
    'the','and','of','in','to','a','an','for','on','at','by','with','this',
    'that','was','were','had','have','been','would','could','should','will',
    'they','their','them','from','also','which','when','where','what','how',
    'who','then','than','there','these','those','into','out','about','but',
    'or','so','if','its','are','is','it','as','we','our','you','your','he',
    'she','his','her','one','not','all','more','very','can','has','do','be',
    'up','my','him','me','us','some','most','over','after','before','during',
    'through','between','against','under','around','among','while','since',
    'without','within','along','following','across','behind','beyond','plus',
    'except','until','within','per','via','among','throughout','despite',
    'many','much','such','each','every','both','few','little','own','other',
    'same','any','just','even','back','well','way','only','because','been',
    'here','down','now','however','make','made','take','took','use','used'
  ]);

  /* Normalize text: lowercase, collapse whitespace */
  function normalize(text) {
    return (text || '').toLowerCase().replace(/['']/g, "'").replace(/[^a-z0-9'\s-]/g, ' ');
  }

  /* Check whether any of a topic's keys appear in notes text */
  function topicCovered(topic, notesNorm) {
    return topic.keys.some(function (key) {
      return notesNorm.includes(normalize(key));
    });
  }

  /* Check topics */
  function checkTopics(unit, notesNorm) {
    var covered = [], missed = [];
    unit.topics.forEach(function (topic) {
      if (topicCovered(topic, notesNorm)) {
        covered.push(topic.title);
      } else {
        missed.push(topic.title);
      }
    });
    return { covered: covered, missed: missed };
  }

  /* Check key terms */
  function checkTerms(unit, notesNorm) {
    var covered = [], missed = [];
    unit.terms.forEach(function (term) {
      if (notesNorm.includes(normalize(term))) {
        covered.push(term);
      } else {
        missed.push(term);
      }
    });
    return { covered: covered, missed: missed };
  }

  /* Extract words that appear frequently in transcript but are absent from notes */
  function extractHotKeywords(transcriptNorm, notesNorm) {
    var wordCount = {};
    transcriptNorm.split(/\s+/).forEach(function (word) {
      word = word.replace(/[^a-z']/g, '');
      if (word.length > 3 && !STOPWORDS.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    return Object.entries(wordCount)
      .filter(function (pair) {
        return pair[1] >= 3 && !notesNorm.includes(pair[0]);
      })
      .sort(function (a, b) { return b[1] - a[1]; })
      .slice(0, 12)
      .map(function (pair) { return { word: pair[0], count: pair[1] }; });
  }

  /* Pick study questions based on what was missed */
  function generateQuestions(unit, missedTopics, missedTerms) {
    var questions = unit.questions ? unit.questions.slice() : [];

    /* Insert targeted questions for top missed topics */
    missedTopics.slice(0, 2).forEach(function (topic) {
      questions.unshift('What were the key characteristics and significance of: ' + topic + '?');
    });

    if (missedTerms.length > 0) {
      questions.unshift(
        'Define and explain the historical significance of: ' +
        missedTerms.slice(0, 4).join(', ') + '.'
      );
    }

    return questions.slice(0, 6);
  }

  /* ── Public interface ─────────────────────────────────── */
  return {
    providerName: 'Browser (offline)',

    isAvailable: function () { return true; },

    analyze: function (unitId, transcript, notes) {
      var unit = AP_UNITS.find(function (u) { return u.id === unitId; });
      if (!unit) return null;

      var notesNorm = normalize(notes);
      var transcriptNorm = normalize(transcript);

      var topicResult = checkTopics(unit, notesNorm);
      var termResult  = checkTerms(unit, notesNorm);
      var hotKeywords = transcript.trim()
        ? extractHotKeywords(transcriptNorm, notesNorm)
        : [];

      var topicPct = unit.topics.length
        ? topicResult.covered.length / unit.topics.length
        : 0;
      var termPct  = unit.terms.length
        ? termResult.covered.length / unit.terms.length
        : 0;

      /* Weighted score: topics 60%, terms 40% */
      var score = Math.round((topicPct * 0.60 + termPct * 0.40) * 100);

      /* Bonus: if no transcript, scale score to be forgiving */
      if (!transcript.trim() && score === 0 && notes.trim().length > 50) {
        score = Math.min(score + 5, 100);
      }

      var suggestedQuestions = generateQuestions(
        unit, topicResult.missed, termResult.missed
      );

      return {
        score:             score,
        coveredTopics:     topicResult.covered,
        missedTopics:      topicResult.missed,
        coveredTerms:      termResult.covered,
        missedTerms:       termResult.missed,
        hotKeywords:       hotKeywords,
        suggestedQuestions: suggestedQuestions
      };
    }
  };
})();

/* ================================================================
   Future: GeminiGapAnalyzer (same interface)

   var GeminiGapAnalyzer = {
     providerName: 'Gemini (AI)',
     isAvailable: function() { return !!settings.geminiApiKey; },
     analyze: async function(unitId, transcript, notes) {
       // POST to Gemini API with transcript + notes, return same result shape
     }
   };

   To switch providers, replace:
     var GapAnalyzer = GeminiGapAnalyzer;
================================================================ */
