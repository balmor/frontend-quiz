import { FC } from 'react';

interface PropsTime {
  size?: 'small';
  color?: 'gray';
}

export const Time: FC<PropsTime> = ({ size = '', color = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={`inline-block w-${size === 'small' ? '4' : '8'} h-${
      size === 'small' ? '4' : '8'
    } stroke-current ${color === 'gray' ? 'text-gray-400' : ''}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
