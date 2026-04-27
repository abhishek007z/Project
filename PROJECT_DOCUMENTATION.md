# Resume Builder + AI Mock Interview Platform

## 1. Project Overview
This repository implements a full-stack Resume Builder and Mock Interview platform with AI assistance. It includes:
- Resume creation and preview (multi-phase forms)
- AI chatbot for career guidance
- AI-driven mock interview question generation and answer evaluation
- Multiple interview styles (India, US, Europe, Startup, MNC)
- JWT-based authentication and protected routes

This document describes architecture, folder structure, feature details, and how to run the app.

---

## 2. High-Level Architecture

### Backend (Node.js + Express)
- **Server entrypoint**: `Backend/Backend/server.js`
- **Routes**: `Backend/Backend/routes/*.js`
- **Controllers**: `Backend/Backend/controllers/*.js`
- **Models**: `Backend/Backend/models/*.js`
- **Middleware**: `Backend/Backend/middlewares/authMiddleware.js`
- **Configs**: `Backend/Backend/configs/*.js`

### Frontend (React + Vite + Tailwind)
- **App root**: `Frontend/Frontend/src/App.jsx`
- **Pages**: `Frontend/Frontend/src/pages/*.jsx`
- **Components**: `Frontend/Frontend/src/components/*.jsx`
- **State**: `Frontend/Frontend/src/app/store.js` and `Frontend/Frontend/src/app/features/authSlice.js`
- **API client**: `Frontend/Frontend/src/configs/api.js`

---

## 3. Feature Breakdown

### 3.1 Resume Builder
- Multi-step forms for: personal info, education, experience, projects, skills, achievements, summary
- Resume preview with templates (`ClassicTemplate`, `MinimalTemplate`, etc.)
- Save and update resume data via backend APIs

### 3.2 Mock Interview
- AI question generation based on resume and selected interview style
- AI answer evaluation with style-specific feedback
- Interview styles:
  - Indian HR
  - US Interview
  - European Corporate
  - Startup Culture
  - MNC Corporate
- Feedback includes: overall score, style rating, communication match, and improvement tips

### 3.3 AI Chatbot
- Fixed-position chat UI with open/close/minimize
- Chat suggestions and live AI responses
- Uses backend AI controller and chatbot route

### 3.4 Authentication
- JWT authentication on backend with protected routes
- Login/Signup flow maintained via state and token storage in frontend

---

## 4. Key Files and Purpose

### Backend
- `Backend/Backend/server.js`: Express app setup, middleware, route mounting
- `Backend/Backend/routes/UserRoutes.js`: User login/signup and profile endpoints
- `Backend/Backend/routes/ResumeRoutes.js`: Resume CRUD APIs
- `Backend/Backend/routes/mockInterviewRoutes.js`: AI question/evaluation endpoints
- `Backend/Backend/routes/chatbotRoutes.js`: Chatbot endpoints
- `Backend/Backend/controllers/*`: Business logic for each route
- `Backend/Backend/configs/ai.js`: AI model setup and wrapper logic
- `Backend/Backend/models/*`: Mongoose schemas

### Frontend
- `Frontend/Frontend/src/pages/Login.jsx`: Authentication UI
- `Frontend/Frontend/src/pages/ResumeBuilder.jsx`: Phase 1 (core forms)
- `Frontend/Frontend/src/pages/ResumeBuilderPhase2.jsx`: Additional forms
- `Frontend/Frontend/src/pages/ResumeBuilderPhase3.jsx`: Interview style and evaluation UI
- `Frontend/Frontend/src/pages/Chatbot.jsx`: Chat UI
- `Frontend/Frontend/src/pages/Dashboard.jsx`: Main dashboard
- `Frontend/Frontend/src/components/ResumePreview.jsx`: Render resume preview
- `Frontend/Frontend/src/configs/api.js`: Axios instance for API calls
- `Frontend/Frontend/src/app/features/authSlice.js`: Redux auth logic

---

## 5. API Endpoints

### Auth / User
- `POST /api/users/login` - login user
- `POST /api/users/register` - register user
- `GET /api/users/profile` - get current user profile (protected)

### Resume
- `POST /api/resumes` - create resume (protected)
- `GET /api/resumes/:id` - get resume by id (protected)
- `PUT /api/resumes/:id` - update resume (protected)
- `GET /api/resumes` - list user resumes (protected)

### Mock Interview
- `POST /api/mock-interview/question` - generate interview question (protected)
- `POST /api/mock-interview/evaluate` - evaluate candidate answer (protected)

### Chatbot
- `POST /api/chatbot/chat` - send message to AI chatbot (protected)
- `GET /api/chatbot/suggestions` - get chat starter suggestions (protected)

---

## 6. Data Flow and User Journey

1. User signs up / logs in.
2. User builds resume in phases.
3. User previews and saves resume.
4. User navigates to mock interview.
5. User selects interview style and generates AI question.
6. User submits answer and receives AI feedback.
7. User can open chatbot for AI career guidance.

---

## 7. Running the Project Locally

### Backend

1. Open `Backend/Backend` folder
2. Install dependencies: `npm install`
3. Start server: `npm run dev` or `node server.js`

### Frontend

1. Open `Frontend/Frontend` folder
2. Install dependencies: `npm install`
3. Start app: `npm run dev`

> Make sure your own local configuration (database URI, API keys) is set in appropriate config files as described in your project setup. This document does not include secret keys.

---

## 8. How to Extend

### Add a new interview style
1. Update style definitions in `Backend/Backend/controllers/mockInterview.controller.js`.
2. Add style button and selection in `Frontend/Frontend/src/pages/ResumeBuilderPhase3.jsx`.
3. Ensure API sends `interviewStyle` and display style-specific labels in UI.

### Add new AI prompts
1. Update prompt templates in backend controllers.
2. Add new response parsing and fallback handling.
3. Add frontend UI sections for new feedback types.

### Add more resume templates
1. Create new component under `Frontend/Frontend/src/components/templates`.
2. Add template selection logic in `TemplateSelector.jsx`.
3. Ensure print/export works across templates.

---

## 9. Notes
- This project currently uses AI integration through an internal AI config and controller; keep API keys and secrets out of docs.
- The backend uses JWT-protected routes; always test with valid token.
- UI uses Tailwind utility classes and functional components.
- Add tests by creating route tests for backend and component tests for frontend.

---

## 10. Project Deliverables
- Full-stack Resume Builder and Mock Interview app
- Multi-phase resume creation
- AI chatbot
- AI question + evaluation with style adaptation
- Responsive modern UI
- Modular route/controller structure
- Clean, documented codebase

---

## 11. Quick Reference Files
- `CODE_REFERENCE.md` - Code pointer reference for implemented features
- `INTERVIEW_STYLE_FEATURE_DOCS.md` - Detailed feature specification
- `INTERVIEW_STYLE_QUICK_GUIDE.md` - Quick usage guide
- `IMPLEMENTATION_COMPLETE.md` - Completion summary

---

If you want, I can also add this as the project `README.md` content and keep a short summary in `README.md` for easier startup navigation.