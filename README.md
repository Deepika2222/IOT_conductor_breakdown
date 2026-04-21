<div align="center">
  <h1>⚡ IoT Conductor Breakdown Detection System</h1>
  <p><strong>A comprehensive monitoring and fault detection system for low voltage AC distribution overhead conductors.</strong></p>
  
  [![React](https://img.shields.io/badge/React-19-blue.svg?style=flat&logo=react)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
</div>

<br />

This project leverages IoT technology to detect conductor breakages in real-time. By continuously monitoring overhead conductors, it rapidly identifies and locates faults, significantly reducing power outages, mitigating environmental hazards, and preventing economic losses.

## ✨ Key Features

- **📡 Real-time Monitoring**: Continuous tracking of electrical parameters from overhead conductors via IoT nodes.
- **🧠 Fault Detection Algorithm**: Intelligent algorithms to immediately identify and locate conductor breakages or anomalies.
- **🖥️ Interactive Dashboard**: A modern web interface for visualizing system status, live sensor activity, history, and active alerts.
- **🔔 Alert System**: Instant notifications of faults and system alerts to facilitate quick dispatch of repair and maintenance crews.
- **📊 Historical Data Analysis**: Accessible logs of past sensor data, with charts to analyze recurring anomalies.
- **⚙️ Configurable Options**: Adjust polling intervals, alert thresholds, and system modes dynamically.

## 🏗️ System Architecture

The project is structured as a full-stack application with a modular, decoupled design:

- **Frontend (`/frontend`)**: A responsive dashboard built with **React** and **Vite**, using **Tailwind CSS v4** for styling and **Recharts** for real-time data visualization. Designed with modular components for live grids, graphs, and settings.
- **Backend (`/backend`)**: A **Node.js/Express** REST API that serves as the central hub. It processes mock IoT sensor data, manages alert logic, tracks system status, and maintains historical data logs.
- **IoT Simulation**: The backend includes automated data generators mimicking physical IoT sensors sending continuous telemetry.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Routing**: React Router DOM v7

### Backend
- **Core**: Node.js & Express 5
- **Middleware**: CORS, DotEnv
- **HTTP Client**: Axios

## 📂 Project Structure

```text
IOT_conductor_breakdown/
├── backend/
│   ├── config/       # Database & environment configurations
│   ├── controllers/  # Request handlers (alerts, sensors, settings, status)
│   ├── models/       # Data schemas (SensorData)
│   ├── routes/       # Express route definitions
│   ├── services/     # Core business logic and simulations
│   ├── utils/        # Helpers (logger, delay)
│   └── server.js     # Entry point for backend
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components (Sidebar, LiveSensorGrid, etc.)
    │   ├── pages/      # Route pages (Dashboard, Alerts, History, Settings)
    │   ├── services/   # API client services
    │   └── utils/      # Formatting and logic helpers
    ├── index.html      # Vite entry point
    └── vite.config.js  # Vite configuration
```

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/IOT_conductor_breakdown.git
   cd IOT_conductor_breakdown
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables (Backend)**:
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   # Add your database URI or other secrets here if applicable
   ```

4. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

### 🚀 Running the Application

To experience the full system, run both servers simultaneously in separate terminal windows.

**Terminal 1: Start the Backend Server**
```bash
cd backend
npm run dev
```
*The server will run on `http://localhost:5000`.*

**Terminal 2: Start the Frontend Application**
```bash
cd frontend
npm run dev
```
*The application will be available at `http://localhost:5173`.*

## 📡 API Reference

The backend provides several RESTful endpoints grouped by domain:

| Domain | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Sensors** | `/api/sensor` | `GET` | Retrieve live sensor grid data. |
| **Sensors** | `/api/sensor-data` | `POST` | Push new telemetry data. |
| **Status** | `/api/status` | `GET` | Retrieves overall system status. |
| **Alerts** | `/api/alerts` | `GET` | Lists all active and resolved alerts. |
| **History** | `/api/history` | `GET` | Gets historical sensor readings for charts. |
| **Settings**| `/api/settings` | `GET/POST`| Fetch/update user configurations and polling rates. |

> [!NOTE]  
> The system's backend currently operates in a mock/simulation mode. Sensor data is generated dynamically for demonstration purposes.

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for enhancements, bug fixes, or new features.

## 📄 License
This project is licensed under the ISC License - see the `LICENSE` file for details.
