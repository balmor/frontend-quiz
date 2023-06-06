import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import Result from '../Result';
import Timer from '../Timer';
import ProgressBar from '../ProgressBar';
import Link from 'next/link';
import { IQuizFields, IResult } from '@/types';
import { Back, Invalid, Next, Valid } from '../SVGIcons';
import Questions from '../Questions';

interface PropsCurrentQuiz {
  quiz: IQuizFields;
  setProgress: Dispatch<SetStateAction<boolean>>;
}

const CurrentQuiz: FC<PropsCurrentQuiz> = ({
  quiz: { quest = [], topic = '' } = {},
  setProgress,
}) => {
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
              <Questions
                handleChoice={handleChoice}
                quest={quest}
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link href="/" className="btn">
              <Back />
              <span>Quit Quiz</span>
            </Link>
            {selectedAnswer && (
              <button
                className="btn btn-primary self-end w-32"
                onClick={handleNext}
              >
                <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
                <Next />
              </button>
            )}
          </div>
        </div>
      ) : (
        <Result
          result={result}
          finishTime={finishTime}
          topic={topic}
          setProgress={setProgress}
        />
      )}
    </>
  );
};

export default CurrentQuiz;
