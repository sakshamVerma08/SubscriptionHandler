# 📦 Subscription Handler API

This is a fully backend-focused API built using Node.js and Express. It allows users to manage subscriptions, receive email reminders, and handle authentication securely with bot protection and workflow automation.

---

## 🛠 Technologies Used

- **Node.js + Express** – Server-side development
- **MongoDB + Mongoose** – Database layer
- **Nodemailer** – For sending email reminders
- **Upstash** – Workflow automation (delayed reminder scheduling)
- **Arcjet** – Bot protection
- **Postman** – For API testing

---

## 📌 API Endpoints with Example Requests/Responses

### 🔐 Auth Routes (`/api/auth`)

#### POST `/sign-up`
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "user": { "id": "abc123", "name": "John Doe", "email": "john@example.com" }
}
```

#### POST `/sign-in`
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "Sign-in successful",
  "token": "jwt-token-here"
}
```

#### POST `/sign-out`
**Response:**
```json
{
  "message": "User signed out successfully"
}
```

---

### 📄 User Routes (`/api/users`)

#### GET `/`
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
[ { "id": "1", "name": "John" }, { "id": "2", "name": "Jane" } ]
```

#### GET `/:id`
**Response:**
```json
{ "id": "1", "name": "John", "email": "john@example.com" }
```

#### POST `/`
**Mock Response:**
```json
{ "title": "POST user router" }
```

#### PUT `/:id`
**Mock Response:**
```json
{ "title": "PUT user route" }
```

#### DELETE `/:id`
**Mock Response:**
```json
{ "title": "DELETE user route" }
```

---

### 📦 Subscription Routes (`/api/subscriptions`)

#### GET `/`
**Response:**
```json
[ { "id": "sub123", "name": "Netflix", "price": 10 }, { "id": "sub124", "name": "Spotify", "price": 5 } ]
```

#### GET `/user/:id`
**Response:**
```json
[ { "userId": "1", "name": "Netflix" } ]
```

#### POST `/`
**Request Body:**
```json
{
  "userId": "1",
  "name": "Netflix",
  "price": 10,
  "frequency": "monthly",
  "renewalDate": "2025-05-01"
}
```
**Response:**
```json
{ "message": "Subscription created successfully" }
```

#### POST `/:id`
**Mock Response:**
```json
{ "title": "CREATE particular subscription" }
```

#### PUT `/:id`
**Mock Response:**
```json
{ "title": "UPDATE particular subscription" }
```

#### DELETE `/:id`
**Mock Response:**
```json
{ "title": "DELETE particular subscription" }
```

#### PUT `/:id/cancel`
**Mock Response:**
```json
{ "title": "CANCEL particular subscription" }
```

#### GET `/users/:id`
**Mock Response:**
```json
{ "title": "GET all the subscriptions of a single user" }
```

#### GET `/upcoming-renewals`
**Mock Response:**
```json
{ "title": "GET upcoming subscription renewals" }
```

---

### ⏰ Workflow Routes (`/api/workflow`)

#### POST `/subscription/reminder`
**Request Body:**
```json
{
  "subscriptionId": "sub123"
}
```
**Response:**
```json
{ "message": "Reminder workflow initiated" }
```

---

## 🧪 How to Test
This is a **backend-only** API. Use **Postman** to test all endpoints by sending appropriate HTTP requests.

---

## 🙌 Special Thanks
Huge thanks to **JavaScript Mastery** for the amazing tutorial that inspired this project!

---

## ⚠️ Notes
- Most routes are protected and require authentication.
- Email reminders are dynamically scheduled via Upstash workflows.
- Arcjet ensures API bot protection.

---

Happy Building! 🚀

