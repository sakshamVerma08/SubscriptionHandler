# Subscription Management System API

## 🤖 Introduction

Build a production-ready Subscription Management System API that handles real users, real money, and real business logic.

Authenticate users using JWTs, connect a database, create models and schemas, and integrate it with ORMs. Structure the architecture of your API to ensure scalability and seamless communication with the frontend.

If you're getting started and need assistance or face any bugs, join our active Discord community with over 50k+ members. It's a place where people help each other out.

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Security:** Arcjet for advanced rate limiting and bot protection
- **Logging & Debugging:** Custom logging mechanisms
- **Email Automation:** Upstash for email reminders

## 🔋 Features

- **Advanced Rate Limiting and Bot Protection**: Secure the whole app using Arcjet.
- **Database Modeling**: Models and relationships using MongoDB & Mongoose.
- **JWT Authentication**: Secure user authentication and authorization.
- **Global Error Handling**: Input validation and middleware integration.
- **Logging Mechanisms**: Debugging and monitoring.
- **Email Reminders**: Automate smart email reminders using Upstash.
- **Modular Code Structure**: Ensures code reusability and scalability.

---

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- npm (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/adrianhajdin/subscription-tracker-api.git
cd subscription-tracker-api
```

### Installation

Install dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following content:

```ini
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```

### Running the Project

```bash
npm run dev
```

Open `http://localhost:5500` in your browser or any HTTP client to test the project.

---

## 🕸️ API Routes

| Route                    | HTTP Method | Description                    |
| ------------------------ | ----------- | ------------------------------ |
| `/api/auth/register`     | POST        | Registers a new user           |
| `/api/auth/login`        | POST        | Logs in a user and returns JWT |
| `/api/users/:id`         | GET         | Fetches user details           |
| `/api/users/:id`         | PUT         | Updates user details           |
| `/api/subscriptions`     | POST        | Creates a new subscription     |
| `/api/subscriptions`     | GET         | Fetches all subscriptions      |
| `/api/subscriptions/:id` | GET         | Fetches subscription details   |
| `/api/subscriptions/:id` | DELETE      | Cancels a subscription         |

### Example API Request

#### Register User

**Endpoint:** `/api/auth/register`
**Method:** `POST`

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

#### Response

```json
{
  "message": "User registered successfully",
  "token": "your_jwt_token_here"
}
```

---

## 📌 License

This project is licensed under the MIT License. Feel free to modify and use it.

---

## 📞 Contact

For any issues, join our **Discord Community** with **50k+ members** or raise an issue on GitHub.

Happy Coding! 🚀
