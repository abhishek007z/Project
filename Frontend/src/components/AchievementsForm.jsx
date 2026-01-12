import React from "react";
import { Medal, PlusCircle, Trash2, Award, Star, Zap } from "lucide-react";

const AchievementsForm = ({ items = [], onAdd, onChange, onRemove }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
            <Award className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Achievements & Certifications</h3>
            <p className="text-xs text-slate-600">Showcase awards and recognitions</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="group px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-emerald-600 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <PlusCircle className="size-4 group-hover:scale-110 transition-transform" />
          Add Achievement
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-300 text-center hover:border-blue-400 transition-colors group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full mb-4">
            <Star className="size-8 text-blue-500" />
          </div>
          <h4 className="font-medium text-slate-900 mb-2">No Achievements Yet</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Showcase awards, certifications, or recognitions that add credibility to your profile
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-white border border-blue-300 text-blue-700 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
          >
            Add Your First Achievement
          </button>
        </div>
      )}

      {/* Achievement Items */}
      {items.map((item, index) => (
        <div key={index} className="group relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
          {/* Decorative Element */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-2">
                <Zap className="size-3 text-blue-500" />
                Achievement Title
              </label>
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => onChange(index, "title", e.target.value)}
                placeholder="e.g., Employee of the Year"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Issuing Organization</label>
              <input
                type="text"
                value={item.organization || ""}
                onChange={(e) => onChange(index, "organization", e.target.value)}
                placeholder="e.g., Microsoft, Google"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Date Achieved</label>
              <input
                type="month"
                value={item.date || ""}
                onChange={(e) => onChange(index, "date", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Verification Link</label>
              <input
                type="text"
                value={item.link || ""}
                onChange={(e) => onChange(index, "link", e.target.value)}
                placeholder="https://credential.url"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-medium text-slate-600">Description & Impact</label>
            <textarea
              rows={3}
              value={item.description || ""}
              onChange={(e) => onChange(index, "description", e.target.value)}
              placeholder="Describe the achievement, your contribution, and its impact..."
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.title && item.organization ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <span className="text-xs text-slate-600">
                {item.title && item.organization ? 'Complete' : 'Incomplete'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-white border border-red-200 text-red-700 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 className="size-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsForm;