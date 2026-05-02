/**
 * outbreak.js — Disease Outbreak Alert System
 * Handles: broadcasting alerts, rendering the log, campaign list
 */

// In-memory store of posted alerts (session only)
const outbreaks = [];

/**
 * broadcastOutbreak — reads form, validates, pushes to log and campaign list.
 */
function broadcastOutbreak() {
  const district = document.getElementById('ob-district').value;
  const disease  = document.getElementById('ob-disease').value.trim();
  const severity = document.getElementById('ob-severity').value;
  const cases    = document.getElementById('ob-cases').value;

  if (!district || !disease || !cases) {
    alert('Please fill all fields (District, Disease, and Cases).');
    return;
  }

  const entry = {
    district,
    disease,
    severity,
    cases   : parseInt(cases, 10),
    time    : new Date().toLocaleTimeString(),
  };

  outbreaks.unshift(entry);
  renderOutbreakLog();
  addCampaignCard(entry);

  // Reset form fields
  ['ob-disease', 'ob-cases'].forEach(id => (document.getElementById(id).value = ''));
  document.getElementById('ob-district').value = '';
}

/**
 * renderOutbreakLog — re-renders the "Active Alerts Log" list.
 */
function renderOutbreakLog() {
  const log = document.getElementById('outbreak-log');
  if (!outbreaks.length) {
    log.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px">No active alerts. Post one to see it here.</div>';
    return;
  }

  const colors = {
    high : 'var(--rose)',
    med  : 'var(--amber)',
    low  : 'var(--emerald)',
  };

  log.innerHTML = outbreaks.map(a => `
    <div class="outbreak-list-item">
      <div>
        <div style="font-size:14px;font-weight:700">${a.disease} — ${a.district}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">${a.cases} cases · ${a.time}</div>
      </div>
      <span class="badge" style="
        background:${colors[a.severity]}20;
        color:${colors[a.severity]};
        border:1px solid ${colors[a.severity]}40">
        ${a.severity.toUpperCase()}
      </span>
    </div>`).join('');
}

/**
 * addCampaignCard — appends an entry to the "Active Campaigns" panel.
 * @param {object} entry
 */
function addCampaignCard(entry) {
  const clist = document.getElementById('campaign-list');
  const colorMap = { high: '#ef4444', med: '#f59e0b', low: '#10b981' };
  const color = colorMap[entry.severity];

  const div = document.createElement('div');
  div.style.cssText = `
    padding:14px;
    background:${color}15;
    border:1px solid ${color}30;
    border-radius:var(--r);
    border-left:4px solid ${color}`;
  div.innerHTML = `
    <div style="font-size:13px;font-weight:600;color:${color}">${entry.disease} — ${entry.district}</div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px">
      Cases: ${entry.cases} | Severity: ${entry.severity.toUpperCase()}
    </div>`;
  clist.prepend(div);
}
