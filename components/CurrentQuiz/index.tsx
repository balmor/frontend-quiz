import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import Result from '../Result';
import Timer from '../Timer';
import ProgressBar from '../ProgressBar';
import Link from 'next/link';
import { IQuizFields, IResult } from '@/types';

const questionElements = 'abcd'.toUpperCase().split('');

interface PropsCurrentQuiz {
  quiz: IQuizFields;
  setProgress: Dispatch<SetStateAction<boolean>>;
}

const CurrentQuiz: FC<PropsCurrentQuiz> = ({ quiz: { quest = [], topic = '' } = {}, setProgress }) => {
  const [finishTime, setFinishTime] = useState<string>('');
  const [history, setHistory] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [result, setResult] = useState<IResult>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    percent: 0,
  });
  const [isFinish, setFinish] = useState<boolean>(false);

  const isLastQuestion = currentQuestion + 1 === quest.length;

  const handleNext = () => {
    if (isLastQuestion) {
      setFinish(true);
      return;
    }

    setSelectedAnswer('');
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleChoice = (e: MouseEvent<HTMLLIElement>) => {
    if (selectedAnswer) {
      return;
    }
    const answer = e.currentTarget.childNodes[1].textContent || '';

    setSelectedAnswer(answer);

    if (answer === quest[currentQuestion].correct) {
      setResult((prev: IResult) => ({
        ...prev,
        score: prev.score + 10,
        correctAnswers: prev.correctAnswers + 1,
        percent: Math.round(((prev.correctAnswers + 1) / quest.length) * 100),
      }));
      setHistory((prev: number[]) => [...prev, 1]);
    } else {
      setResult((prev: IResult) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
      setHistory((prev: number[]) => [...prev, 0]);
    }
  };

  return (
    <>
      {!finishTime ? (
        <div className="flex flex-col min-h-[30rem] w-full sm:w-[40rem]">
          <div className="flex justify-between items-center m-2">
            <Timer setFinishTime={setFinishTime} isFinish={isFinish} />
            <h2 className="text-xl">{topic}</h2>
            <h4 className="self-end">
              <span className="text-3xl font-bold">{currentQuestion + 1}</span>
              <span className="text-md text-gray-500">/{quest.length}</span>
            </h4>
          </div>
          <ProgressBar
            quest={quest}
            currentQuestion={currentQuestion}
            history={history}
          />
          <div className="card card-compact bg-secondary shadow-lg min-h-[6.5rem] rounded-none sm:rounded-2xl">
            <div className="card-body">
              <p className="leading-relaxed text-base">
                {quest[currentQuestion].question}
              </p>
            </div>
          </div>
          <div className="card card-compact bg-secondary shadow-lg my-10 rounded-none sm:rounded-2xl">
            <div className="card-body">
              <ul>
                {quest[currentQuestion].choices.map(
                  (choice: string, index: number) => (
                    <li
                      key={choice}
                      className={clsx(
                        'text-base flex items-center border rounded-lg p-3 [&:not(:last-child)]:mb-5',
                        choice !== selectedAnswer && 'border-primary',
                        !selectedAnswer &&
                          'hover:bg-secondary-content cursor-pointer',
                        choice === selectedAnswer && 'bg-secondary-content',
                        choice === selectedAnswer &&
                          selectedAnswer !== quest[currentQuestion].correct &&
                          'border-error',
                        selectedAnswer &&
                          choice === quest[currentQuestion].correct &&
                          'border-success'
                      )}
                      onClick={handleChoice}
                    >
                      <div>
                        <kbd
                          className={clsx(
                            'kbd mr-3 p-0',
                            choice === selectedAnswer &&
                              selectedAnswer !==
                                quest[currentQuestion].correct &&
                              'bg-error text-white',
                            selectedAnswer &&
                              choice === quest[currentQuestion].correct &&
                              'bg-success text-white'
                          )}
                        >
                          {choice === selectedAnswer &&
                          selectedAnswer !== quest[currentQuestion].correct ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          ) : choice === selectedAnswer &&
                            choice === quest[currentQuestion].correct ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          ) : (
                            questionElements[index]
                          )}
                        </kbd>
                      </div>
                      <span>{choice}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link href="/" className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                className="w-5 h-5 mr-3"
              >
                <path
                  fillRule="evenodd"
                  d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Quit Quiz</span>
            </Link>
            {selectedAnswer && (
              <button
                className="btn btn-primary self-end w-32"
                onClick={handleNext}
              >
                <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ) : (
        <Result result={result} finishTime={finishTime} topic={topic} setProgress={setProgress} />
      )}
    </>
  );
};

export default CurrentQuiz;
