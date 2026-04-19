import { api } from '../services/api.js';
import { StatusCard } from '../components/StatusCard.js';
import { HistoryGraph } from '../components/HistoryGraph.js';
import { AlertsTable } from '../components/AlertsTable.js';

export const Dashboard = {
  render: () => {
    return `
      <div class="dashboard-container">
        <h1>IoT Fault Detection <span style="color:var(--text-secondary); font-size:1.5rem; font-weight:normal;">/ Dash</span></h1>
        <p class="subtitle">Real-time system conductor breakdown monitoring</p>

        <div id="dashboard-error-container" style="display: none;"></div>

        <div id="dashboard-content" style="display: none;">
          <div class="dashboard-grid grid-cols-2">
            <!-- Top section: Status card spans full width on mobile, top section -->
            ${StatusCard.render()}
          </div>
          
          <div class="dashboard-grid grid-cols-2" style="grid-template-columns: 1.5fr 1fr;">
            <!-- Bottom section: graph on left, alerts on right -->
            <div class="grid-item">
              ${HistoryGraph.render()}
            </div>
            <div class="grid-item">
              ${AlertsTable.render()}
            </div>
          </div>
        </div>

        <div id="dashboard-loading" class="loading-wrapper">
          <div class="spinner"></div>
          <p style="color: var(--text-secondary);">Connecting to API systems...</p>
        </div>
      </div>
    `;
  },

  mount: async (rootElement) => {
    const errorContainer = document.getElementById('dashboard-error-container');
    const contentContainer = document.getElementById('dashboard-content');
    const loadingContainer = document.getElementById('dashboard-loading');

    try {
      // Fetch all data concurrently
      const [statusRes, historyRes, alertsRes] = await Promise.all([
        api.getStatus(),
        api.getHistory(),
        api.getAlerts()
      ]);

      // Hide loading
      loadingContainer.style.display = 'none';

      // Check for global fetch errors (where success is explicitly false from catch block)
      if ((statusRes && statusRes.success === false) || 
          (historyRes && historyRes.success === false) || 
          (alertsRes && alertsRes.success === false)) {
        
        let errorMsg = statusRes?.error || historyRes?.error || alertsRes?.error || 'Failed to connect to backend';
        throw new Error(errorMsg);
      }

      contentContainer.style.display = 'block';

      // Assume response.data holds the meat of the response as per requirement
      // e.g. { success: true, data: {...}, error: null }
      const statusData = statusRes?.data || statusRes || {}; 
      const historyData = historyRes?.data || historyRes || [];
      const alertsData = alertsRes?.data || alertsRes || [];

      // Update components
      StatusCard.update(statusData);
      HistoryGraph.update(historyData);
      AlertsTable.update(alertsData);

      // Optional: Polling setup here
      // setInterval(() => Dashboard.refresh(), 5000)

    } catch (err) {
      loadingContainer.style.display = 'none';
      errorContainer.style.display = 'block';
      errorContainer.innerHTML = `
        <div class="error-message">
          <strong>Connection Error:</strong> ${err.message}<br/>
          <small>Make sure the backend is running at http://localhost:5000</small>
        </div>
      `;
    }
  }
};
