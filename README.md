# 🍽️ Local Eats

A full-stack food ordering platform built with the MERN stack, enabling users to browse menus, place orders, and complete secure payments in real time.

---

## 🚀 Features

* 🔐 **Secure Authentication**

  * JWT-based authentication with Bcrypt password hashing
  * Persistent user sessions and protected routes

* 🛒 **Real-Time Ordering**

  * Dynamic cart management and order placement
  * Live updates for order status and user actions

* 💳 **Payment Integration**

  * Integrated Stripe for secure and seamless checkout experience

* ⚡ **Scalable Backend**

  * RESTful APIs deployed using Vercel serverless functions
  * Efficient handling of concurrent user requests

---

## 🧱 Tech Stack

**Frontend**

* React.js
* Axios
* Context API / State Management

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)

**Infrastructure & Tools**

* Vercel (Serverless Deployment)
* Stripe API (Payments)
* JWT + Bcrypt (Authentication)

---

## 🧠 System Architecture

```text
Client (React)
     ↓
REST API (Express / Vercel Serverless)
     ↓
MongoDB Database
     ↓
Stripe API (Payments)
```

* Frontend communicates with backend via REST APIs
* Backend handles authentication, order processing, and payment logic
* Stripe manages secure payment transactions
* MongoDB stores user, order, and menu data

---

## 🔑 Key Engineering Decisions

* **Serverless Deployment (Vercel)**
  Enables scalable API handling without managing infrastructure, ideal for handling variable traffic loads.

* **JWT Authentication**
  Ensures stateless and secure user sessions across requests.

* **Separation of Concerns**
  Clean separation between frontend, backend, and payment services improves maintainability and scalability.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ivanpan0626/LocalEats.git
cd HunanExpress
```

### 2. Install dependencies

```bash
# Frontend
cd HunanExpress
npm install
```

### 3. Run the application

```bash
# Backend
npm run dev

# Frontend
npm start
```

---

## 📈 Future Improvements

* 📊 Order analytics dashboard for admins
* 🤖 AI-powered meal recommendations (LLM + RAG integration)
* 📦 Order tracking with real-time notifications
* 🔍 Search and filtering optimization

## 💡 Summary

Local Eats demonstrates full-stack development with secure authentication, real-time interactions, and scalable serverless deployment—mirroring real-world food ordering systems.

---
