const BASE_URL = 'http://localhost:5000';

async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error on ${endpoint}:`, error);
    return { success: false, data: null, error: error.message };
  }
}

export const api = {
  getStatus: async () => {
    return await fetchFromApi('/api/status');
  },
  getHistory: async () => {
    return await fetchFromApi('/api/history');
  },
  getAlerts: async () => {
    return await fetchFromApi('/api/alerts');
  }
};
