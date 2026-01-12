import React, { useMemo } from "react";
import { Sparkles, Wand2, Target, Edit3, BarChart } from "lucide-react";

const SAMPLES = [
  "Results-driven professional combining strategic thinking with hands-on execution to deliver measurable business impact. Proven track record of driving growth through innovative solutions and data-driven decision making.",
  "Creative technologist skilled in translating complex requirements into elegant, human-centered solutions. Passionate about building products that solve real-world problems and improve user experiences.",
  "Collaborative leader who thrives in fast-paced environments and excels at mentoring teams toward excellence. Strong communicator with expertise in cross-functional coordination and stakeholder management.",
  "Detail-oriented specialist with a passion for continuous improvement and process optimization. Demonstrated ability to increase efficiency and productivity through systematic approaches.",
];

const ProfessionalSummary = ({ value, onChange }) => {
  const wordCount = useMemo(() => (value ? value.trim().split(/\s+/).length : 0), [value]);
  const charCount = useMemo(() => value ? value.length : 0, [value]);

  const applySample = () => {
    const pick = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    onChange(pick);
  };

  const getScore = () => {
    if (wordCount === 0) return 0;
    if (wordCount < 50) return 30;
    if (wordCount < 100) return 60;
    if (wordCount < 150) return 85;
    return 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-white rounded-2xl border border-amber-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
            <Target className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Professional Summary</h3>
            <p className="text-xs text-slate-600">Craft your career narrative</p>
          </div>
        </div>
        <button
          type="button"
          onClick={applySample}
          className="group px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-xl hover:from-amber-700 hover:to-orange-700 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Wand2 className="size-4 group-hover:rotate-180 transition-transform" />
          <span>AI Generate</span>
        </button>
      </div>

      {/* Text Area with Stats */}
      <div className="relative">
        <div className="absolute -top-3 -left-3 -right-3 -bottom-3 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl blur-xl"></div>
        
        <div className="relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm">
          {/* Stats Bar */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{wordCount}</div>
                <div className="text-xs text-slate-600">Words</div>
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{charCount}</div>
                <div className="text-xs text-slate-600">Characters</div>
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{getScore()}/100</div>
                <div className="text-xs text-slate-600">Score</div>
              </div>
            </div>
            
            <div className="w-32">
              <div className="text-right text-xs font-medium text-slate-700 mb-1">
                {wordCount < 50 ? 'Too Short' : wordCount < 100 ? 'Good' : 'Optimal'}
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${getScore()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              rows={6}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Craft a compelling summary that highlights your unique value proposition, key achievements, and career aspirations. Use action verbs and quantify your impact..."
              className="w-full px-4 py-4 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none text-slate-700 leading-relaxed"
            />
            
            {/* Character Count */}
            <div className="absolute bottom-3 right-3">
              <div className={`text-xs px-2 py-1 rounded-full ${charCount > 500 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                {charCount}/500
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Summaries */}
      <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Edit3 className="size-5 text-blue-500" />
          <h4 className="font-medium text-slate-900">Need Inspiration?</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLES.slice(0, 2).map((sample, index) => (
            <div key={index} className="group p-4 bg-white border border-slate-300 rounded-xl hover:border-amber-400 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg">
                  <Sparkles className="size-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 mb-2">
                    Sample {index + 1}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {sample}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onChange(sample)}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Use this sample →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-200">
        <div className="flex items-start gap-3">
          <BarChart className="size-5 text-emerald-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Writing Tips</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                <span>Start with your professional title and years of experience</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                <span>Highlight 2-3 key achievements with quantifiable results</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                <span>Keep it concise (100-150 words recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                <span>Use industry-specific keywords for ATS optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;