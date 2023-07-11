import Image from 'next/image';
import { IPath } from '@/types';
import { ImageResponse } from 'next/server';
import { getQuiz } from '@/pages/api';

const size = {
  width: 600,
  height: 400,
};

export async function generateImageMetadata({ params: { slug } }: IPath) {
  return [
    {
      contentType: 'image/png',
      size,
      alt: slug,
      id: slug,
    },
  ];
}

export default async function OGImage({ params: { slug } }: IPath) {
  const { image } = await getQuiz(slug);
  const imageUrl = image.fields.file.url;

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
          color: '#38bdf8',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ display: 'flex', margin: 0 }}>
          <span>&lt;</span>
          <span style={{ color: '#fcda01' }}>?</span>
          <span>&gt;</span>
          <span style={{ color: '#d4d4d4', marginLeft: '20px' }}>Frontend</span>
          <span>QUIZ</span>
        </h1>
        <h2 style={{ color: '#d4d4d4', margin: 0 }}>{slug}</h2>
        <img src={`https:${imageUrl}`} width="120" height="120" alt={slug} />
      </div>
    ),
    {
      ...size,
    }
  );
}
