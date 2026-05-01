/* ================================================================
   Study Storage — localStorage wrapper
   Manages study sessions and app settings.
================================================================ */

var StudyStorage = (function () {
  var SESSIONS_KEY = 'apworld_sessions';
  var SETTINGS_KEY = 'apworld_settings';

  function _read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function _write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage write failed:', e);
      return false;
    }
  }

  return {
    /* ── Sessions ─────────────────────────────────────── */

    getAllSessions: function () {
      return _read(SESSIONS_KEY, []);
    },

    getSessionsForUnit: function (unitId) {
      return this.getAllSessions().filter(function (s) {
        return s.unitId === unitId;
      });
    },

    saveSession: function (session) {
      /* session shape:
         { id, unitId, timestamp, transcript, notes,
           result: { score, coveredTopics[], missedTopics[],
                     coveredTerms[], missedTerms[],
                     hotKeywords[], suggestedQuestions[] } } */
      var sessions = this.getAllSessions();
      session.id = session.id || Date.now().toString();
      session.timestamp = session.timestamp || Date.now();
      sessions.unshift(session); // newest first
      _write(SESSIONS_KEY, sessions);
      return session;
    },

    deleteSession: function (sessionId) {
      var sessions = this.getAllSessions().filter(function (s) {
        return s.id !== sessionId;
      });
      _write(SESSIONS_KEY, sessions);
    },

    /* ── Progress helpers ─────────────────────────────── */

    getUnitProgress: function (unitId, unit) {
      /* Returns 0–100 percentage based on best session score */
      var sessions = this.getSessionsForUnit(unitId);
      if (!sessions.length) return 0;
      var best = sessions.reduce(function (max, s) {
        return (s.result && s.result.score > max) ? s.result.score : max;
      }, 0);
      return best;
    },

    getLastStudied: function (unitId) {
      var sessions = this.getSessionsForUnit(unitId);
      if (!sessions.length) return null;
      return sessions[0].timestamp; // already newest-first
    },

    /* Returns {topic/term → missCount} across all sessions for a unit */
    getMissedFrequency: function (unitId) {
      var freq = {};
      this.getSessionsForUnit(unitId).forEach(function (s) {
        if (!s.result) return;
        (s.result.missedTopics || []).forEach(function (t) {
          freq[t] = (freq[t] || 0) + 1;
        });
        (s.result.missedTerms || []).forEach(function (t) {
          freq[t] = (freq[t] || 0) + 1;
        });
      });
      return freq;
    },

    /* All missed items across all units, aggregated */
    getAllGaps: function () {
      var all = this.getAllSessions();
      var map = {};
      all.forEach(function (s) {
        if (!s.result) return;
        var push = function (item, type) {
          var key = s.unitId + '||' + item;
          if (!map[key]) {
            map[key] = { unitId: s.unitId, item: item, type: type, count: 0 };
          }
          map[key].count += 1;
        };
        (s.result.missedTopics || []).forEach(function (t) { push(t, 'topic'); });
        (s.result.missedTerms || []).forEach(function (t) { push(t, 'term'); });
      });
      return Object.values(map).sort(function (a, b) { return b.count - a.count; });
    },

    /* ── Settings ─────────────────────────────────────── */

    getSettings: function () {
      return _read(SETTINGS_KEY, {
        examDate: '',
        aiProvider: 'browser', // 'browser' | 'gemini' (future)
        geminiApiKey: ''
      });
    },

    saveSettings: function (settings) {
      _write(SETTINGS_KEY, settings);
    },

    /* ── Data management ──────────────────────────────── */

    exportData: function () {
      return JSON.stringify({
        exported: new Date().toISOString(),
        sessions: this.getAllSessions(),
        settings: this.getSettings()
      }, null, 2);
    },

    importData: function (jsonString) {
      try {
        var data = JSON.parse(jsonString);
        if (data.sessions) _write(SESSIONS_KEY, data.sessions);
        if (data.settings) _write(SETTINGS_KEY, data.settings);
        return true;
      } catch (e) {
        return false;
      }
    },

    clearAllData: function () {
      localStorage.removeItem(SESSIONS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    }
  };
})();
