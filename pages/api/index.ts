import { IQuizFields, ISlug } from '@/types';
import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getAllFrontedQuiz = async () =>
  await client.getEntries<IQuizFields>({
    content_type: 'frontendQuiz',
  });

export const getFrontedQuiz = async (slug: string) =>
  await client.getEntries({
    content_type: 'frontendQuiz',
    'fields.slug': slug,
  });

export const getQuiz = async (slug: string) => {
  const result = await getFrontedQuiz(slug);

  const {
    items: [item],
  } = result;

  return item?.fields as IQuizFields;
};
