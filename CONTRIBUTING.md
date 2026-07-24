# Contributing to Samridhi Enterprises

Thank you for your interest in contributing to Samridhi Enterprises! We welcome contributions from everyone.

This project is part of **ELUSOC 2026**. Please follow the guidelines below to ensure a smooth contribution process.

---

## 📌 Project Overview

Samridhi Enterprises is a MERN stack e-commerce platform for vehicle spare parts. It features user authentication, product management, cart functionality, and an admin dashboard.

**Stack:** React + Vite (frontend), Node.js + Express (backend), MongoDB + Mongoose (database), Cloudinary (images), Brevo (email), Vercel (deployment).

---

## 🚀 First-Time Contributor Onboarding

If this is your first contribution to this project, follow these steps exactly:

### 1. Fork the repository

Click **Fork** at the top right of the GitHub repository page. This creates your own copy under your account.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/samridhi-enterprises.git
cd samridhi-enterprises
```

### 3. Add the upstream remote

```bash
git remote add upstream https://github.com/SRV30/samridhi-enterprises.git
```

This lets you pull in future changes from the original repo.

### 4. Create a branch from `elusoc`

```bash
git checkout elusoc
git pull upstream elusoc
git checkout -b feature/your-feature-name
```

Always branch off `elusoc`, not `main`. Use descriptive branch names:

- `feature/add-search-filter`
- `bugfix/cart-quantity-error`
- `docs/improve-readme`

### 5. Set up your local environment

Follow the **Local Development Setup** section in the [README.md](./README.md) to get both the server and client running locally before making any changes.

### 6. Make your changes

- Keep your changes focused — one issue per PR.
- Test your changes locally before committing.
- Follow the coding standards below.

### 7. Commit your changes

```bash
git add path/to/changed/file
git commit -m "feat: add search filter to product listing"
```

See [Commit Message Conventions](#-commit-message-conventions) below.

### 8. Push and open a PR

```bash
git push origin feature/your-feature-name
```

Then go to your fork on GitHub and click **Compare & pull request**. Make sure the base branch is set to `SRV30/samridhi-enterprises:elusoc`.

In your PR:

- Write a clear title and description.
- Reference the issue it closes: `Closes #N`.
- Describe what you changed and why.

### 9. Respond to review

A Project Admin will review your PR. If changes are requested, push new commits to the same branch — the PR updates automatically.

---

## 🛠️ Local Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SRV30/samridhi-enterprises.git
   cd samridhi-enterprises
   ```

2. **Setup Backend:**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your credentials (see README for details)
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Set VITE_BACKEND_URL=http://localhost:5000
   npm run dev
   ```

See [README.md](./README.md) for detailed guides on MongoDB Atlas, Cloudinary, and Brevo setup.

---

## 🌿 Branch Strategy

| Branch        | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `main`        | Production-ready code                           |
| `elusoc`      | Target branch for all ELUSOC 2026 contributions |
| `feature/...` | New features                                    |
| `bugfix/...`  | Bug fixes                                       |
| `docs/...`    | Documentation changes                           |

> ⚠️ **All ELUSOC contributions must target the `elusoc` branch, not `main`.**

---

## 💻 Coding Standards

- Use functional components with Hooks in React.
- Follow ESLint configurations provided in the `client` directory.
- Use meaningful variable and function names.
- Keep components small and reusable.
- Ensure proper error handling in both frontend and backend.
- Do not leave `console.log` statements in production code.

---

## 💬 Commit Message Conventions

We follow Conventional Commits:

| Prefix      | When to use                                     |
| ----------- | ----------------------------------------------- |
| `feat:`     | New feature                                     |
| `fix:`      | Bug fix                                         |
| `docs:`     | Documentation changes                           |
| `style:`    | Formatting only (no logic change)               |
| `refactor:` | Code change that is neither a fix nor a feature |
| `chore:`    | Build process, dependency updates               |

**Examples:**

```
feat: add search functionality to product page
fix: resolve cart quantity not updating on remove
docs: add MongoDB Atlas setup guide to README
```

---

## 🚀 Pull Request Workflow

1. Fork the repository.
2. Create a new branch from `elusoc`.
3. Make your changes and commit them following the conventions above.
4. Push your branch to your fork.
5. Open a Pull Request targeting `SRV30/samridhi-enterprises:elusoc`.
6. Link the PR to the relevant issue using `Closes #N` in the PR body.
7. Address any feedback during review.

---

## 🏆 ELUSOC Contribution Workflow

1. Browse existing issues or create a new one.
2. Comment on the issue expressing your interest and your plan.
3. Wait for the issue to be assigned to you by a Project Admin.
4. Start working only after assignment.
5. Submit your PR before the deadline.
6. Address any feedback provided during the review.

---

## 🎫 Issue Assignment Process

- Comment on an open issue with your interest and a brief plan.
- Project Admins will assign based on your plan and current workload.
- **Do not start working on an issue unless it is officially assigned to you.**
- Check existing issues and PRs before creating new ones — avoid duplicates.

---

Happy Contributing! 🚗
