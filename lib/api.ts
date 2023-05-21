import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getAllFrontedQuiz = async () =>
  await client.getEntries({
    content_type: 'frontendQuiz',
  });

export const getFrontedQuiz = async (params: any) =>
    await client.getEntries({
      content_type: 'frontendQuiz',
      'fields.slug': params.slug
    });

export const getQuiz = async (params: any) =>
  await client.getEntries({
    content_type: 'quiz',
    'fields.slug': params.slug
  });

