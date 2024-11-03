// CountdownTimer.js
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="countdown">
      <div className="time-box">
        <span className="time-number">{timeLeft.days || 0}</span>
        <span className="time-label">days</span>
      </div>
      <div className="time-box">
        <span className="time-number">{timeLeft.hours || 0}</span>
        <span className="time-label">hours</span>
      </div>
      <div className="time-box">
        <span className="time-number">{timeLeft.minutes || 0}</span>
        <span className="time-label">minutes</span>
      </div>
      <div className="time-box">
        <span className="time-number">{timeLeft.seconds || 0}</span>
        <span className="time-label">seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
