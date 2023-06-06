import { IResult } from '@/types';
import { localStorageHelper } from '@/utils';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Correct, Home, Percent, Replay, Time, Wrong } from '../SVGIcons';

interface PropsResult {
  result: IResult;
  finishTime: string;
  topic: string;
  setProgress: Dispatch<SetStateAction<boolean>>;
}

const Result: FC<PropsResult> = ({
  result: { score = 0, correctAnswers = 0, wrongAnswers = 0, percent = 0 } = {},
  finishTime,
  topic,
  setProgress,
}) => {

  useEffect(() => {
    const finalResult = { score, correctAnswers, wrongAnswers, percent, finishTime };
    localStorageHelper.saveItemToObject(finalResult, topic.toLowerCase());
  }, [correctAnswers, percent, score, finishTime, topic, wrongAnswers]);

  return (
    <div className="flex flex-col max-w-xl min-h-[40rem]">
      <h2 className="text-center text-[2rem] font-bold py-2">{topic}</h2>
      <div className="flex flex-col items-center">
        <div className="inline-block rounded-full insetShadow mt-5">
          <div
            className="radial-progress text-primary"
            style={{
              '--value': percent,
              '--size': '12rem',
              '--thickness': '2px',
            }}
          >
            <div className="flex flex-col items-center justify-center bg-neutral rounded-full p-5 w-32 h-32">
              <h4 className="text-5xl">{score}</h4>
              <h5 className="text-sm">Points</h5>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-6 my-10 sm:grid-cols-2">
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-green-700">
                <Correct />
              </div>
              <div className="stat-title">Correct Anwsers</div>
              <div className="stat-value">{correctAnswers}</div>
            </div>
          </div>
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-red-700">
                <Wrong />
              </div>
              <div className="stat-title">Wrong Answers</div>
              <div className="stat-value">{wrongAnswers}</div>
            </div>
          </div>
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-yellow-700">
                <Percent />
              </div>
              <div className="stat-title">Accuracy</div>
              <div className="stat-value">{percent}%</div>
            </div>
          </div>
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-blue-600">
                <Time />
              </div>
              <div className="stat-title">Time</div>
              <div className="stat-value">{finishTime}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center max-w-xl">
        <Link href="/" className="btn">
          <Home />
          <span>Take New Quiz</span>
        </Link>
        <button onClick={() => setProgress(false)} className="btn">
          <span>Try Again</span>
          <Replay />
        </button>
      </div>
    </div>
  );
};

export default Result;
