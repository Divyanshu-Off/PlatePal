'use client';

import { useState } from 'react';
import { Search, Sparkles, Zap } from 'lucide-react';

interface DishInputProps {
  onGetRecommendations: (request: string) => void;
  isLoading: boolean;
}

export default function DishInput({ onGetRecommendations, isLoading }: DishInputProps) {
  const [input, setInput] = useState('');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-950/40 to-fuchsia-950/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-violet-500/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl shadow-lg shadow-violet-500/50">
            <Zap className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          Tell us what you're craving for personalized suggestions!
        </p>
        <div className="flex flex-col gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I want something spicy, or I feel like having pasta..."
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[100px] resize-none transition-all text-white placeholder:text-gray-500"
          />
          <div className="flex gap-3">
            <button
              onClick={() => onGetRecommendations(input)}
              disabled={isLoading || !input.trim()}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-violet-500/30"
            >
              {isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Search size={18} />
              )}
              Get Recommendations
            </button>
            <button
              onClick={() => onGetRecommendations("Surprise me with something healthy!")}
              disabled={isLoading}
              className="px-4 py-3 bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 rounded-xl hover:bg-fuchsia-500/20 transition-all font-semibold flex items-center gap-2"
            >
              <Sparkles size={18} />
              Surprise Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
