import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from './components/StarField';
import { Header } from './components/Header';
import { DateDisplay } from './components/DateDisplay';
import { EventCard } from './components/EventCard';
import { ToggleButton } from './components/ToggleButton';
import { getEventByDate, getRandomEvent, SpaceEvent } from './data/events';

function App() {
  const [currentDate] = useState(new Date());
  const [currentEvent, setCurrentEvent] = useState<SpaceEvent | null>(null);
  const [isAlternate, setIsAlternate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for dramatic effect
    const loadingTimer = setTimeout(() => {
      const todayEvent = getEventByDate(currentDate);
      setCurrentEvent(todayEvent || getRandomEvent());
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [currentDate]);

  const handleToggle = () => {
    setIsAlternate(!isAlternate);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarField />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"
            />
            <h2 className="text-2xl text-white font-semibold mb-2">
              Scanning the Cosmos...
            </h2>
            <p className="text-purple-300">
              Searching for events in space-time
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarField />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-6"
          >
            <h2 className="text-3xl text-white font-bold mb-4">
              No Events Found
            </h2>
            <p className="text-gray-300 text-lg">
              The cosmos is vast and mysterious. No significant space events were recorded for today in our timeline.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <Header />
        
        <div className="max-w-4xl mx-auto">
          <DateDisplay currentDate={currentDate} />
          
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <EventCard 
                key={isAlternate ? 'alternate' : 'reality'}
                event={currentEvent} 
                isAlternate={isAlternate} 
              />
            </AnimatePresence>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center"
          >
            <ToggleButton 
              isAlternate={isAlternate} 
              onToggle={handleToggle} 
            />
          </motion.div>
        </div>
      </div>
      
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>
      
      <div id="main-content" className="sr-only">
        Main content begins here
      </div>
    </div>
  );
}

export default App;