import { ImageResponse } from 'next/server';

export const alt = 'FrontendQUIZ';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          background: '#0c0f28',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          color: '#38bdf8',
        }}
      >
        <h1>
          <span>&lt;</span>
          <span style={{ color: '#fcda01' }}>?</span>
          <span>&gt;</span>
          <span style={{ color: '#d4d4d4', marginLeft: '20px' }}>Frontend</span>
          <span>QUIZ</span>
        </h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
