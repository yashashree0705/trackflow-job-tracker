# TRACKFLOW | Job Application Management Platform

An analytical, full-stack application tracking platform built to empower students and professionals to organize, optimize, and streamline their career development lifecycles. Trackflow bridges the gap between chaotic spreadsheets and high-level pipeline status oversight.

---

##  Problem Statement
During competitive hiring cycles, tracking multiple open job applications across various employment portals becomes disorganized. Applicants often struggle to accurately log timeline sequences, coordinate interview follow-up dates, and calculate overall conversion metrics. Trackflow fixes this by providing an interface that aggregates data entry points into an analytical control panel.

##  Key Features
* **Authentication Architecture:** Secured profile space mapping individual datasets to verified user profiles.
* **Pipeline Management Panel:** Real-time data logging for position titles, companies, and application progress categories.
* **Granular Tracking Workspace:** Section components inside list rows dedicated to updating individual interview schedules and logging precise case notes.
* **Analytical Metrics Summary:** Automated high-level calculations displaying Total Applications, Active Interview Processes, and overall Success Conversion Ratios.
* **Dynamic Query Filtering:** Search functionality coupled with dedicated categorization filters to sort entries by current pipeline status immediately.

##  Technology Stack
* **Frontend UI Framework:** React.js (Vite environment) using custom Tailwind CSS utility layouts
* **Backend Run-time Environment:** Node.js with Express.js RESTful routing architecture
* **Database Cluster Solution:** MongoDB Atlas distributed cloud storage engine
* **Communication Layer Middleware:** Axios HTTP asynchronous pipeline handling

---

##  Architectural Layout & Data Flow
Trackflow uses a decoupled client-server web architecture to safely pass data from input fields down to non-relational database collection models.

[React Client Frontend] <---(Axios JSON Streams)---> [Express Router Backend] <---> [MongoDB Atlas Cloud Cluster]


### 📁 Workspace Folder Directory Tree
trackflow-root/
├── client/                 # Frontend application workspace
│   ├── public/             # Static web assets
│   └── src/
│       ├── components/     # High-level UI elements
│       └── pages/          # Login.jsx, Register.jsx, Dashboard.jsx
├── server/                 # Backend system workspace
│   ├── config/             # Database connection setups
│   ├── models/             # MongoDB data models (User, Job Schema)
│   └── routes/             # RESTful request endpoint definitions
├── .gitignore              # Version tracking exclusion list
└── README.md               # Product documentation manual


---

## 🛣️ Production API Endpoints Map

### User Authentication Registry
* `POST /api/auth/register` — Initializing new unique user account records.
* `POST /api/auth/login` — Verifies security credentials and dispenses data tokens.

### Job Tracker Pipeline Management
* `GET /api/jobs` — Retrieves personalized data lists linked to the authorized user account.
* `POST /api/jobs` — Commits a new job application document to the database.
* `PUT /api/jobs/:id` — Synchronizes edits made to job titles, status updates, interview dates, or text notes.
* `DELETE /api/jobs/:id` — Safely extracts and deletes a target entry from the database cluster.

---

## 🚀 Local Installation & Deployment Guide

Follow these steps to run the complete environment locally on your development system:

### 1. Prerequisites Configuration
Ensure you have **Node.js** and **npm** installed on your terminal workspace.

### 2. Server Pipeline Setup
1. Open your terminal and change directories into the server workspace folder:
   ```bash
   cd server
Install the necessary system dependency modules:

Bash
npm install
Set up your environment credentials. Never commit your .env file to source control. Instead, duplicate the included environment template:

Bash
cp .env.example .env
Open the newly created .env file and fill in your connection variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_selected_security_passphrase
Start the backend database execution server:

Bash
npm run dev
3. Client Frontend Setup
Open a new separate terminal window and step into the client web app workspace directory:

Bash
cd client
Install the frontend visual layouts configuration packages:

Bash
npm install
Start the dynamic client preview web page server:

Bash
npm run dev
Open your browser and navigate to the local environment link provided (typically http://localhost:5173) to view the application.
