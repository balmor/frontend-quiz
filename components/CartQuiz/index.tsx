import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { localStorageHelper } from '@/utils';
import { isEmpty } from 'lodash';
import LastResult from '../LastResult';
import { ITimeResult, PropsCartQuiz } from '@/types';

const CartQuiz: FC<PropsCartQuiz> = ({
  quiz: {
    fields: {
      topic = '',
      slug = '',
      new: newQuiz = false,
      image: { fields: { file: { url: imageUrl = '' } } },
    },
  },
}) => {
  const [result, setResult] = useState<ITimeResult>();

  useEffect(() => {
    const result = localStorageHelper.load(topic.toLowerCase());
    setResult(result);
  }, [topic]);

  return (
    <div
      className={clsx(
        'transition-color duration-200 card w-60 bg-secondary shadow-lg hover:bg-secondary-focus hover:rounded-none'
      )}
    >
      <div
        className={clsx(
          'card-body gap-4 items-center text-center',
          isEmpty(result) &&
            'border border-dashed border-accent-focus m-2 rounded-lg hover:rounded-none'
        )}
      >
        <div className="avatar">
          <div className="w-24 mask mask-squircle ring ring-offset-2">
            <Image
              src={`https:${imageUrl}`}
              alt={topic}
              width="80"
              height="80"
            />
          </div>
        </div>
        <h2 className="card-title">
          {topic}
          {newQuiz && <div className="badge badge-accent">NEW</div>}
        </h2>
        <div className="h-7">
          <LastResult result={result} />
        </div>
        <div className="card-actions">
          <Link
            href={{
              pathname: '/quiz/[slug]',
              query: { slug },
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
