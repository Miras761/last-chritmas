
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        opacity: Math.random() * 0.7 + 0.3,
      };
      return <div key={i} className="absolute bg-white rounded-full animate-fall" style={style} />;
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {snowflakes}
    </div>
  );
};

export default Snowfall;
