import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AlertsPage from './pages/AlertsPage';
import HistoryPage from './pages/HistoryPage';
import PoleDetailPage from './pages/PoleDetailPage';
import SettingsPage from './pages/SettingsPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-main text-text-primary overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/pole/:id" element={<PoleDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
