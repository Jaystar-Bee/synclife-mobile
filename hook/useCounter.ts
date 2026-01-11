import { useState, useEffect } from 'react';

function useCountdown(seconds: number) {
  const [time, setTime] = useState(seconds);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setTime(seconds);

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resetKey, seconds]);

  return {
    time,
    restart: () => setResetKey((k) => k + 1),
    isFinished: time === 0,
  };
}


export default useCountdown