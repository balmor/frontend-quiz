import { ITimeResult } from '@/types';
import { isEmpty } from 'lodash';
import { FC } from 'react';
import { Score, Time } from '../SVGIcons';

export interface PropsLastResult {
  result?: ITimeResult;
}

const LastResult: FC<PropsLastResult> = ({
  result,
  result: { score = '', finishTime = '' } = {},
}) => {
  if (isEmpty(result)) return null;

  return (
    <div className="flex items-center border rounded-lg border-gray-700 text-sm cursor-default">
      <div
        className="text-gray-500 border-r border-gray-600 px-2 flex items-center gap-1 tooltip"
        data-tip="score"
      >
        <Score />
        <span>{score}</span>
      </div>
      <div
        className="text-gray-500 px-2 flex items-center gap-1 tooltip"
        data-tip="time"
      >
        <Time size="small" color="gray" />
        <span>{finishTime}</span>
      </div>
    </div>
  );
};

export default LastResult;
