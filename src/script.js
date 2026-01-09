(function () {
  const DateTime = luxon.DateTime;

  const els = {
    tzSelect: document.getElementById('tz-select'),
    tzSync: document.getElementById('tz-sync'),
    currentInfo: document.getElementById('current-info'),
    timeAxis: document.getElementById('time-axis'),
    rows: document.getElementById('rows'),
    timelineWrap: document.querySelector('.timeline-h'),
    scrollWrap: document.querySelector('.scroll'),
    zoomIn: document.getElementById('zoom-in'),
    zoomOut: document.getElementById('zoom-out'),
    nowTasks: document.getElementById('now-tasks'),
    upcomingTasks: document.getElementById('upcoming-tasks'),
    followNow: document.getElementById('follow-now')
  };

  let state = {
    zone: DateTime.local().zoneName,
    weekStart: null,
    events: [],
    statusMap: {},
    viewMode: 'week',
    selectedDayIndex: 0,
    originalHourWidthPx: null,
    scale: 2.0,
    followNow: false
  };

  function getWeekKey() {
    const utcWeekDate = state.weekStart.setZone('UTC').startOf('day').toISODate();
    return `${utcWeekDate}`;
  }

  function loadStatus() {
    const key = `weekStatus:${getWeekKey()}`;
    try {
      const raw = localStorage.getItem(key);
      state.statusMap = raw ? JSON.parse(raw) : {};
    } catch {
      state.statusMap = {};
    }
  }

  function saveStatus() {
    const key = `weekStatus:${getWeekKey()}`;
    try {
      localStorage.setItem(key, JSON.stringify(state.statusMap));
    } catch {}
  }

  const CURATED_ZONES = [
    { id: 'UTC', label: 'UTC' },
    { id: 'America/Anchorage', label: 'Alaska' },
    { id: 'America/Los_Angeles', label: 'US Pacific' },
    { id: 'America/Denver', label: 'US Mountain' },
    { id: 'America/Chicago', label: 'US Central' },
    { id: 'America/New_York', label: 'US Eastern' },
    { id: 'America/Phoenix', label: 'US Arizona' },
    { id: 'Europe/London', label: 'UK' },
    { id: 'Europe/Berlin', label: 'Central Europe (Berlin)' },
    { id: 'Europe/Paris', label: 'France (Paris)' },
    { id: 'Europe/Moscow', label: 'Moscow' },
    { id: 'Asia/Dubai', label: 'Dubai' },
    { id: 'Asia/Kolkata', label: 'India (Kolkata)' },
    { id: 'Asia/Shanghai', label: 'China (Shanghai)' },
    { id: 'Asia/Tokyo', label: 'Japan (Tokyo)' },
    { id: 'Asia/Seoul', label: 'Korea (Seoul)' },
    { id: 'Asia/Singapore', label: 'Singapore' },
    { id: 'Australia/Sydney', label: 'Australia (Sydney)' },
  ];

  function getZoneLabel(id) {
    const found = CURATED_ZONES.find(z => z.id === id);
    return found ? found.label : id;
  }

  function populateTimezones() {
    let list = CURATED_ZONES.slice();
    // make sure current state.zone shows up even if not in curated/filtered list
    if (state.zone && !list.some(z => z.id === state.zone)) {
      list = [...list, { id: state.zone, label: state.zone }];
    }
    els.tzSelect.innerHTML = list.map(z => `<option value="${z.id}">${z.label}</option>`).join('');
    els.tzSelect.value = state.zone;
  }

  function getWeekStart(zone, anchor) {
    const now = (anchor || DateTime.now()).setZone(zone);
    // force start on Monday (1)
    const mondayDelta = now.weekday - 1;
    return now.minus({ days: mondayDelta }).startOf('day');
  }

  function formatTime(dt) {
    return dt.toLocaleString(DateTime.TIME_SIMPLE);
  }

  function formatEventRange(evt) {
    const startLabel = `${formatTime(evt.start)} (${evt.start.toFormat('ccc')})`;
    const endLabel = `${formatTime(evt.end)} (${evt.end.toFormat('ccc')})`;
    return `${startLabel} – ${endLabel}`;
  }

  function formatRemainingLabel(end, now) {
    const diff = end.diff(now, ['hours', 'minutes']).toObject();
    const hrs = Math.floor(diff.hours || 0);
    const mins = Math.floor(diff.minutes || 0);
    if (hrs > 0) return `${hrs}h ${mins}m left`;
    return `${mins}m left`;
  }

  function renderTimeAxis() {
    els.timeAxis.innerHTML = '';
    const hoursTotal = 24 * 7;
      // omit first (0) and far-right (hoursTotal)
      for (let h = 1; h <= hoursTotal - 1; h += 1) {
      const label = document.createElement('div');
      label.className = 'axis-label';
      label.style.left = `calc(${h} * var(--hour-width))`;
      label.style.width = 'var(--hour-width)';
      label.style.textAlign = 'center';
      label.style.whiteSpace = 'nowrap';
      const dt = state.weekStart.plus({ hours: h }).setZone(state.zone);
      label.textContent = dt.toFormat('h a');
      els.timeAxis.appendChild(label);
    }
  }

  function clearTrack() {
    els.rows.innerHTML = '';
    const track = document.createElement('div');
    track.className = 'track';
    els.rows.appendChild(track);

    // day markers at top
    for (let d = 0; d <= 7; d++) {
      const localMidnight = state.weekStart.plus({ days: d }).setZone(state.zone).startOf('day');
      const minutesTotal = 7 * 24 * 60;
      const leftMin = localMidnight.diff(state.weekStart, 'minutes').minutes;
      if (leftMin >= 0 && leftMin <= minutesTotal) {
        const marker = document.createElement('div');
        marker.className = 'day-marker';
        marker.style.left = `calc(${leftMin} * (var(--hour-width) / 60))`;
        marker.textContent = `${localMidnight.toFormat('ccc')} • ${localMidnight.toFormat('LLL d')}`;
        track.appendChild(marker);
      }
    }
  }

  function renderNowIndicator() {
    const now = DateTime.now().setZone(state.zone);
    const track = els.rows.querySelector('.track');
    track.querySelectorAll('.now-indicator-v, .now-time-label').forEach(e => e.remove());
    const totalMinutes = 7 * 24 * 60;
    const start = state.weekStart;
    const diffMin = now.diff(start, 'minutes').minutes;
    if (diffMin >= 0 && diffMin <= totalMinutes) {
      const line = document.createElement('div');
      line.className = 'now-indicator-v';
      line.style.left = `calc(${diffMin} * (var(--hour-width) / 60))`;
      track.appendChild(line);

      const label = document.createElement('div');
      label.className = 'now-time-label';
      label.textContent = now.toFormat('h:mm a');
      label.style.left = `calc(${diffMin} * (var(--hour-width) / 60))`;
      track.appendChild(label);
    }
  }

  function renderCurrentInfo() {
    if (!els.currentInfo) return;
    const now = DateTime.now().setZone(state.zone);
    const dateStr = now.toLocaleString(DateTime.DATE_MED);
    const timeStr = now.toFormat('h:mm:ss a');
    const zoneLabel = getZoneLabel(state.zone);
    els.currentInfo.textContent = `${dateStr} • ${timeStr} • ${zoneLabel}`;
  }

  // center on current time
  let initialCentered = false;
  function centerOnNow() {
    if (initialCentered) return;
    scrollToNow();
    initialCentered = true;
  }

  function getMinuteWidthPx() {
    const hourWidthStr = getComputedStyle(document.documentElement).getPropertyValue('--hour-width');
    const hourWidthPx = parseFloat(hourWidthStr || '60');
    return (isNaN(hourWidthPx) ? 60 : hourWidthPx) / 60;
  }

  function scrollToNow() {
    const scroll = els.scrollWrap;
    const timeline = els.timelineWrap;
    if (!scroll || !timeline) return;
    const now = DateTime.now().setZone(state.zone);
    const baseStart = state.weekStart;
    const diffMin = now.diff(baseStart, 'minutes').minutes;
    const hoursTotal = 24 * 7;
    if (diffMin < 0 || diffMin > hoursTotal * 60) return;
    const minuteWidthPx = getMinuteWidthPx();
    const nowLeftPx = diffMin * minuteWidthPx;
    const target = Math.max(0, Math.min(nowLeftPx - scroll.clientWidth / 2, scroll.scrollWidth - scroll.clientWidth));
    scroll.scrollLeft = target;
  }

  function colorForIndex(i) {
    const palette = ['#458588', '#8ec07c', '#fabd2f', '#fb4934', '#d3869b'];
    return palette[i % palette.length];
  }

  function getEventColor(evt) {
    const idx = state.events.findIndex(ev => ev.id === evt.id);
    return evt.color || colorForIndex(idx >= 0 ? idx : 0);
  }

  function renderEvents() {
    const track = els.rows.querySelector('.track');
    track.querySelectorAll('.event').forEach(e => e.remove());

    const hoursTotal = 24 * 7;
    const minutesTotal = hoursTotal * 60;
    const baseStart = state.weekStart;
    const segments = [];

    function pushSegment(evt, segStart, segEnd, colorIdx) {
      const leftMin = segStart.diff(baseStart, 'minutes').minutes;
      const rightMin = segEnd.diff(baseStart, 'minutes').minutes;
      const clipLeftMin = Math.max(0, leftMin);
      const clipRightMin = Math.min(minutesTotal, rightMin);
      const durationMin = clipRightMin - clipLeftMin;
      if (durationMin <= 0) return;
      const color = evt.color || colorForIndex(colorIdx);
      segments.push({ evt, segStart, segEnd, leftMin: clipLeftMin, rightMin: clipRightMin, durationMin, colorIdx, color });
    }

    state.events.forEach((evt, idx) => {
      const start = evt.start;
      const end = evt.end;
      const startMin = start.diff(state.weekStart, 'minutes').minutes;
      const endMin = end.diff(state.weekStart, 'minutes').minutes;
      const weekMin = 7 * 24 * 60;
      if (startMin < weekMin) {
        if (endMin <= weekMin) {
          pushSegment(evt, start, end, idx);
        } else {
          // wrap week
          pushSegment(evt, start, state.weekStart.plus({ minutes: weekMin }), idx);
          pushSegment(evt, state.weekStart, state.weekStart.plus({ minutes: endMin - weekMin }), idx);
        }
      }
    });

    const lanes = [];

    function overlaps(a, b) {
      return a.leftMin < b.rightMin && a.rightMin > b.leftMin;
    }

    segments.forEach(seg => {
      let placed = false;
      for (let li = 0; li < lanes.length; li++) {
        const lane = lanes[li];
        if (!lane.some(s => overlaps(s, seg))) {
          lane.push(seg);
          seg.laneIdx = li;
          placed = true;
          break;
        }
      }
      if (!placed) {
        lanes.push([seg]);
        seg.laneIdx = lanes.length - 1;
      }
    });

    const laneHeights = Array(lanes.length).fill(0);
    const laneElements = lanes.map(() => []);

    segments.forEach(seg => {
      const evEl = document.createElement('div');
      evEl.className = 'event';
      evEl.style.left = `calc(${seg.leftMin} * (var(--hour-width) / 60))`;
      evEl.style.width = `calc(${seg.durationMin} * (var(--hour-width) / 60))`;
      evEl.style.borderTop = `4px solid ${seg.color}`;
      evEl.style.visibility = 'hidden'; // will position after measuring

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = seg.evt.title;
      const time = document.createElement('div');
      time.className = 'time';
      time.textContent = formatEventRange(seg.evt);

      const tasksWrap = document.createElement('div');
      tasksWrap.className = 'tasks';
      (seg.evt.tasks || []).forEach(task => {
        tasksWrap.appendChild(createTaskChip(seg.evt, task));
      });

      evEl.appendChild(title);
      evEl.appendChild(time);
      if (seg.evt.tasks && seg.evt.tasks.length) evEl.appendChild(tasksWrap);
      track.appendChild(evEl);
      const h = evEl.offsetHeight;
      laneHeights[seg.laneIdx] = Math.max(laneHeights[seg.laneIdx], h);
      laneElements[seg.laneIdx].push(evEl);
    });

    // vertical, no overlap
    const baseTop = 28;
    const gap = 12;
    const laneTop = [];
    let y = baseTop;
    for (let i = 0; i < laneHeights.length; i++) {
      laneTop[i] = y;
      y += laneHeights[i] + gap;
    }

    segments.forEach((seg, idx) => {
      const evEl = laneElements[seg.laneIdx].shift();
      evEl.style.top = `${laneTop[seg.laneIdx]}px`;
      evEl.style.visibility = '';
    });

    // fix track height
    const minHStr = getComputedStyle(track).minHeight;
    const minH = parseFloat(minHStr || '0');
    track.style.height = `${Math.max(y + 12, minH)}px`;
  }

  function createTaskChip(evt, task) {
    const chip = document.createElement('label');
    chip.className = 'task-chip';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    const statusKey = `${evt.id}:${task.id}`;
    const saved = state.statusMap[statusKey];
    cb.checked = saved === undefined ? !!task.done : !!saved;
    cb.dataset.statusKey = statusKey;
    cb.addEventListener('change', () => {
      task.done = cb.checked;
      state.statusMap[statusKey] = !!cb.checked;
      saveStatus();
      document.querySelectorAll(`input[type="checkbox"][data-status-key="${statusKey}"]`).forEach(other => {
        if (other !== cb) other.checked = cb.checked;
      });
    });
    const txt = document.createElement('span');
    txt.textContent = task.title;
    chip.appendChild(cb);
    chip.appendChild(txt);
    return chip;
  }

  function renderTaskBoards() {
    if (!els.nowTasks || !els.upcomingTasks) return;
    els.nowTasks.innerHTML = '';
    els.upcomingTasks.innerHTML = '';

    const now = DateTime.now().setZone(state.zone);
    const currentEvents = state.events
      .filter(e => now >= e.start && now < e.end)
      .sort((a, b) => {
        const da = a.end.diff(a.start, 'minutes').minutes;
        const db = b.end.diff(b.start, 'minutes').minutes;
        if (da !== db) return da - db; // shorter first
        return a.start.toMillis() - b.start.toMillis(); // tie breaker
      });
    if (currentEvents.length === 0) {
      const none = document.createElement('div');
      none.textContent = 'No tasks right now.';
      els.nowTasks.appendChild(none);
    } else {
      currentEvents.forEach(e => {
        els.nowTasks.appendChild(createTaskEventBlock(e, `${formatRemainingLabel(e.end, now)}`));
      });
    }

    const horizonMin = 6 * 60;
    const upcoming = state.events
      .filter(e => e.start > now && e.start.diff(now, 'minutes').minutes <= horizonMin)
      .sort((a, b) => {
        const da = a.end.diff(a.start, 'minutes').minutes;
        const db = b.end.diff(b.start, 'minutes').minutes;
        if (da !== db) return da - db; // shorter first
        return a.start.toMillis() - b.start.toMillis();
      });

    if (upcoming.length === 0) {
      const none = document.createElement('div');
      none.textContent = 'No upcoming tasks in next 6 hours.';
      els.upcomingTasks.appendChild(none);
    } else {
      upcoming.forEach(e => {
        const startsIn = e.start.diff(now, ['hours', 'minutes']).toObject();
        const hrs = Math.floor(startsIn.hours || 0);
        const mins = Math.floor(startsIn.minutes || 0);
        els.upcomingTasks.appendChild(createTaskEventBlock(e, `starts in ${hrs}h ${mins}m`));
      });
    }

    function createTaskEventBlock(e, subtitle) {
      const block = document.createElement('div');
      block.className = 'task-event';
      const dot = document.createElement('span');
      dot.className = 'color-dot';
      dot.style.background = getEventColor(e);
      block.appendChild(dot);
      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = subtitle ? `${e.title} (${subtitle})` : e.title;
      const time = document.createElement('div');
      time.className = 'time';
      time.textContent = formatEventRange(e);
      block.appendChild(title);
      block.appendChild(time);
      const wrap = document.createElement('div');
      wrap.className = 'tasks';
      (e.tasks || []).forEach(t => wrap.appendChild(createTaskChip(e, t)));
      if (e.tasks && e.tasks.length) block.appendChild(wrap);
      return block;
    }
  }

  function generateEvents(weekStart, zone) {
    const baseUTC = weekStart.setZone('UTC').startOf('day');
    const eventsUTC = (window.getEventsUTC ? window.getEventsUTC(baseUTC) : []);

    // convert to timezone
    return eventsUTC.map(e => ({
      id: e.id,
      title: e.title,
      color: e.color,
      start: e.start.setZone(zone),
      end: e.end.setZone(zone),
      tasks: e.tasks
    }));
  }

  function checkWeekRollover() {
    const currentWeekStart = getWeekStart('UTC').plus({ hours: 2 });
    if (currentWeekStart.toISODate() !== state.weekStart.toISODate()) {
      state.weekStart = currentWeekStart;
      loadStatus();
      state.events = generateEvents(state.weekStart, state.zone);
      updateAll();
    }
  }

  function updateAll() {
    // width based on view mode
    const hoursTotal = 24 * 7;
    // readability teaks
    if (state.originalHourWidthPx !== null) {
      const hourWidthPx = state.originalHourWidthPx * state.scale;
      document.documentElement.style.setProperty('--hour-width', `${hourWidthPx}px`);
    }
    if (els.timelineWrap) {
      els.timelineWrap.style.width = `calc(${hoursTotal} * var(--hour-width))`;
    }
    renderTimeAxis();
    clearTrack();
    renderEvents();
    renderNowIndicator();
    renderTaskBoards();
  }

  function setScale(newScale, preserveCenter = true) {
    const minScale = 0.75;
    const maxScale = 3.0;
    const clamped = Math.max(minScale, Math.min(maxScale, newScale));
    if (clamped === state.scale) return;

    let centerMinute = null;
    if (preserveCenter && els.scrollWrap) {
      const hourWidthPxOld = state.originalHourWidthPx * state.scale;
      const minuteWidthPxOld = hourWidthPxOld / 60;
      const centerPx = els.scrollWrap.scrollLeft + (els.scrollWrap.clientWidth / 2);
      centerMinute = centerPx / minuteWidthPxOld;
    }

    state.scale = clamped;
    updateAll();

    if (preserveCenter && centerMinute !== null && els.scrollWrap) {
      const hourWidthPxNew = state.originalHourWidthPx * state.scale;
      const minuteWidthPxNew = hourWidthPxNew / 60;
      const target = Math.max(0, Math.min(centerMinute * minuteWidthPxNew - els.scrollWrap.clientWidth / 2, els.scrollWrap.scrollWidth - els.scrollWrap.clientWidth));
      els.scrollWrap.scrollLeft = target;
    }
  }

  function init() {
    populateTimezones();
    if (state.originalHourWidthPx === null) {
      state.originalHourWidthPx = 72;
    }
    state.weekStart = getWeekStart('UTC').plus({ hours: 2 }); // Monday 02:00 UTC
    state.selectedDayIndex = (DateTime.now().setZone(state.zone).startOf('day').diff(state.weekStart, 'days').days) | 0;
    loadStatus();
    state.events = generateEvents(state.weekStart, state.zone);
    updateAll();
    setTimeout(centerOnNow, 50);
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.remove();
      document.body.classList.remove('is-loading');
    }, 100);
    renderCurrentInfo();

    // footer
    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl) {
      lastUpdatedEl.textContent = DateTime.local().toLocaleString(DateTime.DATE_MED);
    }

    if (els.zoomIn) {
      els.zoomIn.addEventListener('click', () => setScale(state.scale + 0.25));
    }
    if (els.zoomOut) {
      els.zoomOut.addEventListener('click', () => setScale(state.scale - 0.25));
    }

    if (els.followNow) {
      els.followNow.addEventListener('change', () => {
        state.followNow = !!els.followNow.checked;
        if (state.followNow) scrollToNow();
      });
    }

    els.tzSelect.addEventListener('change', () => {
      state.zone = els.tzSelect.value;
      state.weekStart = getWeekStart('UTC').plus({ hours: 2 });
      loadStatus();
      state.events = generateEvents(state.weekStart, state.zone);
      updateAll();
      renderCurrentInfo();
      centerOnNow();
      if (state.followNow) scrollToNow();
    });

    if (els.tzSync) {
      els.tzSync.addEventListener('click', () => {
        const localZone = DateTime.local().zoneName;
        state.zone = localZone;
        populateTimezones();
        els.tzSelect.value = localZone;
        state.weekStart = getWeekStart('UTC').plus({ hours: 2 });
        loadStatus();
        state.events = generateEvents(state.weekStart, state.zone);
        updateAll();
        centerOnNow();
        if (state.followNow) scrollToNow();
        renderCurrentInfo();
      });
    }

    setInterval(() => {
      renderNowIndicator();
      if (state.followNow) scrollToNow();
    }, 60 * 1000);
    setInterval(renderCurrentInfo, 1000);
    setInterval(renderTaskBoards, 60 * 1000);
    setInterval(checkWeekRollover, 5 * 60 * 1000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
