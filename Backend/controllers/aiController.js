import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";


// controller for enhancing a resume's professional summary 
// POST : /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req , res) => {
    try {
        const {userContent} = req.body;

        if(!userContent){
           return res.status(400).json({
      message: "Missing required fields",
     
    });  

        }

      const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: "You are an export in resume writting. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentence also highlighting key skills,experience , and career objective. Make it compelling and ATS-friendly and only return text no options or anything else." 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
         return res.status(200).json({
     enhancedContent  });
    } catch (error) {
         return res.status(400).json({
      message: error.message,
    });
    }
}


// controller for enhancing a resume's job description
// POST : /api/ai/enhance-job-desc


export const enhanceJobDescription = async (req , res) => {
    try {

   
        const {userContent} = req.body;

        if(!userContent){
           return res.status(400).json({
      message: "Missing required fields",
     
    });  

        }

      const response =  await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else." 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
         return res.status(200).json({
     enhancedContent  });
    } catch (error) {
         return res.status(400).json({
      message: error.message,
    });
    }
}




// controller for uploading a resume's to the database
// POST : /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    // ✅ FIX 1: Better validation (main 400 fix)
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Resume text could not be extracted from PDF",
      });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract structured data from a resume. Return only valid JSON.";

    const userPrompt = `extract data from this resume : ${resumeText}
Provide data strictly in the following JSON format with no extra text:

{
  "professional_summary": "",
  "skills": [],
  "professional_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    // ✅ FIX 2: Safe JSON parse
    let parsedData;
    try {
      parsedData = JSON.parse(response.choices[0].message.content);
    } catch (err) {
      return res.status(400).json({
        message: "AI response could not be parsed",
      });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    // ✅ FIX 3: Frontend compatible response
    return res.status(201).json({
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
