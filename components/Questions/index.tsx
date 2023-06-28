import clsx from 'clsx';
import { FC } from 'react';
import { Invalid, Valid } from '../SVGIcons';
import { questionElements } from '@/utils';
import { IQuizQuestions } from '@/types';

interface PropsQuestions {
  handleChoice: (e: React.MouseEvent<HTMLLIElement>) => void;
  quest: IQuizQuestions[];
  currentQuestion: number;
  selectedAnswer: string;
}

const Questions: FC<PropsQuestions> = ({
  handleChoice,
  quest,
  currentQuestion,
  selectedAnswer,
}) => {
  const correctQuestion = quest[currentQuestion].correct;

  return (
    <ul>
      {quest[currentQuestion].choices.map((choice: string, index: number) => {
        const isChoiceAnswer = choice === selectedAnswer;

        return (
          <li
            key={choice}
            className={clsx(
              'text-base flex items-center border rounded-lg p-3 [&:not(:last-child)]:mb-5',
              !isChoiceAnswer && 'border-primary',
              !selectedAnswer && 'hover:bg-secondary-content cursor-pointer',
              isChoiceAnswer && 'bg-secondary-content',
              isChoiceAnswer &&
                selectedAnswer !== correctQuestion &&
                'border-error',
              selectedAnswer && choice === correctQuestion && 'border-success'
            )}
            onClick={handleChoice}
          >
            <div>
              <kbd
                className={clsx(
                  'kbd mr-3 p-0',
                  isChoiceAnswer &&
                    selectedAnswer !== correctQuestion &&
                    'bg-error text-white',
                  selectedAnswer &&
                    choice === correctQuestion &&
                    'bg-success text-white'
                )}
              >
                {isChoiceAnswer && selectedAnswer !== correctQuestion ? (
                  <Valid />
                ) : isChoiceAnswer && choice === correctQuestion ? (
                  <Invalid />
                ) : (
                  questionElements[index]
                )}
              </kbd>
            </div>
            <span>{choice}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Questions;
