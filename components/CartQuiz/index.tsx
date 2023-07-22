'use client';

import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { localStorageHelper } from '@/utils';
import { isEmpty } from 'lodash';
import LastResult from '../LastResult';
import { ITimeResult, PropsCartQuiz } from '@/types';
import Link from 'next/link';

const CartQuiz: FC<PropsCartQuiz> = ({
  quiz: {
    fields: {
      subtitle = '',
      topic = '',
      slug = '',
      new: newQuiz = false,
      image: { fields: { file: { url: imageUrl = '' } = {} } = {} } = {},
      quest,
    },
  },
}): JSX.Element => {
  const [result, setResult] = useState<ITimeResult>();

  useEffect(() => {
    const result = localStorageHelper.load(slug.toLowerCase());
    setResult(result);
  }, [slug]);

  return (
    <div
      className={clsx(
        'transition-color duration-200 card w-60 p-[0.4rem] bg-secondary shadow-lg hover:bg-secondary-focus hover:rounded-none'
      )}
    >
      <div
        className={clsx(
          'card-body items-center text-center',
          isEmpty(result) &&
            'border border-dashed border-accent-focus rounded-lg hover:rounded-none'
        )}
      >
        <div className="avatar">
          <div className="w-24 mask mask-squircle ring ring-offset-2">
            {imageUrl && (
              <Image
                src={`https:${imageUrl}`}
                alt={topic}
                width="80"
                height="80"
              />
            )}
          </div>
        </div>
        <div className="tooltip" data-tip={subtitle}>
          <h2 className="card-title justify-center">
            {topic}
            {newQuiz && <div className="badge badge-accent">NEW</div>}
          </h2>
          {subtitle && (
            <div className="badge badge-base100 m-2">{subtitle}</div>
          )}
        </div>

        <div className="h-7">
          {result?.score ? (
            <LastResult result={result} />
          ) : (
            <div className="flex items-center border rounded-lg border-gray-700 text-sm cursor-default">
              <div
                className="text-gray-500 border-gray-600 px-2 flex items-center gap-1 tooltip"
                data-tip="questions"
              >
                {quest.length}
              </div>
            </div>
          )}
        </div>
        <div className="card-actions">
          <Link
            href={{
              pathname: `/quiz/${slug}`,
            }}
            className="btn btn-primary"
          >
            {!isEmpty(result) ? 'TRY AGAIN' : 'START QUIZ'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartQuiz;
