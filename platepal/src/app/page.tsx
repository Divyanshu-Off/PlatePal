'use client';

import { useState, useEffect } from 'react';
import DietHistory from '@/components/DietHistory';
import DishInput from '@/components/DishInput';
import DirectDishInput from '@/components/DirectDishInput';
import RecommendationList from '@/components/RecommendationList';
import Cart from '@/components/Cart';

interface Recommendation {
  name: string;
  description: string;
  calories: string;
  reason: string;
}

interface CartItem {
  dish: string;
  ingredients: string[];
}

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [isLoadingIngs, setIsLoadingIngs] = useState(false);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('platepal_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('platepal_history', JSON.stringify(history));
  }, [history]);

  const handleGetRecommendations = async (userRequest: string) => {
    setIsLoadingRecs(true);
    setRecommendations([]);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, userRequest }),
      });
      const data = await res.json();
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  const handleAddToCart = async (dish: string) => {
    setIsLoadingIngs(true);
    try {
      const res = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dish }),
      });
      const data = await res.json();
      if (data.ingredients) {
        setCart([...cart, { dish, ingredients: data.ingredients }]);
        
        // Automatically add to diet history
        const today = new Date().toLocaleDateString();
        const mealEntry = `${dish} (${today})`;
        if (!history.includes(mealEntry)) {
          setHistory([...history, mealEntry]);
        }
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      setIsLoadingIngs(false);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <main className="min-h-screen bg-black p-6 md:p-12">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-black to-violet-950/20 animate-gradient-shift pointer-events-none"></div>
     
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 animate-gradient-x">
              PlatePal
            </span>
          </h1>
          <p className="text-xl text-gray-400 font-light tracking-wide">
            Your AI-Powered Personal Nutritionist
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: History & Input */}
          <div className="lg:col-span-4 space-y-6">
            <DirectDishInput onGetIngredients={handleAddToCart} isLoading={isLoadingIngs} />
            <DietHistory history={history} setHistory={setHistory} />
            <DishInput onGetRecommendations={handleGetRecommendations} isLoading={isLoadingRecs} />
          </div>

          {/* Right Column: Recommendations & Cart */}
          <div className="lg:col-span-8 space-y-8">
            <RecommendationList
              recommendations={recommendations}
              onAddToCart={handleAddToCart}
              isLoadingIngredients={isLoadingIngs}
            />
            <Cart items={cart} onRemoveItem={handleRemoveFromCart} />
            
            {recommendations.length === 0 && cart.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-zinc-600 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-lg">Ready to eat? Get some recommendations!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
