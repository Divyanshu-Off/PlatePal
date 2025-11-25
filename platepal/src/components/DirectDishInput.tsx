'use client';

import { useState } from 'react';
import { ChefHat, Loader2, Sparkles } from 'lucide-react';

interface DirectDishInputProps {
  onGetIngredients: (dish: string) => void;
  isLoading: boolean;
}

export default function DirectDishInput({ onGetIngredients, isLoading }: DirectDishInputProps) {
  const [dishName, setDishName] = useState('');

  const handleSubmit = () => {
    if (dishName.trim()) {
      onGetIngredients(dishName.trim());
      setDishName('');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-950/40 to-violet-950/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-purple-500/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl shadow-lg shadow-purple-500/50">
            <ChefHat className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-bold text-white">Know Your Dish</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          Enter any dish name to instantly get its ingredients
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="e.g., Chicken Biryani, Pasta Carbonara..."
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder:text-gray-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !dishName.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Finding...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Get
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
