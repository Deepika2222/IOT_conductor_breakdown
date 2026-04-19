const BASE_URL = 'http://localhost:5000/api';

export const fetchStatus = async (poleId = 'P12') => {
  const response = await fetch(`${BASE_URL}/status?pole_id=${poleId}`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data.data;
};

export const fetchHistory = async () => {
  const response = await fetch(`${BASE_URL}/history`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data.data;
};

export const fetchAlerts = async () => {
  const response = await fetch(`${BASE_URL}/alerts`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data.data;
};
