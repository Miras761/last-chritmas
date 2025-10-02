
import React, { useState, useEffect, useCallback } from 'react';
import { TimeLeft } from '../types';

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/30">
    <span className="text-5xl md:text-7xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-lg md:text-xl text-white/90 uppercase tracking-widest">{label}</span>
  </div>
);

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();
    let year = now.getFullYear();
    const targetDate = new Date(year, 11, 1); // December is month 11

    if (now > targetDate) {
      targetDate.setFullYear(year + 1);
    }

    const difference = targetDate.getTime() - now.getTime();

    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      <CountdownUnit value={timeLeft.days} label="Days" />
      <CountdownUnit value={timeLeft.hours} label="Hours" />
      <CountdownUnit value={timeLeft.minutes} label="Minutes" />
      <CountdownUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
