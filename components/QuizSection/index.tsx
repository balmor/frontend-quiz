import { IQuiz } from '@/types';
import { FC, useState } from 'react';
import CurrentQuiz from '../CurrentQuiz';

const QuizSection: FC<IQuiz> = ({ quiz, quiz: { topic = '' } }) => {
  const [isProgress, setProgress] = useState<boolean>(false);

  const handleStart = () => {
    setProgress(true);
  };

  return (
    <div className="flex flex-col items-center">
      {isProgress ? (
        <CurrentQuiz quiz={quiz} setProgress={setProgress} />
      ) : (
        <>
          <h2 className="text-center text-[2rem] font-bold py-2">{topic}</h2>
          <button onClick={handleStart}>
            <div className="inline-block rounded-full insetShadow mt-5 group">
              <div
                className="radial-progress text-primary"
                style={{
                  '--value': '100',
                  '--size': '15rem',
                  '--thickness': '2px',
                }}
              >
                <div className="transition-all duration-200 flex flex-col items-center justify-center bg-darkblue rounded-full p-5 w-48 h-48 group-hover:w-60 group-hover:h-60 group-hover:bg-secondary-content">
                  <h4 className="transition-colors text-3xl text-base-content group-hover:text-primary">
                    START
                  </h4>
                </div>
              </div>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default QuizSection;
