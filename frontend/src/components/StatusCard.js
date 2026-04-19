export const StatusCard = {
  render: () => {
    return `
      <div class="glass-card col-span-2">
        <div class="card-header">
          <h2 class="card-title">System Status</h2>
          <div id="status-indicator-container">
            <div class="status-indicator">
              <div class="status-dot"></div>
              <span>Loading...</span>
            </div>
          </div>
        </div>
        
        <div id="fault-type-container" style="display: none;">
          <p style="color: var(--status-fault); font-weight: 600; margin-bottom: 0.5rem;" id="fault-type-text"></p>
        </div>
        
        <div class="metric-grid">
          <div class="metric-item">
            <div class="metric-label">Current</div>
            <div class="metric-value" id="val-current">-- A</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Voltage</div>
            <div class="metric-value" id="val-voltage">-- V</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Tilt</div>
            <div class="metric-value" id="val-tilt">-- °</div>
          </div>
        </div>
      </div>
    `;
  },

  update: (data) => {
    if (!data) return;

    // Status mapping
    const statusContainer = document.getElementById('status-indicator-container');
    const isFault = data.status === 'FAULT';
    
    statusContainer.innerHTML = `
      <div class="status-indicator" style="background: ${isFault ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}">
        <div class="status-dot ${isFault ? 'fault' : 'normal'}"></div>
        <span style="color: ${isFault ? 'var(--status-fault)' : 'var(--status-normal)'}">${data.status || 'UNKNOWN'}</span>
      </div>
    `;

    // Fault type mapping
    const faultContainer = document.getElementById('fault-type-container');
    const faultText = document.getElementById('fault-type-text');
    
    if (isFault && data.faultType) {
      faultText.innerText = `Detected Fault: ${data.faultType}`;
      faultContainer.style.display = 'block';
    } else {
      faultContainer.style.display = 'none';
    }

    // Sensor mapping
    if (data.sensors) {
      document.getElementById('val-current').innerText = `${data.sensors.current !== undefined ? data.sensors.current.toFixed(2) : '--'} A`;
      document.getElementById('val-voltage').innerText = `${data.sensors.voltage !== undefined ? data.sensors.voltage.toFixed(2) : '--'} V`;
      document.getElementById('val-tilt').innerText = `${data.sensors.tilt !== undefined ? data.sensors.tilt.toFixed(2) : '--'} °`;
    }
  }
};
