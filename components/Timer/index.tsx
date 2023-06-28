import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns'

interface PropsTimer {
  setFinishTime: Dispatch<SetStateAction<string>>;
  isFinish: boolean;
}

const Timer: FC<PropsTimer> = ({ setFinishTime, isFinish = false }) => {
  const [timer, setTimer] = useState<number>(0); // move to Timer component

  const { minutes = 0, seconds = 0 } = intervalToDuration({
    start: 0,
    end: timer * 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer: number): number => timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const time: string = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
    if (isFinish) {
      setFinishTime(time);
    }
  }, [isFinish]);


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
