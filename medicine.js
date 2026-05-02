/**
 * medicine.js — Medicine & Vaccine Reminder Tracker
 * Handles: adding reminders, rendering the list, deleting entries
 */

// In-memory store (session only)
let medAlerts = [];

/**
 * addMedAlert — reads form, validates, sorts by time, and re-renders.
 */
function addMedAlert() {
  const name = document.getElementById('med-name').value.trim();
  const time = document.getElementById('med-time').value;
  const type = document.getElementById('med-type').value;
  const note = document.getElementById('med-note').value.trim();

  if (!name || !time || !type) {
    alert('Please fill in Name, Date/Time and Type.');
    return;
  }

  medAlerts.push({ name, time, type, note, id: Date.now() });
  medAlerts.sort((a, b) => new Date(a.time) - new Date(b.time));
  renderMedAlerts();

  // Reset form
  ['med-name', 'med-time', 'med-note'].forEach(id => (document.getElementById(id).value = ''));
  document.getElementById('med-type').value = '';
}

/**
 * removeMed — removes an alert by its unique id and re-renders.
 * @param {number} id
 */
function removeMed(id) {
  medAlerts = medAlerts.filter(a => a.id !== id);
  renderMedAlerts();
}

/**
 * renderMedAlerts — rebuilds the reminder list UI.
 */
function renderMedAlerts() {
  const list = document.getElementById('med-list');

  if (!medAlerts.length) {
    list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px">No reminders yet. Add one!</div>';
    return;
  }

  list.innerHTML = medAlerts.map(a => `
    <div class="alert-item">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:14px;font-weight:700">${a.name}</span>
          <span class="badge badge-blue" style="font-size:10px">${a.type}</span>
        </div>
        ${a.note ? `<div style="font-size:12px;color:var(--muted)">${a.note}</div>` : ''}
        <div style="font-size:12px;color:var(--muted);margin-top:2px">
          <i class="far fa-clock"></i> ${new Date(a.time).toLocaleString()}
        </div>
      </div>
      <button
        onclick="removeMed(${a.id})"
        style="background:none;border:none;color:var(--rose);cursor:pointer;font-size:18px;padding:4px"
        title="Remove reminder">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>`).join('');
}
