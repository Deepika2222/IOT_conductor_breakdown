export const HistoryGraph = {
  render: () => {
    return `
      <div class="glass-card">
        <div class="card-header">
          <h2 class="card-title">Sensor History</h2>
        </div>
        <div class="chart-container" id="history-chart-container">
          <div class="chart-yaxis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <div class="chart-bars-wrap" id="chart-bars">
            <!-- Bars injected here -->
          </div>
        </div>
      </div>
    `;
  },

  update: (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      document.getElementById('chart-bars').innerHTML = '<div style="color: var(--text-secondary); width: 100%; text-align: center; margin-bottom: 20px;">No historical data available</div>';
      return;
    }

    // Usually data looks like [{ timestamp, value, status... }...]
    // Because I don't know the exact structure, assume it's roughly an array.
    // E.g., data[]: { value: number, status: 'NORMAL'|'FAULT', timestamp: '...' }
    // Normalizing values for a 0-100% height graph.
    let maxVal = 0;
    
    // Find maximum numerical value across any valid field structure
    data.forEach(item => {
      const val = item.value || (item.sensors ? item.sensors.current : 0);
      if (val > maxVal) maxVal = val;
    });

    if (maxVal === 0) maxVal = 100; // prevent div by zero

    let barsHtml = '';
    // Take the last 20 elements
    const displayData = data.slice(-20);

    displayData.forEach(item => {
      const val = item.value || (item.sensors ? item.sensors.current : 0);
      const isFault = item.status === 'FAULT' || item.isFault === true;
      const heightPercent = Math.max(5, (val / maxVal) * 100);
      const timeLabel = item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';

      barsHtml += `
        <div class="chart-bar" 
             style="height: ${heightPercent}%"
             title="Value: ${val} ${timeLabel ? 'at ' + timeLabel : ''}"
             data-type="${isFault ? 'FAULT' : 'NORMAL'}">
             <div class="chart-labels" style="transform: translateX(-50%); left: 50%; white-space: nowrap; font-size: 0.6rem; opacity: 0; transition: opacity 0.2s;">
                ${timeLabel}
             </div>
        </div>
      `;
    });

    document.getElementById('chart-bars').innerHTML = barsHtml;

    // Add simple hover effect label logic
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach(bar => {
      bar.addEventListener('mouseenter', () => {
        const label = bar.querySelector('.chart-labels');
        if(label) label.style.opacity = '1';
      });
      bar.addEventListener('mouseleave', () => {
        const label = bar.querySelector('.chart-labels');
        if(label) label.style.opacity = '0';
      });
    });
  }
};
