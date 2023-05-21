import { useEffect } from 'react';
import { intervalToDuration } from 'date-fns'

const Timer = ({ timer, setTimer }: any) => {
  const { minutes = 0, seconds = 0 } = intervalToDuration({ start: 0, end: timer * 1000 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer: any) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex self-end text-md text-gray-500 border p-1 rounded border-gray-600">
      <span className="countdown">
        <span style={{ '--value': minutes }} />:
        <span style={{ '--value': seconds }} />
      </span>
    </div>
  );
};

export default Timer;
