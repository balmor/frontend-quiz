import { ITimeResult } from "@/types";
import { isEmpty } from "lodash";
import { FC } from "react";

export interface PropsLastResult {
  result?: ITimeResult;
}

const LastResult: FC<PropsLastResult> = ({ result, result: { score = '', finishTime = '' } = {} }) => {

  if (isEmpty(result)) return null;

  return (
    <div className="flex items-center border rounded-lg border-gray-700 text-sm cursor-default">
      <div
        className="text-gray-500 border-r border-gray-600 px-2 flex items-center gap-1 tooltip"
        data-tip="score"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 stroke-current text-yellow-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
        <span>{score}</span>
      </div>
      <div
        className="text-gray-500 px-2 flex items-center gap-1 tooltip"
        data-tip="time"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="inline-block w-4 h-4 stroke-current text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{finishTime}</span>
      </div>
    </div>
  );
};

export default LastResult;
