import { Dispatch, FC, SetStateAction } from 'react';
import Timer from '../Timer';
import { IQuizQuestions } from '@/types';

interface PropsInfo {
  setFinishTime: Dispatch<SetStateAction<string>>;
  isFinish: boolean;
  topic: string;
  currentQuestion: number;
  quest: IQuizQuestions[];
}

const Info: FC<PropsInfo> = ({
  setFinishTime,
  isFinish,
  topic,
  currentQuestion,
  quest,
}) => (
  <div className="flex justify-between items-center m-2">
    <Timer setFinishTime={setFinishTime} isFinish={isFinish} />
    <h2 className="text-xl">{topic}</h2>
    <h4 className="self-end">
      <span className="text-3xl font-bold">{currentQuestion + 1}</span>
      <span className="text-md text-gray-500">/{quest.length}</span>
    </h4>
  </div>
);

export default Info;
