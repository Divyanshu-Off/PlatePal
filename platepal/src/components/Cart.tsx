'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Clock, X, Package } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  dish: string;
  ingredients: string[];
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
}

export default function Cart({ items, onRemoveItem }: CartProps) {
  const [orderStatus, setOrderStatus] = useState<'idle' | 'ordering' | 'success'>('idle');

  const handleOrder = () => {
    setOrderStatus('ordering');
    setTimeout(() => {
      setOrderStatus('success');
      setTimeout(() => setOrderStatus('idle'), 3000);
    }, 1500);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-950/40 to-purple-950/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-pink-500/20">
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl shadow-lg shadow-pink-500/50">
              <ShoppingCart size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <p className="text-sm text-gray-400">{items.length} dish{items.length > 1 ? 'es' : ''}</p>
            </div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-pink-500/20">
            <Package className="text-pink-400" size={22} />
          </div>
        </div>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700/50 scrollbar-track-transparent">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={`${item.dish}-${index}`}
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-black/40 rounded-2xl p-4 shadow-md border border-pink-500/10"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-white">{item.dish}</h3>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1.5 hover:bg-red-950/30 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-xs px-3 py-1.5 bg-pink-500/10 text-pink-300 rounded-full font-medium border border-pink-500/30"
                    >
                      {ing}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleOrder}
            disabled={orderStatus !== 'idle'}
            className="py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 disabled:opacity-50"
          >
            {orderStatus === 'idle' && (
              <>
                <ShoppingCart size={18} />
                Order Now
              </>
            )}
            {orderStatus === 'ordering' && <span className="animate-pulse">Processing...</span>}
            {orderStatus === 'success' && (
              <>
                <Check size={18} /> Ordered!
              </>
            )}
          </button>
          <button className="py-3 bg-black/40 border border-pink-500/20 text-gray-200 rounded-xl hover:bg-black/60 transition-all font-bold flex items-center justify-center gap-2">
            <Clock size={18} />
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
}
