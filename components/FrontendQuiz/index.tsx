import { IQuizFields, PropsHome } from '@/types';
import { Entry } from 'contentful';
import { FC } from 'react';
import CardQuiz from '../CartQuiz';

const FrontendQuiz: FC<PropsHome> = ({ items }) => (
  <div>
    <h2 className="text-center text-4xl font-bold py-10">Choose a Topic</h2>
    <div className="flex flex-wrap gap-10 justify-center">
      {items.map((quiz: Entry<IQuizFields>) => (
        <CardQuiz key={quiz.sys.id} quiz={quiz} />
      ))}
    </div>
  </div>
);

export default FrontendQuiz;
