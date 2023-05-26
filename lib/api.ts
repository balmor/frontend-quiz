import { IPath, ISlug } from '@/types';
import { createClient, EntryCollection } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getAllFrontedQuiz = async () =>
  await client.getEntries({
    content_type: 'frontendQuiz',
  });

export const getFrontedQuiz = async (params: ISlug) =>
    await client.getEntries({
      content_type: 'frontendQuiz',
      'fields.slug': params.slug
    });
