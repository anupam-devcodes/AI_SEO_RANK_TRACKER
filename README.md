# RankPilot — AI-Powered SEO Analysis & Rank Tracking Platform

RankPilot is a backend-first SEO analytics platform designed to help users analyze websites, monitor keyword performance and generate actionable SEO insights through a secure, API-driven workflow.

The repository includes a web client that consumes the platform APIs and supports end-to-end feature validation. The primary engineering focus of this implementation is the backend and data layer: authentication, API development, MongoDB modelling, service integrations and deployment.

---

## Project Status

**Currently implemented**

* Express.js server setup and REST API structure
* MongoDB Atlas connection using Mongoose
* User schema and account persistence
* Secure registration and login flow
* Password hashing using bcrypt
* JWT-based authentication
* Protected current-user profile endpoint
* Client-to-server authentication integration using Axios
* Environment-based configuration

**Planned modules**

* Website SEO audit workflow
* Browser automation and website data collection
* AI-generated SEO recommendations
* SEO report persistence and history
* Keyword rank monitoring
* Usage limits based on user plans
* Production deployment and monitoring

---

## Problem Statement

SEO analysis tools often require users to switch between multiple platforms for authentication, website auditing, keyword tracking and report management.

RankPilot aims to provide a unified workflow where a user can:

1. Create an account securely.
2. Submit a website for SEO analysis.
3. Receive structured recommendations.
4. Monitor keyword performance over time.
5. Access saved reports from a personalized dashboard.

---

## Backend Engineering Focus

The backend is designed around secure and maintainable API development.

### Current backend responsibilities

* User registration and authentication
* Password hashing before database storage
* JWT generation and verification
* Protected route authorization
* MongoDB document modelling
* Consistent API response structures
* Integration support for the client application

### Upcoming backend responsibilities

* SEO analysis job handling
* Browser automation integration
* AI recommendation generation
* Report and rank-history storage
* Plan-based usage control
* Deployment configuration and environment security

---

## Authentication Flow

```text
User registers or logs in
        ↓
Express controller validates input
        ↓
MongoDB stores or retrieves user data
        ↓
bcrypt hashes or verifies password
        ↓
JWT token is generated
        ↓
Client stores token and sends it in future requests
        ↓
Protected middleware verifies JWT
        ↓
Authorized user accesses protected resources
```

---

## Current API Endpoints

### Authentication

| Method | Endpoint             | Description                         | Access    |
| ------ | -------------------- | ----------------------------------- | --------- |
| `POST` | `/api/auth/register` | Create a new user account           | Public    |
| `POST` | `/api/auth/login`    | Authenticate user and return token  | Public    |
| `GET`  | `/api/auth/me`       | Return currently authenticated user | Protected |

### Register User

**Request**

```json
{
  "name": "Anupam",
  "email": "user@example.com",
  "password": "securePassword"
}
```

**Response**

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "mongodb-user-id",
    "name": "Anupam",
    "email": "user@example.com",
    "plan": "free"
  }
}
```

### Login User

**Request**

```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

**Response**

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "mongodb-user-id",
    "name": "Anupam",
    "email": "user@example.com",
    "plan": "free"
  }
}
```

### Get Current User

**Request Header**

```http
Authorization: Bearer <jwt-token>
```

**Response**

```json
{
  "id": "mongodb-user-id",
  "name": "Anupam",
  "email": "user@example.com",
  "plan": "free",
  "analysisCount": 0
}
```

---

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token
* bcrypt
* CORS
* dotenv

### Client Integration

* React
* TypeScript
* Vite
* Axios
* Tailwind CSS

### Planned Integrations

* Gemini API for AI-generated SEO insights
* Browser automation service for website data extraction
* Deployment platform for production hosting

---

## Project Structure

```text
rankpilot-ai-seo-platform/
│
├── client/                         # Web client consuming backend APIs
│   └── src/
│       ├── context/                # Authentication and API context
│       └── pages/                  # User-facing pages
│
├── server/                         # Backend application
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   │
│   ├── controllers/
│   │   └── authcontroller.js       # Register, login and profile logic
│   │
│   ├── middlewares/
│   │   └── auth.js                 # JWT route protection
│   │
│   ├── models/
│   │   └── User.js                 # User database schema
│   │
│   ├── routes/
│   │   └── authRoutes.js           # Authentication endpoints
│   │
│   ├── package.json
│   └── server.js                   # Express entry point
│
└── README.md
```

---

## Local Setup

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* A MongoDB Atlas account

### Clone Repository

```bash
git clone https://github.com/anupam-devcodes/rankpilot-ai-seo-platform.git
cd rankpilot-ai-seo-platform
```

---

## Backend Setup

Move into the server directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Start the backend development server:

```bash
npm run server
```

Backend server will run on:

```text
http://localhost:5000
```

---

## Client Setup

Open another terminal and move into the client directory:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

Start the client application:

```bash
npm run dev
```

---

## Environment Variables

### Server

| Variable      | Purpose                                       |
| ------------- | --------------------------------------------- |
| `PORT`        | Port on which Express server runs             |
| `MONGODB_URI` | MongoDB Atlas database connection string      |
| `JWT_SECRET`  | Secret key used to sign and verify JWT tokens |

### Client

| Variable           | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `VITE_BACKEND_URL` | Base URL used by the client for API requests |

> Never commit `.env` files or secret keys to GitHub.

---

## Security Practices Implemented

* Passwords are hashed before being stored in MongoDB.
* JWT tokens are generated only after successful authentication.
* Protected routes require a valid bearer token.
* Password values are excluded from user-profile responses.
* Sensitive configuration is managed through environment variables.

---

## Planned Backend Roadmap

* [x] Express server setup
* [x] MongoDB Atlas connection
* [x] User model
* [x] Registration and login APIs
* [x] JWT authentication middleware
* [x] Protected current-user endpoint
* [ ] Website analysis model and APIs
* [ ] SEO report storage
* [ ] Browser automation integration
* [ ] Gemini-powered recommendations
* [ ] Keyword tracking history
* [ ] Free/pro usage enforcement
* [ ] Production deployment

---

## Key Learning Outcomes

This project demonstrates practical backend engineering concepts including:

* REST API development using Express
* Database modelling using MongoDB and Mongoose
* Authentication using bcrypt and JWT
* Route protection through middleware
* API contract integration with a web client
* Secure environment configuration
* Building toward AI-enabled backend workflows

---

## License

This repository includes component-level licence information. Please refer to the licence files included within the relevant project directories.

---

## Maintainer

**GitHub:** `@anupam-devcodes`
