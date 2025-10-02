import React, { useState, useRef } from 'react';
import CountdownTimer from './components/CountdownTimer';
import Snowfall from './components/Snowfall';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const backgroundImageUrl = 'https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=2070&auto=format&fit=crop';
  const santaImageUrl = 'https://clipart-library.com/images_k/santa-claus-transparent-background/santa-claus-transparent-background-15.png';
  const snowmanImageUrl = 'https://clipart-library.com/images_k/snowman-transparent-background/snowman-transparent-background-1.png';

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 font-christmas text-white"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <Snowfall />

      <audio 
        ref={audioRef} 
        src="./jingle-bells.mp3" 
        loop
        preload="auto"
        type="audio/mpeg"
      />

      {showIntro ? (
        <div className="relative z-10 flex flex-col items-center text-center p-8 bg-black/50 backdrop-blur-md rounded-xl shadow-2xl border border-white/20">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Welcome to the Winter Countdown</h1>
          <p className="text-lg md:text-2xl mb-6">Get ready for the most wonderful time of the year!</p>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 border-2 border-white/50"
          >
            Enter the Winter Wonderland
          </button>
        </div>
      ) : (
        <main className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-bold mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.6)' }}>Countdown to December 1st</h1>
          <p className="text-2xl md:text-3xl mb-8 opacity-90">The festive season is just around the corner!</p>
          
          <CountdownTimer />
          
          <p className="mt-12 text-lg opacity-80">
            Created by <span className="font-bold">GreenGamesStudio</span>
          </p>

          <img 
            src={santaImageUrl} 
            alt="Santa Claus"
            className="absolute hidden lg:block -bottom-24 -right-40 w-64 h-auto pointer-events-none transform -scale-x-100"
          />
          <img 
            src={snowmanImageUrl} 
            alt="Snowman"
            className="absolute hidden lg:block -bottom-24 -left-32 w-56 h-auto pointer-events-none"
          />
        </main>
      )}
    </div>
  );
};

export default App;
