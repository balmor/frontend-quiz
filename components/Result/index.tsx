import { useLocalStorage, getStorageValue } from '@/hooks/useLocalStorage';
import { localStorageHelper } from '@/utils';
import Link from 'next/link';
import { useEffect } from 'react';

const Result = ({
  result: { score = 0, correctAnswers = 0, wrongAnswers = 0, percent = 0 } = {},
  time,
  topic,
}: any) => {
  const finalResult = { score, correctAnswers, wrongAnswers, percent, time };

  console.log('time', time);
  useEffect(() => {
    localStorageHelper.saveItemToObject(finalResult, topic.toLowerCase());
  }, [finalResult, topic]);

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="stat-title">Correct Anwsers</div>
              <div className="stat-value">{correctAnswers}</div>
            </div>
          </div>
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="stat-title">Wrong Answers</div>
              <div className="stat-value">{wrongAnswers}</div>
            </div>
          </div>
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-yellow-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div className="stat-title">Accuracy</div>
              <div className="stat-value">{percent}%</div>
            </div>
          </div>
          <div className="stats border-transparent bg-secondary">
            <div className="stat w-56">
              <div className="stat-figure text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="stat-title">Time</div>
              <div className="stat-value">{time}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center max-w-xl">
        <Link href="/" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <span>Take New Quiz</span>
        </Link>
        <Link href="/quiz/react" className="btn">
          <span>Try Again</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 ml-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Result;
