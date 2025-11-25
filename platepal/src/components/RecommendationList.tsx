'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Info, Flame } from 'lucide-react';

interface Recommendation {
  name: string;
  description: string;
  calories: string;
  reason: string;
}

interface RecommendationListProps {
  recommendations: Recommendation[];
  onAddToCart: (dish: string) => void;
  isLoadingIngredients: boolean;
}

export default function RecommendationList({ recommendations, onAddToCart, isLoadingIngredients }: RecommendationListProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Recommended for You
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="group relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-purple-500/20 flex flex-col justify-between hover:shadow-purple-500/20 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white pr-2">{rec.name}</h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg shrink-0">
                  <Flame size={14} className="text-orange-400" />
                  <span className="text-xs font-semibold text-orange-400">{rec.calories}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{rec.description}</p>
              <div className="flex items-start gap-2 mb-5 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <Info size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-xs text-purple-300 leading-relaxed">{rec.reason}</p>
              </div>
            </div>
            <button
              onClick={() => onAddToCart(rec.name)}
              disabled={isLoadingIngredients}
              className="relative z-10 w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
