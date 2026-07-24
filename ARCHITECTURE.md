# Samridhi Enterprises Architecture

Welcome to the Samridhi Enterprises technical architecture documentation. This document describes the design, layout, tech stack, and key workflows of the Samridhi Enterprises vehicle spare-parts e-commerce platform.

---

## 1. High-Level Design

Samridhi Enterprises is built on the **MERN** stack, split into two primary components:

- **`client/`**: A React single-page application built with Vite and Tailwind CSS.
- **`server/`**: An Express REST API backend backed by MongoDB (Mongoose) and Node.js.

```
┌─────────────────────────────┐         ┌──────────────────────────────┐
│           CLIENT            │  HTTPS  │            SERVER            │
│  React + Vite SPA           │ ──────► │  Express REST API (/api/*)   │
│                             │  JSON / │                              │
│  • Redux Toolkit (state)    │  multipart                            │
│  • React Router (routing)   │         │  Route → Middleware →        │
│  • Axios (HTTP, Bearer)     │ ◄────── │  Controller → Model          │
│  • Tailwind CSS (styling)   │  JSON   │                              │
└─────────────────────────────┘         └───────────────┬──────────────┘
                                                         │
                          ┌──────────────────────────────┼───────────────────┐
                          ▼                               ▼                   ▼
                 ┌─────────────────┐            ┌──────────────────┐  ┌──────────────┐
                 │  MongoDB Atlas  │            │   Cloudinary     │  │    Brevo     │
                 │   (Mongoose)    │            │ (image storage)  │  │ (email OTP)  │
                 └─────────────────┘            └──────────────────┘  └──────────────┘
```

---

## 2. Monorepo Layout & Directories

```
samridhi-enterprises/
├── client/              # React Vite frontend application
│   ├── src/
│   │   ├── api/         # Axios config and API calls
│   │   ├── components/  # Shared React components (header, footer, buttons, etc.)
│   │   ├── store/       # Redux Toolkit store and slices
│   │   └── pages/       # Page components (Home, Cart, Admin, Profile, Products)
│   └── package.json
├── server/              # Express Node.js backend
│   ├── config/          # Mongoose DB connector
│   ├── route/           # Express router definitions
│   ├── middleware/      # Authentication, file upload, error handling
│   ├── controllers/     # Request handlers and business logic
│   ├── models/          # Mongoose Schemas (User, Part, Order, etc.)
│   ├── utils/           # Pricing validators, token utilities, state helpers
│   └── package.json
├── docs/                # Comprehensive workflow guides and API references
├── .github/             # GitHub Actions CI workflows
└── package.json         # Root workspace Prettier formatting scripts
```

---

## 3. Technology Stack

- **Runtime Environment**: Node.js (ES modules: `"type": "module"`)
- **API Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: Stateless JSON Web Tokens (`jsonwebtoken`), hashed via `bcryptjs`
- **File Uploads**: `multer` parsing with Cloudinary cloud storage
- **Email Delivery**: Brevo API via `sib-api-v3-sdk`
- **Frontend SPA**: React (Vite bundler)
- **Client State Management**: Redux Toolkit
- **Styling Framework**: Tailwind CSS
- **Testing Runner**: Node.js Native Test Runner (`node:test`)

---

## 4. Key Workflows

### 4.1 Authentication & Authorization

Users authenticate using stateless JWTs. On registration, users must verify their email using an OTP sent via Brevo. The JWT holds the user's `id` and `role` (`USER`, `MANAGER`, or `ADMIN`), and route access is guarded by authentication and role-based permissions middleware.

### 4.2 Order Placement & Inventory Reservation

During checkout, the system validates the fresh price and stock information from the database to prevent stale pricing or overselling. Order updates are handled transactionally to preserve stock consistency.

### 4.3 Support Tickets

Authenticated users can create support tickets. Admins and managers can view, resolve, and update ticket statuses in the admin dashboard.
