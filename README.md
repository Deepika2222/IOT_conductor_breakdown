# IoT Conductor Breakdown Detection System

A comprehensive monitoring and fault detection system for low voltage AC distribution overhead conductors. This project leverages IoT technology to detect conductor breakage in real-time, reducing power outages, environmental hazards, and economic losses.

## 🚀 Key Features

-   **Real-time Monitoring**: Continuous tracking of electrical parameters from overhead conductors.
-   **Fault Detection Algorithm**: Intelligent algorithms to identify and locate conductor breakages.
-   **Interactive Dashboard**: A modern web interface for visualizing system status, history, and active alerts.
-   **Alert System**: Instant notification of faults to facilitate quick repair and maintenance.
-   **Historical Data Analysis**: Accessible logs of past sensor data and detected anomalies.

## 🏗️ System Architecture

The project is structured as a full-stack application with a modular design:

-   **Frontend**: A responsive dashboard built with **React** and **Vite**, using **Tailwind CSS** for styling and **Recharts** for data visualization.
-   **Backend**: A **Node.js/Express** server that serves as a mock middleware to simulate IoT sensor data and manage status/history.
-   **IoT Components**: (Simulation) Automated data generation and processing to mimic physical IoT nodes.

## 🛠️ Tech Stack

### Frontend
-   **React 19** (Vite)
-   **Tailwind CSS 4**
-   **Lucide React** (Icons)
-   **Recharts** (Graphs)
-   **React Router Dom** (Navigation)

### Backend
-   **Node.js**
-   **Express 5**
-   **CORS** (Cross-Origin Resource Sharing)

## 🚦 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/IOT_conductor_breakdown.git
    cd IOT_conductor_breakdown
    ```

2.  Install dependencies for both folders:
    ```bash
    # Install Backend dependencies
    cd backend
    npm install

    # Install Frontend dependencies
    cd ../frontend
    npm install
    ```

### Running the Application

For the full experience, you should run both the backend and frontend simultaneously.

1.  **Start the Backend Server**:
    ```bash
    cd backend
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

2.  **Start the Frontend Application**:
    ```bash
    cd ../frontend
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📡 API Reference (Backend)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/sensor-data` | Receives incoming IoT sensor data. |
| `GET` | `/api/status` | Retrieves current system status. |
| `GET` | `/api/history` | Gets historical sensor readings. |
| `GET` | `/api/alerts` | Lists all active and past alerts. |
| `GET` | `/health` | Server health check. |

---

> [!NOTE]
> This project is currently configured with a Mock Backend for demonstration and development purposes.

## 📄 License

This project is licensed under the ISC License - see the `LICENSE` file for details.
