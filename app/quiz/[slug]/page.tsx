import QuizSection from '@/components/QuizSection';
import { getAllFrontedQuiz, getQuiz } from '@/pages/api';
import { IPath, IQuizFields, ISlug } from '@/types';
import { Entry } from 'contentful';
import { Metadata } from 'next';

export const dynamicParams = false;
export const revalidate = 60;

export async function generateMetadata({
  params: { slug },
}: IPath): Promise<Metadata> {
  const title = slug?.toUpperCase();
  const description =  `Check your frontend developer knowledge about ${title}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `https://frontquiz.vercel.app/quiz/${slug}`,
      title: `Frontend QUIZ - ${title}`,
      description,
    },
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
