# Medium Clone

A full-stack blogging platform inspired by Medium, built with modern serverless technologies. Users can create accounts, publish articles, and manage their content through a responsive and scalable web application.

## 🚀 Live Demo

[Live Application](YOUR_DEPLOYMENT_URL)

## ✨ Features

- User Authentication (JWT)
- Create, Edit & Delete Blogs
- Rich Blog Reading Experience
- Responsive UI
- Protected Routes
- Serverless Backend
- REST API Architecture
- PostgreSQL Database Integration

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Tailwind CSS

### Backend
- Hono
- Cloudflare Workers
- JWT Authentication
- Zod Validation

### Database
- PostgreSQL
- Prisma / Drizzle ORM

### Deployment
- Cloudflare Workers
- Cloudflare Pages

## 🏗️ Architecture

```text
React Frontend
      │
      ▼
Cloudflare Workers (Hono API)
      │
      ▼
 PostgreSQL Database
```

## 📂 Project Structure

```text
Medium/
├── frontend/
│   ├── src/
│   └── public/
│
├── backend/
│   ├── src/
│   ├── migrations/
│   └── wrangler.jsonc
│
└── README.md
```

## 🔑 Environment Variables

Create a `.env` or `.dev.vars` file:

```env
DATABASE_URL=
JWT_SECRET=
```

For production, configure secrets using:

```bash
wrangler secret put DATABASE_URL
wrangler secret put JWT_SECRET
```

## ⚡ Getting Started

### Clone Repository

```bash
git clone https://github.com/PrinceKakadiya02/Medium.git
cd Medium
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Apply Database Migrations

```bash
npm run migrate
```

## 🎯 Learning Outcomes

This project helped me gain hands-on experience with:

- Building REST APIs using Hono
- Cloudflare Workers Serverless Architecture
- Authentication & Authorization
- PostgreSQL Database Design
- ORM Migrations
- Full Stack Application Deployment
- TypeScript Across the Entire Stack

## 📸 Screenshots

Add screenshots here to showcase:
- Landing Page
- Blog Feed
- Editor Page
- Authentication Screens

## 👨‍💻 Author

Prince Kakadiya

GitHub: https://github.com/PrinceKakadiya02