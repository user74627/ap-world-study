/* ================================================================
   AP World History Study Tool — Main Application
   Views: Dashboard, Study, Review, Settings
   Event delegation (single listeners on sidebar + main), no build step.
================================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */

  function el(id) { return document.getElementById(id); }

  function formatDate(ts) {
    if (!ts) return 'Never';
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function timeAgo(ts) {
    if (!ts) return '';
    var diff = Date.now() - ts;
    var d    = Math.floor(diff / 86400000);
    if (d === 0) return 'Today';
    if (d === 1) return 'Yesterday';
    if (d < 7)   return d + ' days ago';
    if (d < 30)  return Math.floor(d / 7) + ' weeks ago';
    return Math.floor(d / 30) + ' months ago';
  }

  function scoreClass(s)  { return s >= 75 ? 'good' : s >= 45 ? 'ok' : 'low'; }

  function scoreLabel(s) {
    if (s >= 75) return 'Great coverage! Keep drilling the missed terms.';
    if (s >= 45) return 'Decent start — several gaps remain. Review and retry.';
    return 'Many gaps remain. Study the missed topics, then try again.';
  }

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function closest(el, selector) {
    while (el && el !== document) {
      if (el.matches && el.matches(selector)) return el;
      el = el.parentNode;
    }
    return null;
  }

  /* ── App State ───────────────────────────────────────────── */

  var State = {
    page:          'dashboard',
    unitId:        null,
    pendingResult: null,
    savedTranscript: '',
    savedNotes:    '',
    reviewFilter:  'all'
  };

  /* ── Navigation ──────────────────────────────────────────── */

  function navigate(page, unitId) {
    State.page          = page;
    State.unitId        = unitId || null;
    State.pendingResult = null;
    State.savedTranscript = '';
    State.savedNotes    = '';
    renderAll();
  }

  /* ── Sidebar ─────────────────────────────────────────────── */

  function renderSidebar() {
    document.querySelectorAll('.nav-btn[data-page]').forEach(function (btn) {
      var isActive = btn.dataset.page === State.page &&
        (!btn.dataset.unit || parseInt(btn.dataset.unit, 10) === State.unitId);
      btn.classList.toggle('active', isActive);
    });

    var unitNav = el('unit-nav');
    if (!unitNav) return;
    unitNav.innerHTML = AP_UNITS.map(function (unit) {
      var prog   = StudyStorage.getUnitProgress(unit.id);
      var active = State.page === 'study' && State.unitId === unit.id;
      return [
        '<button class="nav-btn' + (active ? ' active' : '') + '"',
        ' data-page="study" data-unit="' + unit.id + '">',
        '<span class="unit-badge">' + unit.id + '</span>',
        '<span class="unit-nav-label">' + escapeHtml(unit.title) + '</span>',
        prog > 0 ? '<span class="unit-nav-prog">' + prog + '%</span>' : '',
        '</button>'
      ].join('');
    }).join('');
  }

  /* ── Dashboard View ──────────────────────────────────────── */

  function viewDashboard() {
    var allSessions = StudyStorage.getAllSessions();
    var settings    = StudyStorage.getSettings();
    var days        = daysUntil(settings.examDate);

    var totalSessions = allSessions.length;
    var avgScore = totalSessions
      ? Math.round(allSessions.reduce(function (acc, s) {
          return acc + ((s.result && s.result.score) || 0);
        }, 0) / totalSessions)
      : 0;

    var unitScores = AP_UNITS.map(function (u) {
      return { id: u.id, prog: StudyStorage.getUnitProgress(u.id) };
    });
    var withProgress = unitScores.filter(function (u) { return u.prog > 0; });
    var weakest   = withProgress.slice().sort(function (a, b) { return a.prog - b.prog; })[0];

    function statCard(val, label, cls) {
      return '<div class="stat-card ' + (cls || '') + '">' +
        '<div class="stat-value">' + escapeHtml(String(val)) + '</div>' +
        '<div class="stat-label">' + escapeHtml(label) + '</div></div>';
    }

    var daysCard = days === null
      ? statCard('—', 'Exam Countdown', '')
      : statCard(
          days >= 0 ? days : 0,
          days >= 0 ? 'Days to Exam' : 'Exam Passed',
          days < 5 && days >= 0 ? 'warning-card' : ''
        );

    var statsHtml = [
      statCard(totalSessions, 'Study Sessions', 'accent-card'),
      avgScore > 0 ? statCard(avgScore + '%', 'Avg Coverage', 'success-card') : statCard('—', 'Avg Coverage', ''),
      weakest ? statCard('Unit ' + weakest.id, 'Weakest Unit', 'warning-card') : statCard('—', 'Weakest Unit', ''),
      daysCard
    ].join('');

    var cardsHtml = AP_UNITS.map(function (unit) {
      var prog   = StudyStorage.getUnitProgress(unit.id);
      var lastTs = StudyStorage.getLastStudied(unit.id);
      var sessN  = StudyStorage.getSessionsForUnit(unit.id).length;
      return [
        '<div class="unit-card" data-goto-study="' + unit.id + '"',
        ' style="--unit-color:' + unit.color + '">',
        '<div class="unit-num">Unit ' + unit.id + ' &bull; ' + escapeHtml(unit.dateRange) + '</div>',
        '<div class="unit-card-title">' + escapeHtml(unit.title) + '</div>',
        '<div class="unit-date-range">' + escapeHtml(unit.description) + '</div>',
        '<div class="unit-card-footer">',
        '<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:' + prog + '%"></div></div>',
        '<div class="progress-pct">' + prog + '%</div>',
        '</div>',
        lastTs
          ? '<div class="unit-last-studied">Last: ' + timeAgo(lastTs) + ' &bull; ' + sessN + ' session' + (sessN !== 1 ? 's' : '') + '</div>'
          : '<div class="unit-last-studied text-muted">Not started yet — click to begin</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="page-header">',
      '<div class="page-title">Dashboard</div>',
      '<div class="page-subtitle">Track your AP World History progress across all 9 units.</div>',
      '</div>',
      totalSessions === 0
        ? '<div class="alert alert-info">Welcome! Click any unit card below to begin. Paste a YouTube transcript, write what you remember, and get an instant knowledge gap analysis.</div>'
        : '',
      '<div class="stats-bar">' + statsHtml + '</div>',
      '<div class="units-grid">' + cardsHtml + '</div>'
    ].join('');
  }

  /* ── Study View ──────────────────────────────────────────── */

  function viewStudy(unitId) {
    var unit = AP_UNITS.find(function (u) { return u.id === unitId; });
    if (!unit) {
      return '<div class="empty-state"><div class="empty-title">Unit not found</div></div>';
    }

    var sessions     = StudyStorage.getSessionsForUnit(unitId);
    var result       = State.pendingResult;
    var topicsChips  = unit.topics.map(function (t) {
      return '<span class="topic-chip">' + escapeHtml(t.title) + '</span>';
    }).join('');

    var videoHtml = unit.videoId ? [
      '<div class="video-section">',
      '<div class="video-section-label">&#9654;&nbsp; Watch the Review Video</div>',
      '<div class="video-wrap">',
      '<iframe src="https://www.youtube.com/embed/' + unit.videoId + '"',
      ' title="' + escapeHtml(unit.channelNote || 'Unit ' + unit.id + ' Review') + '"',
      ' frameborder="0"',
      ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"',
      ' allowfullscreen></iframe>',
      '</div>',
      '<div class="video-channel-note">',
      '&#128250;&nbsp;' + escapeHtml(unit.channelNote || ''),
      '</div>',
      '</div>'
    ].join('') : '';

    return [
      '<button class="btn btn-secondary btn-sm" style="margin-bottom:18px" data-goto="dashboard">&#8592; Dashboard</button>',

      '<div class="study-header">',
      '<div class="study-unit-badge" style="background:' + unit.color + '">' + unit.id + '</div>',
      '<div class="study-unit-info">',
      '<h1>' + escapeHtml(unit.title) + '</h1>',
      '<div class="unit-meta">Unit ' + unit.id + ' &bull; ' + escapeHtml(unit.dateRange) + '</div>',
      '</div></div>',

      '<div class="topics-preview">',
      '<div class="topics-preview-title">Topics covered in this unit</div>',
      '<div class="topics-chips">' + topicsChips + '</div>',
      '</div>',

      /* Video embed */
      videoHtml,

      /* Step 1 — Transcript (pre-filled) */
      '<div class="step-card">',
      '<div class="step-header">',
      '<div class="step-num">1</div>',
      '<div class="step-title">Review Transcript',
      unit.videoId
        ? ' <em style="font-weight:400;color:var(--success);font-size:13px">&#10003; Pre-loaded from the video above</em>'
        : ' <em style="font-weight:400;color:var(--text-3);font-size:13px">(paste a transcript for richer analysis)</em>',
      '</div>',
      '</div>',
      '<div class="step-body">',
      '<textarea id="transcript-input" class="field transcript-field"',
      ' placeholder="Transcript auto-loads here. You can also paste your own."></textarea>',
      '</div></div>',

      /* Step 2 — Notes */
      '<div class="step-card">',
      '<div class="step-header">',
      '<div class="step-num">2</div>',
      '<div class="step-title">Write Everything You Remember</div>',
      '<span class="step-hint">After watching, write from memory — no peeking!</span>',
      '</div>',
      '<div class="step-body">',
      '<textarea id="notes-input" class="field notes-field"',
      ' placeholder="Write everything you can recall about ' + escapeHtml(unit.title) + ' here.\n\nInclude key events, people, terms, causes, effects, dates, comparisons — anything you remember. The more detail you write, the better the gap analysis."></textarea>',
      '</div></div>',

      /* Analyze bar */
      '<div class="analyze-bar">',
      '<button class="btn btn-primary btn-lg" id="analyze-btn" data-unit="' + unitId + '">&#9654;&nbsp; Analyze Gaps</button>',
      '<span id="analyze-hint" style="font-size:13px;color:var(--text-3)">Write your notes above, then click to find knowledge gaps.</span>',
      '</div>',

      /* Analysis results (only shown after analysis) */
      result ? buildResultsHtml(result) : '',

      /* Past sessions */
      sessions.length ? buildSessionsHtml(sessions) : ''
    ].join('');
  }

  function buildResultsHtml(result) {
    var cls   = scoreClass(result.score);
    var label = scoreLabel(result.score);

    var topicsHtml = []
      .concat(result.coveredTopics.map(function (t) {
        return '<div class="check-item ok-item"><div class="check-icon ok">&#10003;</div><span class="check-text">' + escapeHtml(t) + '</span></div>';
      }))
      .concat(result.missedTopics.map(function (t) {
        return '<div class="check-item miss-item"><div class="check-icon miss">&#10005;</div><span class="check-text">' + escapeHtml(t) + '</span></div>';
      }))
      .join('');

    var termsHtml = []
      .concat(result.coveredTerms.map(function (t) {
        return '<span class="term-tag found">' + escapeHtml(t) + '</span>';
      }))
      .concat(result.missedTerms.map(function (t) {
        return '<span class="term-tag missed">' + escapeHtml(t) + '</span>';
      }))
      .join('');

    var keywordsHtml = result.hotKeywords.length
      ? result.hotKeywords.map(function (k) {
          return '<span class="keyword-tag">' + escapeHtml(k.word) + '<span class="keyword-count">&#xD7;' + k.count + '</span></span>';
        }).join('')
      : '<span style="color:var(--text-3);font-size:13px">No transcript provided — paste one for richer analysis.</span>';

    var questionsHtml = result.suggestedQuestions.map(function (q) {
      return '<div class="question-item">' + escapeHtml(q) + '</div>';
    }).join('');

    var covered   = result.coveredTopics.length;
    var totalTop  = covered + result.missedTopics.length;
    var coveredT  = result.coveredTerms.length;
    var totalTerm = coveredT + result.missedTerms.length;

    return [
      '<div class="results-section" id="results-section">',
      '<div class="results-header">',
      '<div class="score-circle ' + cls + '">',
      '<div class="score-num">' + result.score + '</div>',
      '<div class="score-label">/ 100</div>',
      '</div>',
      '<div class="results-summary">',
      '<h3>Knowledge Gap Analysis</h3>',
      '<p>' + escapeHtml(label) + '</p>',
      '<p style="margin-top:6px;font-size:12px;color:var(--text-3)">',
      covered + '/' + totalTop + ' topics &bull; ' + coveredT + '/' + totalTerm + ' terms',
      '</p>',
      '</div></div>',

      '<div class="results-body">',

      '<div>',
      '<div class="result-block-title">Topics</div>',
      '<div class="check-list">' + topicsHtml + '</div>',
      '</div>',

      '<div>',
      '<div class="result-block-title">Key Terms ' +
        '(<span style="color:var(--success)">&#10003; found</span> / ' +
        '<span style="color:var(--danger)">&#10005; missing</span>)',
      '</div>',
      '<div class="terms-grid">' + termsHtml + '</div>',
      '</div>',

      result.hotKeywords.length
        ? ['<div>',
           '<div class="result-block-title">Frequent Transcript Words Not in Your Notes</div>',
           '<div class="hot-keywords">' + keywordsHtml + '</div>',
           '</div>'].join('')
        : '',

      '<div>',
      '<div class="result-block-title">Suggested Study Questions</div>',
      '<div class="question-list">' + questionsHtml + '</div>',
      '</div>',

      '</div>', /* /results-body */

      '<div class="save-bar">',
      '<button class="btn btn-success" id="save-btn">&#43;&nbsp; Save This Session</button>',
      '<span style="font-size:12px;color:var(--text-3)">Saves notes and gaps for later review</span>',
      '</div>',

      '</div>' /* /results-section */
    ].join('');
  }

  function buildSessionsHtml(sessions) {
    var items = sessions.map(function (s, i) {
      var sc  = s.result ? s.result.score : 0;
      var cls = scoreClass(sc);
      var missed = s.result ? (s.result.missedTopics.length + s.result.missedTerms.length) : 0;
      var missTermsHtml = s.result && s.result.missedTerms.length
        ? s.result.missedTerms.slice(0, 8).map(function (t) {
            return '<span class="term-tag missed">' + escapeHtml(t) + '</span>';
          }).join('') +
          (s.result.missedTerms.length > 8
            ? '<span style="font-size:11px;color:var(--text-3)"> +' + (s.result.missedTerms.length - 8) + ' more</span>'
            : '')
        : '<span style="color:var(--text-3);font-size:12px">No missed terms recorded.</span>';

      return [
        '<div class="session-card">',
        '<div class="session-card-header" data-toggle-session="' + i + '">',
        '<div class="session-score ' + cls + '">' + sc + '</div>',
        '<div class="session-info">',
        '<div class="session-date">' + formatDate(s.timestamp) + ' — ' + timeAgo(s.timestamp) + '</div>',
        '<div class="session-gaps">' + missed + ' gap' + (missed !== 1 ? 's' : '') + ' found</div>',
        '</div>',
        '<div class="session-toggle">&#9660;</div>',
        '</div>',
        '<div class="session-body hidden" id="session-body-' + i + '">',
        '<div class="session-notes-label">Your notes</div>',
        '<div class="session-notes-text">' + escapeHtml(s.notes || '(no notes saved)') + '</div>',
        '<div class="session-notes-label" style="margin-top:10px">Missed terms</div>',
        '<div class="session-missed-terms">' + missTermsHtml + '</div>',
        '</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="sessions-section">',
      '<div class="sessions-title">',
      'Past Sessions ',
      '<span class="sessions-count">' + sessions.length + '</span>',
      '</div>',
      items,
      '</div>'
    ].join('');
  }

  /* ── Review View ─────────────────────────────────────────── */

  function viewReview() {
    var filter  = State.reviewFilter || 'all';
    var allGaps = StudyStorage.getAllGaps();

    var usedUnitIds = [];
    allGaps.forEach(function (g) {
      if (usedUnitIds.indexOf(g.unitId) === -1) usedUnitIds.push(g.unitId);
    });

    var filterHtml = [
      '<button class="filter-btn' + (filter === 'all' ? ' active' : '') + '" data-filter="all">All Units</button>'
    ].concat(usedUnitIds.map(function (uid) {
      var u = AP_UNITS.find(function (u) { return u.id === uid; });
      var lbl = u ? 'Unit ' + u.id : 'Unit ' + uid;
      return '<button class="filter-btn' + (filter === uid ? ' active' : '') + '" data-filter="' + uid + '">' + lbl + '</button>';
    })).join('');

    var filtered = filter === 'all'
      ? allGaps
      : allGaps.filter(function (g) { return g.unitId === filter; });

    var gapsHtml;
    if (filtered.length === 0) {
      gapsHtml = [
        '<div class="empty-state">',
        '<div class="empty-icon">&#9996;</div>',
        '<div class="empty-title">' + (allGaps.length === 0 ? 'No sessions yet' : 'No gaps for this filter') + '</div>',
        '<div class="empty-text">' +
          (allGaps.length === 0
            ? 'Complete a study session on any unit to see your knowledge gaps here.'
            : 'No gaps recorded for that unit — great job, or try completing a session first.')
          + '</div>',
        '</div>'
      ].join('');
    } else {
      gapsHtml = filtered.map(function (g) {
        var unit = AP_UNITS.find(function (u) { return u.id === g.unitId; });
        return [
          '<div class="gap-card">',
          '<div class="gap-unit-badge">Unit ' + g.unitId + '</div>',
          '<div class="gap-content">',
          '<div class="gap-name">' + escapeHtml(g.item) + '</div>',
          '<div class="gap-meta">' + (g.type === 'topic' ? 'Topic' : 'Term') + (unit ? ' &bull; ' + escapeHtml(unit.title) : '') + '</div>',
          '</div>',
          '<div class="gap-freq">Missed ' + g.count + '&#xD7;</div>',
          '</div>'
        ].join('');
      }).join('');
    }

    var studyTipsHtml = allGaps.length > 0
      ? ['<div class="alert alert-info" style="margin-bottom:20px">',
         '<strong>Study tip:</strong> Items marked "Missed 2+" times are your highest priority. ',
         'Return to those units, re-watch the video, then retry the gap analysis.',
         '</div>'].join('')
      : '';

    return [
      '<div class="page-header">',
      '<div class="page-title">Review Gaps</div>',
      '<div class="page-subtitle">Topics and terms you\'ve missed most often, sorted by frequency. Highest priority at the top.</div>',
      '</div>',
      studyTipsHtml,
      allGaps.length > 0 ? '<div class="filter-row">' + filterHtml + '</div>' : '',
      gapsHtml
    ].join('');
  }

  /* ── Settings View ───────────────────────────────────────── */

  function viewSettings() {
    var settings    = StudyStorage.getSettings();
    var sessionCount = StudyStorage.getAllSessions().length;

    return [
      '<div class="page-header">',
      '<div class="page-title">Settings</div>',
      '<div class="page-subtitle">Configure preferences and manage your study data.</div>',
      '</div>',

      /* Exam date */
      '<div class="settings-section">',
      '<div class="settings-section-header">Study Preferences</div>',
      '<div class="settings-body">',
      '<div class="settings-row">',
      '<div class="settings-label">Exam Date <span>Used for the countdown on the dashboard</span></div>',
      '<input type="date" id="exam-date-input" class="field-input" value="' + escapeHtml(settings.examDate || '') + '">',
      '</div>',
      '<div><button class="btn btn-primary btn-sm" id="save-settings-btn">Save Preferences</button></div>',
      '</div></div>',

      /* AI Provider */
      '<div class="settings-section">',
      '<div class="settings-section-header">AI Provider</div>',
      '<div class="settings-body">',
      '<div class="api-disabled">',
      '<strong>Currently using: Browser-only analysis (free &amp; offline)</strong>',
      'Gap analysis runs entirely in your browser using keyword matching and AP World unit checklists.<br><br>',
      'To upgrade to smarter AI-powered analysis in the future, add a Gemini API key. ',
      'The code is already structured to support this — see the comments in ',
      '<code>src/analyzers/browserGapAnalyzer.js</code> for the interface spec.',
      '</div>',
      '</div></div>',

      /* Data management */
      '<div class="settings-section">',
      '<div class="settings-section-header">Data Management</div>',
      '<div class="settings-body">',
      '<div class="settings-row">',
      '<div class="settings-label">Export Data <span>Download all sessions as a JSON backup file</span></div>',
      '<button class="btn btn-secondary btn-sm" id="export-btn">&#8595; Export JSON</button>',
      '</div>',
      '<div class="settings-row">',
      '<div class="settings-label">Import Data <span>Restore from a previously exported file</span></div>',
      '<input type="file" id="import-file" accept=".json" style="display:none">',
      '<button class="btn btn-secondary btn-sm" id="import-btn">&#8593; Import JSON</button>',
      '</div>',
      '<div class="divider"></div>',
      '<div class="settings-row">',
      '<div class="settings-label">Clear All Data <span>Permanently delete all ' + sessionCount + ' session' + (sessionCount !== 1 ? 's' : '') + ' — cannot be undone</span></div>',
      '<button class="btn btn-danger btn-sm" id="clear-data-btn">Clear All Data</button>',
      '</div>',
      '</div></div>',

      '<div id="settings-msg"></div>'
    ].join('');
  }

  /* ── Render ──────────────────────────────────────────────── */

  function renderAll() {
    var content = el('content');
    if (!content) return;

    var html;
    switch (State.page) {
      case 'study':    html = viewStudy(State.unitId);  break;
      case 'review':   html = viewReview();              break;
      case 'settings': html = viewSettings();            break;
      default:         html = viewDashboard();
    }

    content.innerHTML = html;
    renderSidebar();

    /* Restore textarea content after re-render, or auto-fill from unit transcript */
    if (State.page === 'study') {
      var ti   = el('transcript-input');
      var ni   = el('notes-input');
      var unit = AP_UNITS.find(function (u) { return u.id === State.unitId; });
      var defaultTranscript = (typeof UNIT_TRANSCRIPTS !== 'undefined' && unit)
        ? (UNIT_TRANSCRIPTS[unit.id] || '')
        : '';
      if (ti) ti.value = State.savedTranscript || defaultTranscript;
      if (ni && State.savedNotes) ni.value = State.savedNotes;
    }

    /* Set up the file-input change listener (cannot be delegated) */
    var importFile = el('import-file');
    if (importFile) {
      importFile.addEventListener('change', handleImportFile);
    }

    /* Scroll to results after analysis */
    if (State.pendingResult) {
      var rs = el('results-section');
      if (rs) setTimeout(function () { rs.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
    }
  }

  /* ── Action Handlers ─────────────────────────────────────── */

  function handleAnalyze() {
    var analyzeBtn = el('analyze-btn');
    if (!analyzeBtn) return;
    var unitId     = parseInt(analyzeBtn.dataset.unit, 10);
    var transcript = (el('transcript-input') || {}).value || '';
    var notes      = (el('notes-input') || {}).value || '';

    if (!notes.trim()) {
      var hint = el('analyze-hint');
      if (hint) { hint.textContent = 'Write your notes in Step 2 first!'; hint.style.color = 'var(--danger)'; }
      return;
    }

    analyzeBtn.textContent = 'Analyzing\u2026';
    analyzeBtn.disabled = true;

    /* Short delay so the button state visually updates before blocking work */
    setTimeout(function () {
      State.pendingResult   = GapAnalyzer.analyze(unitId, transcript, notes);
      State.savedTranscript = transcript;
      State.savedNotes      = notes;
      renderAll();
    }, 150);
  }

  function handleSave() {
    if (!State.pendingResult) return;
    StudyStorage.saveSession({
      unitId:     State.unitId,
      transcript: State.savedTranscript,
      notes:      State.savedNotes,
      result:     State.pendingResult
    });
    State.pendingResult   = null;
    State.savedTranscript = '';
    State.savedNotes      = '';
    renderAll();
  }

  function handleSaveSettings() {
    var settings = StudyStorage.getSettings();
    var dateInput = el('exam-date-input');
    if (dateInput) settings.examDate = dateInput.value;
    StudyStorage.saveSettings(settings);
    var msg = el('settings-msg');
    if (msg) {
      msg.innerHTML = '<div class="alert alert-success">Settings saved!</div>';
      setTimeout(function () { if (msg) msg.innerHTML = ''; }, 2500);
    }
  }

  function handleExport() {
    var data = StudyStorage.exportData();
    var blob = new Blob([data], { type: 'application/json' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href      = url;
    a.download  = 'apworld-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleImportFile(e) {
    var file = (e.target.files || [])[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      var ok  = StudyStorage.importData(ev.target.result);
      var msg = el('settings-msg');
      if (msg) {
        msg.innerHTML = ok
          ? '<div class="alert alert-success">Data imported successfully!</div>'
          : '<div class="alert" style="background:var(--danger-dim);border-color:var(--danger);color:var(--danger)">Import failed — invalid or corrupted file.</div>';
        setTimeout(function () { if (msg) { msg.innerHTML = ''; renderAll(); } }, 2200);
      }
    };
    reader.readAsText(file);
  }

  function handleClearData() {
    if (!confirm('Permanently delete ALL study sessions? This cannot be undone.')) return;
    StudyStorage.clearAllData();
    navigate('dashboard');
  }

  /* ── Global Event Delegation ─────────────────────────────── */

  function initEvents() {
    /* Sidebar — handles nav-btn clicks (static and dynamic unit buttons) */
    var sidebar = el('sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', function (e) {
        var btn = closest(e.target, '.nav-btn[data-page]');
        if (!btn) return;
        var page   = btn.dataset.page;
        var unitId = btn.dataset.unit ? parseInt(btn.dataset.unit, 10) : null;
        navigate(page, unitId);
      });
    }

    /* Main content — handles all content interactions */
    var main = el('main');
    if (!main) return;

    main.addEventListener('click', function (e) {
      /* Unit card on dashboard */
      var unitCard = closest(e.target, '[data-goto-study]');
      if (unitCard) { navigate('study', parseInt(unitCard.dataset.gotoStudy, 10)); return; }

      /* Generic back/goto button */
      var gotoBtn = closest(e.target, '[data-goto]');
      if (gotoBtn) { navigate(gotoBtn.dataset.goto); return; }

      /* Analyze */
      if (closest(e.target, '#analyze-btn')) { handleAnalyze(); return; }

      /* Save session */
      if (e.target.id === 'save-btn') { handleSave(); return; }

      /* Session accordion toggle */
      var sessionHeader = closest(e.target, '[data-toggle-session]');
      if (sessionHeader) {
        var idx  = sessionHeader.dataset.toggleSession;
        var body = el('session-body-' + idx);
        if (body) {
          body.classList.toggle('hidden');
          var tog = sessionHeader.querySelector('.session-toggle');
          if (tog) tog.innerHTML = body.classList.contains('hidden') ? '&#9660;' : '&#9650;';
        }
        return;
      }

      /* Review unit filter */
      var filterBtn = closest(e.target, '[data-filter]');
      if (filterBtn) {
        var val = filterBtn.dataset.filter;
        State.reviewFilter = val === 'all' ? 'all' : parseInt(val, 10);
        renderAll();
        return;
      }

      /* Settings */
      if (e.target.id === 'save-settings-btn') { handleSaveSettings(); return; }
      if (e.target.id === 'export-btn')         { handleExport(); return; }
      if (e.target.id === 'import-btn')         { var f = el('import-file'); if (f) f.click(); return; }
      if (e.target.id === 'clear-data-btn')     { handleClearData(); return; }
    });
  }

  /* ── Init ────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initEvents();
    navigate('dashboard');
  });

})();
