```markdown
# TRACKFLOW | Job Application Management Platform

An analytical, full-stack application tracking platform built to empower students and professionals to organize, optimize, and streamline their career development lifecycles. Trackflow bridges the gap between chaotic spreadsheets and high-level pipeline status oversight.

---

## 📋 Problem Statement
During competitive hiring cycles, tracking multiple open job applications across various employment portals becomes disorganized. Applicants often struggle to accurately log timeline sequences, coordinate interview follow-up dates, and calculate overall conversion metrics. Trackflow fixes this by providing an interface that aggregates data entry points into an analytical control panel.

---

## ✨ Key Features
* **Authentication Architecture:** Secured profile space mapping individual datasets to verified user profiles.
* **Pipeline Management Panel:** Real-time data logging for position titles, companies, and application progress categories.
* **Granular Tracking Workspace:** Section components inside list rows dedicated to updating individual interview schedules and logging precise case notes.
* **Analytical Metrics Summary:** Automated high-level calculations displaying Total Applications, Active Interview Processes, and overall Success Conversion Ratios.
* **Dynamic Query Filtering:** Search functionality coupled with dedicated categorization filters to sort entries by current pipeline status immediately.

---

## 🛠️ Technology Stack
* **Frontend UI Framework:** React.js (Vite environment) using custom Tailwind CSS utility layouts
* **Backend Run-time Environment:** Node.js with Express.js RESTful routing architecture
* **Database Cluster Solution:** MongoDB Atlas distributed cloud storage engine
* **Communication Layer Middleware:** Axios HTTP asynchronous pipeline handling

---

## 🏗️ Architectural Layout & Data Flow

Trackflow uses a decoupled client-server web architecture to safely pass data from input fields down to non-relational database collection models.

| Architectural Layer | Core Platform / Engine | Primary Data Communication Mechanism |
| :--- | :--- | :--- |
| **Frontend Client** | React.js (Vite + Tailwind CSS) | Dispatches asynchronous HTTP payload packages via Axios |
| **Backend Server** | Node.js + Express.js Router | Parses RESTful streams and verifies authentication states |
| **Database Tier** | MongoDB Atlas Cloud Cluster | Stores non-relational document instances persistently |

---

### 📁 Workspace Folder Directory Tree
```text
trackflow-root/
├── client/                  # Frontend React application workspace
│   ├── public/              # Static web assets
│   └── src/
│       ├── components/      # Shared high-level UI elements
│       ├── context/         # Global application state management
│       └── pages/           # Login.jsx, Register.jsx, Dashboard.jsx
├── server/                  # Backend Node.js system workspace
│   ├── config/              # Database connection cluster setups
│   ├── controllers/         # Request handling logic modules
│   ├── models/              # MongoDB data schemas (User, Job)
│   └── routes/              # RESTful request endpoint definitions
├── .gitignore               # Version tracking exclusion list
└── README.md                # Product documentation manual

```

---

## 🛣️ Production API Endpoints Map

### 🔑 User Authentication Registry

| HTTP Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Initializing new unique user account records |
| `POST` | `/api/auth/login` | Verifies security credentials and dispenses data tokens |

### 💼 Job Tracker Pipeline Management

| HTTP Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/jobs` | Retrieves personalized data lists linked to the authorized user account |
| `POST` | `/api/jobs` | Commits a new job application document to the database |
| `PUT` | `/api/jobs/:id` | Synchronizes edits made to job titles, status updates, interview dates, or text notes |
| `DELETE` | `/api/jobs/:id` | Safely extracts and deletes a target entry from the database cluster |

---

## 🚀 Local Installation & Deployment Guide

Follow these steps to run the complete environment locally on your development system:

### 1. Prerequisites Configuration

Ensure you have **Node.js** and **npm** installed on your terminal workspace.

### 2. Server Pipeline Setup

1. Open your terminal and change directories into the server workspace folder:

```bash
   cd server

```

2. Install the necessary system dependency modules:

```bash
   npm install

```

3. Set up your environment credentials.

> ⚠️ **CRITICAL SECURITY NOTICE:** Never commit your active `.env` file to source control. Instead, duplicate the included environment template:

```bash
   cp .env.example .env

```

4. Open the newly created `.env` file and fill in your connection variables:

```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_selected_security_passphrase

```

5. Start the backend database execution server:

```bash
   npm run dev

```

### 3. Client Frontend Setup

1. Open a new separate terminal window and step into the client web app workspace directory:

```bash
   cd client

```

2. Install the frontend visual layouts configuration packages:

```bash
   npm install

```

3. Start the dynamic client preview web page server:

```bash
   npm run dev

```

4. Open your browser and navigate to the local environment link provided (typically `http://localhost:5173`) to view the application.

---

## 📸 Platform Interface Preview

### 1. Unified Management Hub

The main tracking layout aggregates your full recruitment pipeline, complete with a functional metrics matrix table, step-by-step guidance cards, and real-time status queues.
<img width="680" height="640" alt="image" src="https://github.com/user-attachments/assets/3f0f2d86-5b55-4cd4-83b5-bc1520a57b19" />

### 2. Extended Application Workspace

Clicking on any job card opens a dedicated nested panel workspace, enabling you to schedule critical interview target dates and input detailed round summaries directly.
<img width="894" height="787" alt="image" src="https://github.com/user-attachments/assets/c464b17b-20d1-4d09-8f3c-28df5544b717" />


---

## 🧠 Core Engineering Learning Outcomes

* **Decoupled Architecture Syncing:** Implemented state verification across the lifecycle of independent development instances.
* **State Operations:** Created nested React state modifications to facilitate inline database text modifications inside active dashboard lists.
* **Secure Session Preservation:** Handled JWT token security structures through browser local storage parameters, maintaining session states across hard browser tab reloads.
* **Enterprise Database Querying:** Designed scalable database lookup parameters matching custom application fields cleanly across distinct project models.

```

```
