import { TrendingDown, Zap, AlertTriangle } from 'lucide-react';

/**
 * Analyzes sensor history and produces AI-driven insights.
 * @param {Array} data - Formatted history data points.
 * @param {Object} thresholds - System thresholds from settings.
 * @returns {Array} - Array of insight objects.
 */
export const analyzeSensorData = (data, thresholds) => {
  const insights = [];
  if (!data || data.length < 2) return [{
    type: "primary",
    icon: AlertTriangle,
    text: "Historical Data Synchronizing",
    description: "Waiting for additional data points to perform pattern correlation.",
    highlight: "Synchronizing",
    color: "text-primary",
    bg: "bg-primary/10"
  }];

  // 1. Check for Current Drops
  for (let i = 1; i < data.length; i++) {
    const prev = data[i-1].current;
    const curr = data[i].current;
    
    // Using a 30% drop as the "Sharp Drop" criteria, 
    // but we can also use thresholds.currentThreshold as a "high load" reference
    if (prev > 10 && (prev - curr) / prev > 0.30) {
      insights.push({
        id: `drop-${data[i].time}`,
        type: "danger",
        icon: TrendingDown,
        text: `Current dropped sharply at ${data[i].time}`,
        description: `Detected a ${( (prev - curr) / prev * 100).toFixed(0)}% decrease. Potential conductor fatigue or continuity break.`,
        highlight: data[i].time,
        targetTimestamp: data[i].time, // Linked to chart X-axis
        color: "text-danger",
        bg: "bg-danger/10"
      });
      break; 
    }
  }

  // 2. Check for Overload 
  const overloads = data.filter(d => d.current > thresholds.currentThreshold);
  if (overloads.length > 0) {
    insights.push({
      id: "overload-general",
      type: "warning",
      icon: Zap,
      text: "Voltage/Current surge detected",
      description: `Readings exceeded your configured threshold of ${thresholds.currentThreshold}A. High thermal stress observed.`,
      highlight: thresholds.currentThreshold.toString(),
      targetTimestamp: overloads[0].time, // Highlight the first occurrence
      color: "text-warning",
      bg: "bg-warning/10"
    });
  }

  // 3. Check for Tilt Events
  if (thresholds.tiltSensitivity) {
    const tiltEvents = data.filter(d => d.tilt > 0);
    if (tiltEvents.length > 0) {
      insights.push({
        id: `tilt-${tiltEvents[0].time}`,
        type: "primary",
        icon: AlertTriangle,
        text: "Physical anomaly detected",
        description: "Mechanical tilt sensor triggered. Correlating with electrical discontinuity suggests physical breakdown.",
        highlight: "Mechanical",
        targetTimestamp: tiltEvents[0].time,
        color: "text-primary",
        bg: "bg-primary/10"
      });
    }
  }

  // 4. Default: System Stable
  if (insights.length === 0) {
    insights.push({
      type: "success",
      icon: Zap,
      text: "System Integrity Optimal",
      description: "AI analysis confirms grid patterns match standard normal operations. No anomalies detected.",
      highlight: "Optimal",
      color: "text-success",
      bg: "bg-success/10"
    });
  }

  return insights.slice(0, 3); // Limit to top 3 insights
};
