import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import Result from '../Result';
import ProgressBar from '../ProgressBar';
import { IQuizFields, IResult } from '@/types';
import Questions from '../Questions';
import ActionButtons from '../ActionButtons';
import Info from '../Info';

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
          <Info
            quest={quest}
            currentQuestion={currentQuestion}
            isFinish={isFinish}
            topic={topic}
            setFinishTime={setFinishTime}
          />
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
          <ActionButtons
            selectedAnswer={selectedAnswer}
            isLastQuestion={isLastQuestion}
            handleNext={handleNext}
          />
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
