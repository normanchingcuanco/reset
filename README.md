# 🔄 RESET

RESET is a fullstack content platform built using the **MEVN stack (MongoDB, Express, Vue, Node.js)** designed for professionals transitioning into technology careers.

The platform documents the **real journey of switching careers into software development**, focusing on practical strategy, mindset shifts, and the learning process required to succeed in tech.

RESET serves as both:

- A **technical portfolio demonstrating fullstack development**
- A **content platform supporting career shifters entering tech**

---

# 🚀 Overview

RESET is a professional knowledge platform built for **career changers moving into software development**.

The platform provides:

- Articles documenting the transition into tech
- Structured guidance for career shifters
- Advisor insights from professionals who have transitioned successfully
- A long-term content hub for strategy, learning, and career positioning

The project also serves as a **technical demonstration of a fullstack MEVN application**.

---

# 🧩 Core Features

## 👥 User Features

### Public Access

- Browse all published articles
- Read full blog posts
- View transition advisor profiles
- Access structured career transition guides
- Navigate content through advisor insights and platform articles

### Authentication

- User registration with email, username, and password
- Secure login using **JWT authentication**
- Password hashing using **bcrypt**
- Role-based access control

### Authenticated Users

- Create blog posts
- Edit personal blog posts
- Delete personal blog posts
- Submit applications to become transition advisors

---

# 🛠 Admin Features

- Admin dashboard for platform management
- Create advisor profiles
- Edit advisor profiles
- Activate or deactivate advisor accounts
- Delete advisor profiles
- Delete any blog post
- Manage advisor applications

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Authenticate and receive JWT |

## Posts

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/posts | Fetch all blog posts |
| GET | /api/posts/:id | Fetch single blog post |
| POST | /api/posts | Create new post |
| PATCH | /api/posts/:id | Update post |
| DELETE | /api/posts/:id | Delete post |
| PATCH | /api/posts/views/:id | Increment post views |

## Advisors

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/advisors | Fetch all advisors |
| GET | /api/advisors/:slug | Fetch advisor profile |
| GET | /api/advisors/:slug/posts | Fetch posts by advisor |
| POST | /api/advisors | Create advisor (Admin) |
| PUT | /api/advisors/:id | Update advisor (Admin) |
| DELETE | /api/advisors/:id | Delete advisor (Admin) |

## Advisor Applications

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/advisors/apply | Submit advisor application |

---

# 📊 Feature Completion Status

---

## 1. Core Application Features

| Feature | Description | Status |
|------|------|------|
| User Registration | Allow users to create an account using email, username, and password | ✅ Complete |
| User Login (JWT) | Authenticate users securely using JSON Web Tokens | ✅ Complete |
| Password Hashing | Secure password storage using bcrypt | ✅ Complete |
| Role-Based User System | Support Admin, Advisor, and Standard User roles | ✅ Complete |
| Blog Post Creation | Authenticated users can publish articles | ✅ Complete |
| Blog Post Editing | Authors and admins can edit posts | ✅ Complete |
| Blog Post Deletion | Authors and admins can delete posts | ✅ Complete |
| Blog Post Viewing | Public users can read all posts | ✅ Complete |
| Post View Tracking | Track article view counts | ✅ Complete |
| Search Posts | Search by title, advisor name, or author username | ✅ Complete |

---

## 2. Advisor Platform Features

| Feature | Description | Status |
|------|------|------|
| Advisor Directory | Dedicated page listing transition advisors | ✅ Complete |
| Advisor Profiles | Individual advisor pages with professional details | ✅ Complete |
| Advisor–Post Association | Posts can be linked to advisors | ✅ Complete |
| Advisor Article Aggregation | Advisor profiles display their authored posts | ✅ Complete |
| Advisor Application System | Users can apply to become advisors | ✅ Complete |
| Advisor Application Authentication Guard | Applications require authenticated users | ✅ Complete |
| Admin Advisor Approval Workflow | Admin dashboard controls advisor approvals | ✅ Complete |
| Advisor Profile Editing | Admin can update advisor profiles | ✅ Complete |

---

## 3. Platform Content Features

| Feature | Description | Status |
|------|------|------|
| About RESET Page | Platform overview describing RESET mission | ✅ Complete |
| Career Shift Guide (Start Here Page) | Structured roadmap for career transition | ✅ Complete |
| YouTube Integration | Link to creator YouTube channel | ✅ Complete |
| Advisor Insight Articles | Articles linked to advisor expertise | ✅ Complete |

---

## 4. Performance & Architecture

| Feature | Description | Status |
|------|------|------|
| RESTful API Design | Structured backend endpoints | ✅ Complete |
| Structured Controllers | Organized backend architecture | ✅ Complete |
| Axios API Layer | Centralized frontend API communication | ✅ Complete |
| Database Indexing | Indexed key fields for faster queries | ✅ Complete |
| Response Compression | Reduced payload sizes using compression middleware | ✅ Complete |

---

## 📸 Screenshots

### Homepage
![Homepage](client/public/pages%20images/homepage.jpg)

### Blog Article Page
![Blog Article](client/public/pages%20images/blog-article-page.jpg)

### Advisors Directory
![Advisors Directory](client/public/pages%20images/advisors-page.jpg)

### Admin Dashboard
![Admin Dashboard](client/public/pages%20images/admin-dashboard.jpg)
---

# 📂 Project Structure

```text
reset
│
├── server
│   ├── controllers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── advisorController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Advisor.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── advisorRoutes.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   └── index.js
│
├── client
│   ├── src
│   │   ├── pages
│   │   │   ├── Home.vue
│   │   │   ├── PostDetails.vue
│   │   │   ├── Advisors.vue
│   │   │   ├── AdvisorProfile.vue
│   │   │   ├── AdminDashboard.vue
│   │   │   ├── Login.vue
│   │   │   └── Register.vue
│   │   │
│   │   ├── router
│   │   │   └── index.js
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── main.js
│   │   └── styles.css
│   │
│   └── vite.config.js
│
└── README.md

```

---

## 🏗 Tech Stack

**Frontend**

- Vue 3
- Vite
- Vue Router
- Axios

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication**

- JSON Web Tokens (JWT)
- bcrypt password hashing

**Deployment**

- Render (Backend API)
- Vercel (Frontend)

---

## 🌐 Live Deployment

### Frontend (Vercel)

https://reset-platform.vercel.app

### Backend API (Render)

https://reset-backend.onrender.com