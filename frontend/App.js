import { Dashboard } from './src/pages/Dashboard.js';

export default async function App() {
  const root = document.getElementById('root');
  
  // Render structure
  root.innerHTML = Dashboard.render();
  
  // Mount logic and load data
  await Dashboard.mount(root);
}

document.addEventListener('DOMContentLoaded', () => {
  App();
});
