export const AlertsTable = {
  render: () => {
    return `
      <div class="glass-card">
        <div class="card-header">
          <h2 class="card-title">Recent Alerts</h2>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody id="alerts-table-body">
              <tr>
                <td colspan="4" style="text-align: center; color: var(--text-secondary);">Loading alerts...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  update: (data) => {
    const tbody = document.getElementById('alerts-table-body');
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: var(--text-secondary);">No active alerts</td>
        </tr>
      `;
      return;
    }

    let rowsHtml = '';
    
    // Sort logic assuming data might be old to new, ensure new at top
    // Try to sort by timestamp descending if timestamp exists
    const sortedData = [...data].sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tb - ta;
    });

    sortedData.forEach(alert => {
      const time = alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Just now';
      const severity = (alert.severity || 'info').toLowerCase();
      
      let badgeClass = 'badge-info';
      if (severity === 'critical' || severity === 'high') badgeClass = 'badge-critical';
      if (severity === 'warning' || severity === 'medium') badgeClass = 'badge-warning';

      rowsHtml += `
        <tr>
          <td style="white-space: nowrap; color: var(--text-secondary); font-size: 0.8rem;">${time}</td>
          <td><b>${alert.type || 'System Event'}</b></td>
          <td><span class="badge ${badgeClass}">${(alert.severity || 'INFO').toUpperCase()}</span></td>
          <td>${alert.message || alert.description || 'Event logged'}</td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;
  }
};
