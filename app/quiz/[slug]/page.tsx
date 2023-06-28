import QuizSection from '@/components/QuizSection';
import { getAllFrontedQuiz, getFrontedQuiz } from '@/pages/api';
import { IPath, IQuizFields, ISlug } from '@/types';
import { formattedQuiz } from '@/utils';
import { Entry } from 'contentful';
import { Metadata } from 'next';

export const dynamicParams = false;

const getQuiz = async (slug: string) => {
  const result = await getFrontedQuiz(slug);

  const {
    items: [item],
  } = result;

  const fields = item?.fields as IQuizFields;
  return formattedQuiz(fields);
};

export async function generateMetadata({
  params: { slug },
}: IPath): Promise<Metadata> {
  const { topic } = await getQuiz(slug);

  return {
    title: topic,
  };
}

export async function generateStaticParams() {
  const frontendQuiz = await getAllFrontedQuiz();
  const items: Entry<IQuizFields>[] =
    frontendQuiz?.items as Entry<IQuizFields>[];

  const paths: ISlug[] = items.map(
    (item: Entry<IQuizFields>): ISlug => ({ slug: item.fields.slug })
  );

  return paths;
}

export default async function Post({ params: { slug } }: IPath) {
  const quiz = await getQuiz(slug);

  return <QuizSection quiz={quiz} />;
}
