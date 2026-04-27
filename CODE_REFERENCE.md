# 🔧 Interview Style Feature - Code Reference

## Files Modified & Created

### 1. NEW: Backend/Backend/controllers/chatbotController.js

```javascript
import { geminiModel } from "../configs/ai.js";

// CHAT WITH GEMINI
export const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Missing message field" });
    }

    const prompt = `You are a helpful assistant for a Resume Building platform...`;
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    res.status(200).json({ 
      response: responseText,
      message: message 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CHAT SUGGESTIONS
export const getChatSuggestions = async (req, res) => {
  try {
    const suggestions = [
      "How to write a better resume?",
      "Tips for a successful interview",
      "How to highlight my skills?",
      "Career development advice"
    ];
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

### 2. NEW: Backend/Backend/routes/chatbotRoutes.js

```javascript
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { chatWithGemini, getChatSuggestions } from "../controllers/chatbotController.js";

const chatbotRoutes = express.Router();

chatbotRoutes.post('/chat', protect, chatWithGemini);
chatbotRoutes.get('/suggestions', protect, getChatSuggestions);

export default chatbotRoutes;
```

---

### 3. NEW: Frontend/Frontend/src/pages/Chatbot.jsx

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, XIcon, MinusIcon, MessageCircleIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api';

const Chatbot = () => {
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant...",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  // ... rest of implementation (227 lines total)
};

export default Chatbot;
```

---

### 4. UPDATED: Backend/Backend/server.js

**Added:**
```javascript
import chatbotRoutes from "./routes/chatbotRoutes.js";

// ... existing code ...

app.use("/api/chatbot", chatbotRoutes);
```

---

### 5. UPDATED: Backend/Backend/controllers/mockInterview.controller.js

**Enhanced generateInterviewQuestion with interview styles:**

```javascript
export const generateInterviewQuestion = async (req, res) => {
  try {
    const { resumeId, interviewStyle = "india" } = req.body;
    
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Define interview style guidelines
    const styleGuides = {
      india: {
        name: "🇮🇳 Indian HR Style",
        description: "Friendly, behavioral focus, basic technical, relationship-building",
        tone: "warm and conversational",
        focus: "team fit, cultural values, willingness to learn, growth potential"
      },
      us: {
        name: "🇺🇸 US Interview Style",
        description: "Direct, structured, confidence-focused, STAR method",
        tone: "professional and direct",
        focus: "achievements, problem-solving skills, career ambitions, leadership"
      },
      europe: {
        name: "🇪🇺 European Corporate Style",
        description: "Formal, detailed explanations, work-life balance, process-oriented",
        tone: "formal and detailed",
        focus: "methodology, work processes, work-life balance, professional development"
      },
      startup: {
        name: "🚀 Startup Culture Style",
        description: "Fast-paced, practical, problem-solving, owner mentality",
        tone: "energetic and practical",
        focus: "quick thinking, adaptability, entrepreneurial mindset, ownership"
      },
      mnc: {
        name: "🏢 MNC Corporate Style",
        description: "Professional corporate tone, cross-functional collaboration, corporate values",
        tone: "professional and corporate",
        focus: "corporate culture fit, cross-functional collaboration, leadership pipeline"
      }
    };

    const style = styleGuides[interviewStyle] || styleGuides.india;

    const prompt = `
You are an expert HR interviewer conducting a ${style.name} interview.

INTERVIEW STYLE CHARACTERISTICS:
- Tone: ${style.tone}
- Focus Areas: ${style.focus}
- Description: ${style.description}

Candidate skills and experience:
${resume.skills?.join(", ")}

Professional summary: ${resume.professionalSummary || "Not provided"}

Generate ONE interview question tailored to ${style.name}.

The question should:
1. Reflect the typical style and tone of ${style.name}
2. Focus on the key areas valued in this culture
3. Be specific and practical
4. Assess both technical and soft skills relevant to this market

Return ONLY valid JSON (no markdown, no backticks):

{
  "question": "string - the interview question tailored to the style",
  "type": "technical or behavioral or situational",
  "interviewStyle": "${interviewStyle}",
  "styleName": "${style.name}",
  "expected_duration": 60,
  "why_this_style": "brief explanation of why this question is suited for this interview style"
}
`;

    const result = await geminiModel.generateContent(prompt);
    let text = result.response.text().replace(/```json|```|```/g, "").trim();
    const question = JSON.parse(text);
    question.style = style;

    res.json({ question });
  } catch (error) {
    console.error("Question error:", error);
    res.status(500).json({ message: "Failed to generate question" });
  }
};
```

**Enhanced evaluateAnswer with style-based feedback:**

```javascript
export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer, questionType, interviewStyle = "india" } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Missing data" });
    }

    const styleFeedback = {
      india: "Focus on team collaboration, willingness to learn, and cultural fit...",
      us: "Use STAR method. Americans value direct answers and clear achievements...",
      europe: "Provide detailed methodology. Work-life balance is important...",
      startup: "Show quick thinking and ownership mentality...",
      mnc: "Demonstrate cross-functional collaboration and corporate values alignment..."
    };

    const styleGuides = {
      india: "🇮🇳 Indian HR",
      us: "🇺🇸 US Interview",
      europe: "🇪🇺 European Corporate",
      startup: "🚀 Startup",
      mnc: "🏢 MNC Corporate"
    };

    const prompt = `
You are a senior HR interviewer evaluating a candidate answer for ${styleGuides[interviewStyle] || styleGuides.india} interview.

INTERVIEW STYLE: ${interviewStyle}
STYLE FEEDBACK GUIDELINES: ${styleFeedback[interviewStyle] || styleFeedback.india}

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Evaluate the answer based on:
1. Confidence level
2. Grammar and communication quality
3. Communication clarity
4. Technical accuracy (if applicable)
5. Structure and coherence
6. Professionalism

Also provide STYLE-SPECIFIC feedback:
- How well does this answer suit the ${styleGuides[interviewStyle]} interview style?
- What improvements would make this answer better for this specific interview culture?
- Rate how well the communication style matches the expected tone

Return ONLY valid JSON (no markdown, no backticks):

{
  "score": 0-10,
  "confidence_level": "Low/Medium/High",
  "grammar_mistakes": ["mistake1", "mistake2"],
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2"],
  "improvements": ["improvement1", "improvement2"],
  "hr_feedback": "overall HR opinion",
  "style_rating": 0-10,
  "style_feedback": "How well this answer suits the ${styleGuides[interviewStyle]} interview style",
  "style_specific_tips": ["tip1", "tip2", "tip3"],
  "communication_match": "Low/Medium/High"
}
`;

    const result = await geminiModel.generateContent(prompt);
    let text = result.response.text().replace(/```json|```|```/g, "").trim();
    const evaluation = JSON.parse(text);
    evaluation.interviewStyle = interviewStyle;
    evaluation.styleGuide = styleGuides[interviewStyle] || styleGuides.india;

    res.json({ evaluation });
  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({ message: "Evaluation failed" });
  }
};
```

---

### 6. UPDATED: Frontend/Frontend/src/pages/ResumeBuilderPhase3.jsx

**Added state:**
```javascript
const [interviewStyle, setInterviewStyle] = useState("india");
```

**Updated fetchQuestion:**
```javascript
const fetchQuestion = async () => {
  setLoadingQ(true);
  setFeedback(null);
  setAnswer("");

  try {
    const res = await api.post(
      "/api/mock-interview/question",
      { resumeId, interviewStyle },  // ← Now sends style
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setQuestion(res.data.question);
  } catch (err) {
    console.log(err.response?.data || err.message);
    toast.error("Failed to generate interview question");
  } finally {
    setLoadingQ(false);
  }
};
```

**Added Interview Style Selector UI:**
```javascript
{/* INTERVIEW STYLE SELECTOR */}
<div className="bg-white p-6 rounded-xl shadow border-2 border-blue-200">
  <div className="flex items-center gap-3 mb-4">
    <Target className="text-blue-600" size={24} />
    <h2 className="font-bold text-lg">Interview Style</h2>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
    {/* 5 Radio buttons for each style */}
    <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
      interviewStyle === 'india' 
        ? 'border-blue-600 bg-blue-50' 
        : 'border-gray-200 bg-white hover:border-blue-300'
    }`}>
      <input
        type="radio"
        name="interviewStyle"
        value="india"
        checked={interviewStyle === 'india'}
        onChange={(e) => setInterviewStyle(e.target.value)}
        className="mr-2"
      />
      <div className="font-semibold text-sm">🇮🇳 Indian HR</div>
      <div className="text-xs text-gray-600 mt-1">Friendly, behavioral</div>
    </label>
    
    // ... repeat for us, europe, startup, mnc ...
  </div>

  {question?.style && (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="text-sm"><strong>Current Style:</strong> {question.style.name}</div>
      <div className="text-xs text-gray-600 mt-1">{question.style.description}</div>
    </div>
  )}
</div>
```

**Updated submitAnswer:**
```javascript
const res = await api.post(
  "/api/mock-interview/evaluate",
  {
    question: question?.question,
    answer,
    questionType: question?.type,
    interviewStyle,  // ← Now sends style
    securityData: cameraActive ? {...} : {...}
  },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

**Enhanced Feedback Display:**
```javascript
{/* INTERVIEW STYLE RATING */}
{feedback.style_rating && (
  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-2 border-purple-200">
    <h3 className="font-semibold text-purple-700 flex items-center gap-2 mb-2">
      <Target size={18} /> {feedback.styleGuide} Style Match
    </h3>
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-600 h-full transition-all"
          style={{ width: `${(feedback.style_rating / 10) * 100}%` }}
        />
      </div>
      <span className="font-bold text-purple-600">{feedback.style_rating}/10</span>
    </div>
    <p className="text-sm text-gray-700">{feedback.style_feedback}</p>
  </div>
)}

{/* STYLE-SPECIFIC TIPS */}
{feedback.style_specific_tips?.length > 0 && (
  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
    <h3 className="font-semibold text-blue-700 flex items-center gap-2">
      <Sparkles size={18} /> Tips for {feedback.styleGuide} Interviews
    </h3>
    <ul className="mt-2 space-y-2">
      {feedback.style_specific_tips.map((tip, i) => (
        <li key={i} className="text-gray-700 text-sm flex gap-2">
          <span className="text-blue-600 font-bold">•</span>
          {tip}
        </li>
      ))}
    </ul>
  </div>
)}
```

---

### 7. UPDATED: Frontend/Frontend/src/pages/Layout.jsx

**Added Chatbot import and component:**
```javascript
import Chatbot from "./Chatbot";

// ... in return JSX ...

return user ? (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
    <Navbar />
    <Outlet />
    <Chatbot />  {/* ← Added this line */}
  </div>
) : (
  <Navigate to="/login" replace />
);
```

---

## 📊 Line Count Summary

| File | Type | Lines | Change |
|------|------|-------|--------|
| chatbotController.js | NEW | 50 | +50 |
| chatbotRoutes.js | NEW | 12 | +12 |
| Chatbot.jsx | NEW | 227 | +227 |
| server.js | UPDATED | 38 | +2 |
| mockInterview.controller.js | UPDATED | 300+ | +150 |
| ResumeBuilderPhase3.jsx | UPDATED | 1169 | +200 |
| Layout.jsx | UPDATED | 35 | +3 |
| **TOTAL** | | | **+644 lines** |

---

## 🎯 Key Code Patterns

### Style Definition Pattern
```javascript
const styleGuides = {
  india: { name, description, tone, focus },
  us: { name, description, tone, focus },
  // ... etc
};
```

### Dynamic Prompt Pattern
```javascript
const prompt = `
You are an expert interviewer conducting a ${style.name} interview.

STYLE CHARACTERISTICS:
- Tone: ${style.tone}
- Focus: ${style.focus}

Generate question tailored to this style...
`;
```

### Response Enrichment Pattern
```javascript
const result = JSON.parse(text);
result.style = style;           // Add style info
result.interviewStyle = style;  // Store style reference
res.json({ result });
```

---

## ✅ Validation

All new code:
- ✅ Uses existing dependencies (no new installs needed)
- ✅ Follows project conventions
- ✅ Properly handles errors
- ✅ Includes security middleware (protect)
- ✅ Uses proper async/await patterns
- ✅ Has responsive Tailwind styling
- ✅ Integrates with Redux auth

---

**Version:** 1.0  
**Last Updated:** February 20, 2026
