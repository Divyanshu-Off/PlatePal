'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface DietHistoryProps {
  history: string[];
  setHistory: (history: string[]) => void;
}

export default function DietHistory({ history, setHistory }: DietHistoryProps) {
  const [newMeal, setNewMeal] = useState('');

  const addMeal = () => {
    if (newMeal.trim()) {
      const today = new Date().toLocaleDateString();
      setHistory([...history, `${newMeal.trim()} (${today})`]);
      setNewMeal('');
    }
  };

  const removeMeal = (index: number) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950/40 to-blue-950/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-indigo-500/20">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/50">
            <Calendar className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-bold text-white">Diet History</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          Meals from the last 3 days (auto-recorded when you add to cart)
        </p>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
            placeholder="Manually add a meal..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder:text-gray-500"
            onKeyDown={(e) => e.key === 'Enter' && addMeal()}
          />
          <button
            onClick={addMeal}
            className="p-2.5 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-500 hover:to-blue-500 transition-all shadow-md shadow-indigo-500/30"
          >
            <Plus size={20} />
          </button>
        </div>
        <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700/50 scrollbar-track-transparent">
          {history.length === 0 && (
            <li className="text-gray-500 text-sm italic text-center py-4 bg-black/20 rounded-xl border border-gray-800">
              No meals recorded yet. Add dishes to cart to auto-record!
            </li>
          )}
          <AnimatePresence>
            {history.map((meal, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex justify-between items-center p-3 bg-black/40 rounded-xl shadow-sm hover:shadow-md hover:bg-black/50 transition-all border border-indigo-500/10"
              >
                <span className="text-gray-200 text-sm font-medium">{meal}</span>
                <button
                  onClick={() => removeMeal(index)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1.5 hover:bg-red-950/30 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
